/**
 * Aplicación CLI
 * Principio: Single Responsibility - Coordina la ejecución de comandos
 * Principio: Dependency Injection - Todas las dependencias se inyectan
 */

const ArgumentParser = require('./argument-parser');

class CliApp {
  constructor(syncCommand, helpCommand, versionCommand) {
    this.syncCommand = syncCommand;
    this.helpCommand = helpCommand;
    this.versionCommand = versionCommand;
  }

  /**
   * Ejecuta la aplicación
   * @param {Array<string>} args - Argumentos de línea de comandos
   * @returns {Promise<number>} Código de salida
   */
  async run(args) {
    const parser = new ArgumentParser(args);
    const options = parser.getOptions();

    try {
      // Determinar qué comando ejecutar
      if (options.help) {
        return this.helpCommand.execute();
      }

      if (options.version) {
        return this.versionCommand.execute();
      }

      // Por defecto, ejecutar sincronización
      return await this.syncCommand.execute({ force: options.force });
    } catch (error) {
      console.error(`Error inesperado: ${error.message}`);
      return 1;
    }
  }
}

module.exports = CliApp;
