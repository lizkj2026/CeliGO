// Versión simplificada para demostración - datos mock directamente aquí

// Datos de ejemplo para restaurantes
const restaurantesMejorados = [
  ['Sin Gluten Tres Cantos', 'Calle de la Libertad 14, Tres Cantos', 'Madrid', 'Restaurante 100% Sin Gluten', 'TRUE', '4.8', '+34 916 05 18 27', 'Restaurante exclusivamente sin gluten con obrador propio'],
  ['La Buenacha', 'Calle de la Palma 2, Madrid', 'Madrid', 'Restaurante 100% Sin Gluten', 'TRUE', '4.7', '+34 915 22 88 07', 'Cocina 100% sin gluten especializada en comida casera'],
  ['Celicioso', 'Calle de la Reina 31, Madrid', 'Madrid', 'Pastelería 100% Sin Gluten', 'TRUE', '4.6', '+34 915 22 63 56', 'Pastelería y restaurante 100% sin gluten'],
  ['100 Montaditos', 'Calle Gran Vía 52, Madrid', 'Madrid', 'Española con opciones sin gluten', 'TRUE', '4.5', '+34 915 21 07 72', 'Menú sin gluten certificado con cocina separada']
];

// Datos de ejemplo para tiendas
const tiendasMejoradas = [
  ['Herbolario Navarro', 'Calle Fuencarral 72, Madrid', 'Madrid', 'Herbolario especializado', '9:00-20:00', '+34 915 31 77 33', 'TRUE'],
  ['Carrefour', 'Calle General Pardiñas 56, Madrid', 'Madrid', 'Supermercado con sección sin gluten', '9:00-22:00', '+34 914 34 78 00', 'TRUE'],
  ['Mercadona', 'Calle Bravo Murillo 326, Madrid', 'Madrid', 'Supermercado con línea sin gluten', '9:00-21:30', '+34 915 70 23 00', 'TRUE']
];

// Datos de ejemplo para marcas
const marcasMejoradas = [
  ['Schär', 'Pan sin gluten', 'Panadería', 'Pan blanco sin gluten, ideal para sandwiches', 'logo_schaer.png', 'FALSE', 'TRUE', 'https://www.schaer.com'],
  ['Naturgreen', 'Galletas sin gluten', 'Repostería', 'Galletas de chocolate sin gluten', 'logo_naturgreen.png', 'FALSE', 'TRUE', 'https://www.naturgreen.es'],
  ['Nutribén', 'Cereales sin gluten', 'Cereales', 'Cereales infantiles sin gluten', 'logo_nutriben.png', 'FALSE', 'TRUE', 'https://www.nutriben.es']
];

// Simulación de obtener datos de Google Sheets
export async function getSheetData(sheetName: string) {
  // Simular delay de red
  await new Promise(resolve => setTimeout(resolve, 500));
  
  switch(sheetName) {
    case 'Restaurantes':
      return [['Nombre', 'Dirección', 'Ciudad', 'Tipo_Cocina', 'Validado_Seguro', 'Valoracion', 'Telefono', 'Descripcion'], ...restaurantesMejorados];
    case 'Tiendas':
      return [['Nombre', 'Dirección', 'Ubicación', 'Especialidad', 'Horario', 'Telefono', 'Validado_Seguro'], ...tiendasMejoradas];
    case 'Marcas':
      return [['Nombre', 'Producto', 'Categoria', 'Descripcion', 'Imagen_Sello', 'Alerta_Trazas', 'Validado_Seguro', 'Web'], ...marcasMejoradas];
    default:
      return [];
  }
}

// Simulación de añadir datos
export async function addSheetData(sheetName: string, data: any[][]) {
  console.log(`Datos añadidos a ${sheetName}:`, data);
  return { success: true };
}

// Simulación de actualizar datos
export async function updateSheetData(sheetName: string, range: string, data: any[][]) {
  console.log(`Datos actualizados en ${sheetName} (${range}):`, data);
  return { success: true };
}