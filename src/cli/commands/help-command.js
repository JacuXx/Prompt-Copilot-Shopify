/**
 * Comando de ayuda
 * Principio: Single Responsibility - Solo muestra la ayuda
 */

class HelpCommand {
  constructor(outputFormatter) {
    this.outputFormatter = outputFormatter;
  }

  /**
   * Ejecuta el comando de ayuda
   */
  execute() {
    this.outputFormatter.showHelp();
    return 0;
  }
}

module.exports = HelpCommand;
