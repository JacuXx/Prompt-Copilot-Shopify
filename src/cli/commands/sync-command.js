/**
 * Comando de sincronización
 * Principio: Command Pattern - Encapsula una acción completa
 */

const config = require('../../config');
const { ForceSyncStrategy, NormalSyncStrategy } = require('../../core/sync/sync-strategy');

class SyncCommand {
  constructor(syncService, outputFormatter) {
    this.syncService = syncService;
    this.outputFormatter = outputFormatter;
  }

  /**
   * Ejecuta el comando de sincronización
   * @param {Object} options - Opciones del comando
   */
  async execute(options = {}) {
    const { force = false } = options;

    try {
      // Mostrar encabezado
      this.outputFormatter.showHeader(config.hasAuthToken());

      // Configurar estrategia
      const strategy = force ? new ForceSyncStrategy() : new NormalSyncStrategy();
      this.syncService.setStrategy(strategy);

      // Ejecutar sincronización
      const result = await this.syncService.sync({
        targetDir: config.sync.targetDir,
        remotePath: config.repo.docsPath,
        force
      });

      // Mostrar resumen
      this.outputFormatter.showSummary(result);

      // Retornar código de salida
      return result.hasErrors() ? 1 : 0;
    } catch (error) {
      this.outputFormatter.showError(error);
      return 1;
    }
  }
}

module.exports = SyncCommand;
