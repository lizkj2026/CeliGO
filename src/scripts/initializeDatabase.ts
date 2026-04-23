import { createCeliGoDatabase, addSheetData } from './googleSheets';

// Datos iniciales para Restaurantes (20 filas)
const restaurantesData = [
  ['100 Montaditos', 'Calle Gran Vía 52, Madrid', 'Española', 'TRUE', 'https://maps.google.com/?q=100+Montaditos+Gran+Via+Madrid', '4.5'],
  ['Telepizza', 'Calle Mayor 15, Madrid', 'Italiana/Pizza', 'TRUE', 'https://maps.google.com/?q=Telepizza+Mayor+Madrid', '4.2'],
  ['Foster\'s Hollywood', 'Paseo de la Castellana 123, Madrid', 'Americana', 'TRUE', 'https://maps.google.com/?q=Fosters+Hollywood+Castellana+Madrid', '4.3'],
  ['Vips', 'Calle Preciados 38, Madrid', 'Internacional', 'TRUE', 'https://maps.google.com/?q=Vips+Preciados+Madrid', '4.1'],
  ['McDonald\'s', 'Plaza del Sol 8, Madrid', 'Americana', 'TRUE', 'https://maps.google.com/?q=McDonalds+Sol+Madrid', '4.0'],
  ['Burger King', 'Gran Vía 65, Madrid', 'Americana', 'TRUE', 'https://maps.google.com/?q=Burger+King+Gran+Via+Madrid', '3.9'],
  ['La Mafia se sienta a la mesa', 'Calle Fuencarral 45, Madrid', 'Italiana', 'TRUE', 'https://maps.google.com/?q=La+Mafia+Fuencarral+Madrid', '4.4'],
  ['Ginos', 'Calle Alcalá 23, Madrid', 'Italiana', 'TRUE', 'https://maps.google.com/?q=Ginos+Alcala+Madrid', '4.3'],
  ['Pans & Company', 'Calle Montera 25, Madrid', 'Bocadillos', 'TRUE', 'https://maps.google.com/?q=Pans+Company+Montera+Madrid', '4.0'],
  ['Rodilla', 'Calle Serrano 61, Madrid', 'Bocadillos/Café', 'TRUE', 'https://maps.google.com/?q=Rodilla+Serrano+Madrid', '4.2'],
  ['Starbucks', 'Plaza Mayor 20, Madrid', 'Cafetería', 'TRUE', 'https://maps.google.com/?q=Starbucks+Plaza+Mayor+Madrid', '4.1'],
  ['Café & Té', 'Calle Arenal 15, Madrid', 'Cafetería', 'FALSE', 'https://maps.google.com/?q=Cafe+Te+Arenal+Madrid', '3.8'],
  ['Mango Café', 'Calle Hortaleza 71, Madrid', 'Cafetería', 'TRUE', 'https://maps.google.com/?q=Mango+Cafe+Hortaleza+Madrid', '4.3'],
  ['Lateral', 'Calle Jorge Juan 16, Madrid', 'Española', 'TRUE', 'https://maps.google.com/?q=Lateral+Jorge+Juan+Madrid', '4.4'],
  ['Taberna La Carmencita', 'Calle Libertad 16, Madrid', 'Española', 'TRUE', 'https://maps.google.com/?q=Taberna+La+Carmencita+Madrid', '4.6'],
  ['Restaurante Sacha', 'Calle Almirante 15, Madrid', 'Española', 'TRUE', 'https://maps.google.com/?q=Restaurante+Sacha+Madrid', '4.5'],
  ['El Pintón', 'Calle Cava Baja 38, Madrid', 'Española', 'FALSE', 'https://maps.google.com/?q=El+Pinton+Cava+Baja+Madrid', '4.2'],
  ['Juana La Loca', 'Plaza Puerta de Moros 4, Madrid', 'Española', 'TRUE', 'https://maps.google.com/?q=Juana+La+Loca+Madrid', '4.4'],
  ['Casa Lucio', 'Calle Cava Baja 35, Madrid', 'Española', 'TRUE', 'https://maps.google.com/?q=Casa+Lucio+Madrid', '4.7'],
  ['Sobrino de Botín', 'Calle Cuchilleros 17, Madrid', 'Española', 'TRUE', 'https://maps.google.com/?q=Sobrino+de+Botin+Madrid', '4.5']
];

// Datos iniciales para Tiendas (20 filas)
const tiendasData = [
  ['Carrefour', 'Calle General Pardiñas 56, Madrid', 'Supermercado', 'Lunes a Sábado 9:00-22:00, Domingos 10:00-21:00'],
  ['Mercadona', 'Calle Bravo Murillo 326, Madrid', 'Supermercado', 'Lunes a Sábado 9:00-21:30, Domingos 10:00-15:00'],
  ['Hipercor', 'Calle de Ayala 46, Madrid', 'Hipermercado', 'Lunes a Sábado 10:00-22:00, Domingos 11:00-21:00'],
  ['Alcampo', 'Avenida de la Ilustración 135, Madrid', 'Hipermercado', 'Lunes a Sábado 10:00-22:00, Domingos 10:00-21:00'],
  ['Herbolario Navarro', 'Calle Fuencarral 72, Madrid', 'Herbolario', 'Lunes a Sábado 10:00-20:30, Domingos cerrado'],
  ['El Corte Inglés', 'Calle Preciados 3, Madrid', 'Gran Almacén', 'Lunes a Sábado 10:00-22:00, Domingos 11:00-21:00'],
  ['Dia', 'Calle San Bernardo 52, Madrid', 'Supermercado', 'Lunes a Sábado 9:00-21:30, Domingos 10:00-14:30'],
  ['Lidl', 'Calle de la Princesa 21, Madrid', 'Supermercado', 'Lunes a Sábado 9:00-22:00, Domingos 10:00-15:00'],
  ['Aldi', 'Calle de Tetuán 23, Madrid', 'Supermercado', 'Lunes a Sábado 9:00-22:00, Domingos cerrado'],
  ['Consum', 'Calle Alcalá 165, Madrid', 'Supermercado', 'Lunes a Sábado 9:00-21:30, Domingos 10:00-14:30'],
  ['Ahorramas', 'Calle Bravo Murillo 189, Madrid', 'Supermercado', 'Lunes a Sábado 9:00-21:00, Domingos cerrado'],
  ['SuperSol', 'Calle Alberto Aguilera 28, Madrid', 'Supermercado', 'Lunes a Sábado 8:30-21:30, Domingos 9:00-14:30'],
  ['Gadis', 'Calle Costa Rica 8, Madrid', 'Supermercado', 'Lunes a Sábado 9:00-21:30, Domingos 10:00-14:00'],
  ['Caprabo', 'Calle Narváez 76, Madrid', 'Supermercado', 'Lunes a Sábado 9:00-21:00, Domingos 10:00-14:00'],
  ['Amasúa', 'Calle Santa Engracia 156, Madrid', 'Supermercado', 'Lunes a Sábado 9:00-21:00, Domingos cerrado'],
  ['Veritas', 'Calle Conde de Peñalver 8, Madrid', 'Ecológico', 'Lunes a Sábado 10:00-20:30, Domingos cerrado'],
  ['Isadora', 'Calle Velázquez 54, Madrid', 'Dietética', 'Lunes a Sábado 10:00-20:00, Domingos cerrado'],
  ['Herbolario El Bosque', 'Calle López de Hoyos 186, Madrid', 'Herbolario', 'Lunes a Sábado 9:30-20:00, Domingos cerrado'],
  ['Farmacia Goya', 'Calle Goya 7, Madrid', 'Farmacia', 'Lunes a Sábado 9:30-21:30, Domingos 10:00-14:30'],
  ['Parafarmacia', 'Calle Fuencarral 28, Madrid', 'Parafarmacia', 'Lunes a Sábado 10:00-20:30, Domingos cerrado']
];

// Datos iniciales para Marcas (20 filas)
const marcasData = [
  ['Schär', 'Pan de molde sin gluten', 'https://www.schaer.com/es/sello-sin-gluten', 'NO'],
  ['Nutribén', 'Galletas sin gluten', 'https://www.nutriben.es/sello-sin-gluten', 'NO'],
  ['Celicioso', 'Muffins sin gluten', 'https://www.celicioso.com/sello-sin-gluten', 'NO'],
  ['Levadura Pan', 'Harina de arroz', 'https://www.levadurapan.com/sello-sin-gluten', 'NO'],
  ['Bimbo', 'Pan sin gluten', 'https://www.bimbo.com/sello-sin-gluten', 'NO'],
  ['Hacendado', 'Pasta sin gluten', 'https://www.hacendado.es/sello-sin-gluten', 'NO'],
  ['Carrefour', 'Galletas sin gluten', 'https://www.carrefour.es/sello-sin-gluten', 'NO'],
  ['Mercadona', 'Pan sin gluten', 'https://www.mercadona.es/sello-sin-gluten', 'NO'],
  ['Alcampo', 'Pizza sin gluten', 'https://www.alcampo.es/sello-sin-gluten', 'NO'],
  ['Dia', 'Cereales sin gluten', 'https://www.dia.es/sello-sin-gluten', 'NO'],
  ['Lidl', 'Pan rallado sin gluten', 'https://www.lidl.es/sello-sin-gluten', 'NO'],
  ['Aldi', 'Galletas sin gluten', 'https://www.aldi.es/sello-sin-gluten', 'NO'],
  ['Veritas', 'Harina de almendras', 'https://www.veritas.es/sello-sin-gluten', 'NO'],
  ['Ecocesta', 'Quinoa sin gluten', 'https://www.ecocesta.com/sello-sin-gluten', 'NO'],
  ['Biorganic', 'Arroz integral sin gluten', 'https://www.biorganic.es/sello-sin-gluten', 'NO'],
  ['El Granero Integral', 'Copos de avena sin gluten', 'https://www.elgranerointegral.com/sello-sin-gluten', 'NO'],
  ['La Finestra Sul Cielo', 'Pasta de lentejas sin gluten', 'https://www.lafinestrasulcielo.es/sello-sin-gluten', 'NO'],
  ['Sam Mills', 'Maíz sin gluten', 'https://www.sammills.com/sello-sin-gluten', 'NO'],
  ['De Nigris', 'Pasta sin gluten', 'https://www.denigris.com/sello-sin-gluten', 'NO'],
  ['Gallo', 'Arroz sin gluten', 'https://www.gallo.es/sello-sin-gluten', 'NO']
];

// Función principal para inicializar la base de datos
export async function initializeDatabase() {
  try {
    console.log('🚀 Creando base de datos CeliGO...');
    
    // Crear la hoja de cálculo
    const spreadsheet = await createCeliGoDatabase();
    console.log('✅ Hoja de cálculo creada:', spreadsheet.spreadsheetUrl);
    
    // Añadir datos iniciales
    console.log('📊 Añadiendo datos iniciales...');
    
    await addSheetData('Restaurantes', restaurantesData);
    console.log('✅ Restaurantes añadidos (20 registros)');
    
    await addSheetData('Tiendas', tiendasData);
    console.log('✅ Tiendas añadidas (20 registros)');
    
    await addSheetData('Marcas', marcasData);
    console.log('✅ Marcas añadidas (20 registros)');
    
    console.log('🎉 Base de datos CeliGO inicializada con éxito!');
    return spreadsheet;
    
  } catch (error) {
    console.error('❌ Error inicializando la base de datos:', error);
    throw error;
  }
}

// Ejecutar si se llama directamente
if (require.main === module) {
  initializeDatabase()
    .then(() => process.exit(0))
    .catch(() => process.exit(1));
}