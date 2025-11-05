#!/usr/bin/env node

/**
 * Punto de entrada de la aplicación
 * Principio: Dependency Inversion - Usa el contenedor para obtener dependencias
 * 
 * Arquitectura:
 * - Clean Architecture
 * - SOLID Principles
 * - Dependency Injection
 * - Strategy Pattern
 * - Command Pattern
 */

const container = require('../src/container');

/**
 * Ejecuta la aplicación
 */
async function main() {
  const app = container.getCliApp();
  const exitCode = await app.run(process.argv.slice(2));
  process.exit(exitCode);
}

// Manejo de errores no capturados
process.on('unhandledRejection', (error) => {
  console.error('Error no manejado:', error);
  process.exit(1);
});

process.on('uncaughtException', (error) => {
  console.error('Excepción no capturada:', error);
  process.exit(1);
});

// Ejecutar aplicación
main();
