/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// Sistema de Integración con Google Drive para CeliGO
// Almacenamiento colaborativo y sincronización en tiempo real

import { CeliGOPlace, CeliGODatabase } from '../data/CeliGODatabase';

export interface GoogleDriveConfig {
  apiKey: string;
  clientId: string;
  folderId: string;
  spreadsheetId: string;
}

export interface SyncStatus {
  lastSync: string;
  totalRecords: number;
  updatedRecords: number;
  newRecords: number;
  errors: string[];
}

export interface CommunityReport {
  id: string;
  placeId: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  safetyLevel: 'SAFE' | 'CAUTION' | 'AVOID';
  visitDate: string;
  photos?: string[];
  verified: boolean;
  helpful: number;
}

class CeliGOGoogleDrive {
  private config: GoogleDriveConfig;
  private isInitialized: boolean = false;
  private syncStatus: SyncStatus;

  constructor(config: GoogleDriveConfig) {
    this.config = config;
    this.syncStatus = {
      lastSync: new Date().toISOString(),
      totalRecords: 0,
      updatedRecords: 0,
      newRecords: 0,
      errors: []
    };
  }

  // Inicializar conexión con Google Drive
  async initialize(): Promise<boolean> {
    try {
      // Cargar Google API
      await this.loadGoogleAPI();
      
      // Autenticar usuario
      await this.authenticate();
      
      // Verificar acceso a carpetas
      await this.verifyFolderAccess();
      
      this.isInitialized = true;
      console.log('✅ CeliGO Google Drive inicializado correctamente');
      return true;
    } catch (error) {
      console.error('❌ Error inicializando Google Drive:', error);
      return false;
    }
  }

  // Cargar Google API
  private async loadGoogleAPI(): Promise<void> {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'https://apis.google.com/js/api.js';
      script.onload = () => {
        gapi.load('client:auth2', () => {
          gapi.client.init({
            apiKey: this.config.apiKey,
            clientId: this.config.clientId,
            discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest'],
            scope: 'https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/spreadsheets'
          }).then(resolve).catch(reject);
        });
      };
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }

  // Autenticar usuario
  private async authenticate(): Promise<void> {
    const GoogleAuth = gapi.auth2.getAuthInstance();
    const user = await GoogleAuth.signIn();
    
    if (!user) {
      throw new Error('No se pudo autenticar el usuario');
    }
  }

  // Verificar acceso a carpetas
  private async verifyFolderAccess(): Promise<void> {
    try {
      const response = await gapi.client.drive.files.get({
        fileId: this.config.folderId,
        fields: 'id, name, mimeType'
      });
      
      if (response.status !== 200) {
        throw new Error('No se puede acceder a la carpeta principal');
      }
    } catch (error) {
      throw new Error('Error verificando acceso a carpetas: ' + error);
    }
  }

  // Sincronizar base de datos con Google Drive
  async syncDatabase(): Promise<SyncStatus> {
    if (!this.isInitialized) {
      throw new Error('Google Drive no está inicializado');
    }

    try {
      console.log('🔄 Iniciando sincronización con Google Drive...');
      
      // 1. Subir base de datos principal
      await this.uploadDatabase();
      
      // 2. Sincronizar reports de la comunidad
      await this.syncCommunityReports();
      
      // 3. Descargar actualizaciones
      const updates = await this.downloadUpdates();
      
      // 4. Actualizar estado
      this.syncStatus.lastSync = new Date().toISOString();
      this.syncStatus.totalRecords = CeliGODatabase.length;
      
      console.log('✅ Sincronización completada');
      return this.syncStatus;
      
    } catch (error) {
      console.error('❌ Error en sincronización:', error);
      this.syncStatus.errors.push(error.message);
      throw error;
    }
  }

  // Subir base de datos a Google Drive
  private async uploadDatabase(): Promise<void> {
    const timestamp = new Date().toISOString().split('T')[0];
    const filename = `CeliGO_Database_${timestamp}.json`;
    
    const fileMetadata = {
      name: filename,
      parents: [this.config.folderId]
    };

    const jsonData = JSON.stringify(CeliGODatabase, null, 2);
    const blob = new Blob([jsonData], { type: 'application/json' });

    // Subir archivo
    const form = new FormData();
    form.append('metadata', new Blob([JSON.stringify(fileMetadata)], { type: 'application/json' }));
    form.append('file', blob);

    const response = await fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${gapi.auth.getToken().access_token}`
      },
      body: form
    });

    if (!response.ok) {
      throw new Error('Error subiendo base de datos');
    }

    console.log(`📁 Base de datos subida: ${filename}`);
  }

  // Sincronizar reports de la comunidad
  private async syncCommunityReports(): Promise<void> {
    try {
      const reports = await this.getCommunityReports();
      
      // Procesar reports y actualizar base de datos
      for (const report of reports) {
        if (report.verified && report.helpful >= 3) {
          await this.updatePlaceFromReport(report);
        }
      }
      
      console.log(`📊 Procesados ${reports.length} reports de la comunidad`);
    } catch (error) {
      console.warn('⚠️ Error procesando reports:', error);
    }
  }

  // Obtener reports de la comunidad
  private async getCommunityReports(): Promise<CommunityReport[]> {
    const response = await gapi.client.drive.files.list({
      q: `name contains 'community_reports' and parents in '${this.config.folderId}'`,
      fields: 'files(id, name, modifiedTime)'
    });

    if (response.result.files.length === 0) {
      return [];
    }

    const fileId = response.result.files[0].id;
    const fileResponse = await gapi.client.drive.files.get({
      fileId: fileId,
      alt: 'media'
    });

    return JSON.parse(fileResponse.body);
  }

  // Actualizar lugar desde report
  private async updatePlaceFromReport(report: CommunityReport): Promise<void> {
    const place = CeliGODatabase.find(p => p.id === report.placeId);
    if (!place) return;

    // Actualizar rating
    place.verification.communityReports += 1;
    place.verification.averageRating = 
      (place.verification.averageRating + report.rating) / 2;

    // Si hay suficientes reports negativos, cambiar nivel de seguridad
    if (report.safetyLevel === 'AVOID' && place.verification.communityReports > 10) {
      place.safetyLevel = 'AVOID';
    }

    // Agregar notas del report
    if (report.comment) {
      place.notes = `${place.notes || ''}\n[Comunidad]: ${report.comment}`;
    }
  }

  // Descargar actualizaciones
  private async downloadUpdates(): Promise<any[]> {
    try {
      const response = await gapi.client.drive.files.list({
        q: `name contains 'updates' and parents in '${this.config.folderId}'`,
        fields: 'files(id, name, modifiedTime)'
      });

      const updates = [];
      for (const file of response.result.files) {
        const fileResponse = await gapi.client.drive.files.get({
          fileId: file.id,
          alt: 'media'
        });
        updates.push(JSON.parse(fileResponse.body));
      }

      return updates;
    } catch (error) {
      console.warn('⚠️ No se pudieron descargar actualizaciones:', error);
      return [];
    }
  }

  // Agregar nuevo report de la comunidad
  async addCommunityReport(report: Omit<CommunityReport, 'id' | 'verified' | 'helpful'>): Promise<string> {
    const newReport: CommunityReport = {
      ...report,
      id: `report_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      verified: false,
      helpful: 0
    };

    try {
      // Obtener reports existentes
      const existingReports = await this.getCommunityReports();
      existingReports.push(newReport);

      // Subir archivo actualizado
      const filename = `community_reports_${new Date().toISOString().split('T')[0]}.json`;
      const fileMetadata = {
        name: filename,
        parents: [this.config.folderId]
      };

      const jsonData = JSON.stringify(existingReports, null, 2);
      const blob = new Blob([jsonData], { type: 'application/json' });

      const form = new FormData();
      form.append('metadata', new Blob([JSON.stringify(fileMetadata)], { type: 'application/json' }));
      form.append('file', blob);

      await fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${gapi.auth.getToken().access_token}`
        },
        body: form
      });

      console.log(`📝 Report agregado: ${newReport.id}`);
      return newReport.id;
    } catch (error) {
      console.error('❌ Error agregando report:', error);
      throw error;
    }
  }

  // Obtener estado de sincronización
  getSyncStatus(): SyncStatus {
    return { ...this.syncStatus };
  }

  // Forzar sincronización completa
  async forceFullSync(): Promise<SyncStatus> {
    console.log('🔄 Forzando sincronización completa...');
    return await this.syncDatabase();
  }
}

// Configuración para desarrollo
const DEVELOPMENT_CONFIG: GoogleDriveConfig = {
  apiKey: process.env.REACT_APP_GOOGLE_API_KEY || '',
  clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID || '',
  folderId: process.env.REACT_APP_GOOGLE_DRIVE_FOLDER_ID || '',
  spreadsheetId: process.env.REACT_APP_GOOGLE_SPREADSHEET_ID || ''
};

// Instancia global
let celigoDriveInstance: CeliGOGoogleDrive | null = null;

export const getCeliGODrive = (): CeliGOGoogleDrive => {
  if (!celigoDriveInstance) {
    celigoDriveInstance = new CeliGOGoogleDrive(DEVELOPMENT_CONFIG);
  }
  return celigoDriveInstance;
};

export default CeliGOGoogleDrive;