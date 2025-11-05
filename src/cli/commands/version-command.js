/**
 * Comando de versión
 * Principio: Single Responsibility - Solo muestra la versión
 */

class VersionCommand {
  constructor(outputFormatter) {
    this.outputFormatter = outputFormatter;
  }

  /**
   * Ejecuta el comando de versión
   */
  execute() {
    const packageJson = require('../../../package.json');
    this.outputFormatter.showVersion(packageJson.version);
    return 0;
  }
}

module.exports = VersionCommand;
