/**
 * Parser de argumentos de línea de comandos
 * Principio: Single Responsibility - Solo parsea argumentos
 */

class ArgumentParser {
  constructor(args) {
    this.args = args || process.argv.slice(2);
  }

  /**
   * Verifica si un flag está presente
   * @param {...string} flags - Flags a buscar
   * @returns {boolean}
   */
  hasFlag(...flags) {
    return flags.some(flag => this.args.includes(flag));
  }

  /**
   * Verifica si se solicita ayuda
   * @returns {boolean}
   */
  wantsHelp() {
    return this.hasFlag('--help', '-h');
  }

  /**
   * Verifica si se solicita versión
   * @returns {boolean}
   */
  wantsVersion() {
    return this.hasFlag('--version', '-v');
  }

  /**
   * Verifica si se usa modo force
   * @returns {boolean}
   */
  isForce() {
    return this.hasFlag('--force', '-f');
  }

  /**
   * Obtiene las opciones parseadas
   * @returns {Object}
   */
  getOptions() {
    return {
      help: this.wantsHelp(),
      version: this.wantsVersion(),
      force: this.isForce()
    };
  }
}

module.exports = ArgumentParser;
