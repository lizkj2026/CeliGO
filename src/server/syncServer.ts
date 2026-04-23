import express from 'express';
import { GoogleGenAI } from '@google/genai';
import { getSheetData, updateSheetData } from '../services/googleSheets';

const app = express();
app.use(express.json());

// Almacenamiento en memoria para los clientes SSE (Server-Sent Events)
const sseClients = new Set<express.Response>();

// Endpoint para Server-Sent Events
app.get('/api/sync-events', (req, res) => {
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
    'Access-Control-Allow-Origin': '*'
  });

  sseClients.add(res);

  // Enviar evento de conexión
  res.write('data: {"type": "connected"}\n\n');

  // Limpiar al desconectar
  req.on('close', () => {
    sseClients.delete(res);
  });
});

// Función para notificar a todos los clientes SSE
const notifyClients = (data: any) => {
  const message = `data: ${JSON.stringify(data)}\n\n`;
  sseClients.forEach(client => {
    try {
      client.write(message);
    } catch (error) {
      // Cliente desconectado, eliminar
      sseClients.delete(client);
    }
  });
};

// Webhook para Google Sheets (simulado)
app.post('/api/webhook/sheets', async (req, res) => {
  try {
    const { sheetName, changeType, range, data } = req.body;

    console.log(`📡 Webhook recibido: ${sheetName} - ${changeType}`);

    // Notificar a todos los clientes conectados
    notifyClients({
      type: 'sheet_updated',
      sheetName,
      changeType,
      range,
      timestamp: new Date().toISOString()
    });

    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error procesando webhook:', error);
    res.status(500).json({ error: 'Error interno' });
  }
});

// Endpoint para obtener datos actualizados
app.get('/api/data/:sheetName', async (req, res) => {
  try {
    const { sheetName } = req.params;
    const data = await getSheetData(sheetName);
    res.json({ data, timestamp: new Date().toISOString() });
  } catch (error) {
    console.error('Error obteniendo datos:', error);
    res.status(500).json({ error: 'Error obteniendo datos' });
  }
});

// Endpoint para actualizar datos
app.put('/api/data/:sheetName', async (req, res) => {
  try {
    const { sheetName } = req.params;
    const { range, data } = req.body;

    await updateSheetData(sheetName, range, data);

    // Notificar cambios
    notifyClients({
      type: 'sheet_updated',
      sheetName,
      changeType: 'update',
      range,
      timestamp: new Date().toISOString()
    });

    res.json({ success: true });
  } catch (error) {
    console.error('Error actualizando datos:', error);
    res.status(500).json({ error: 'Error actualizando datos' });
  }
});

// Endpoint de salud
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'healthy', 
    timestamp: new Date().toISOString(),
    connectedClients: sseClients.size
  });
});

// Iniciar servidor
const PORT = process.env.SYNC_PORT || 3001;
app.listen(PORT, () => {
  console.log(`🔄 Servidor de sincronización en http://localhost:${PORT}`);
  console.log(`📡 Clientes SSE conectados: 0`);
});

export default app;