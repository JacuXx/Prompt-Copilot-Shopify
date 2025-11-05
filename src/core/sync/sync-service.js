/**
 * Servicio de sincronización
 * Principio: Single Responsibility - Orquesta el proceso de sincronización
 * Principio: Dependency Inversion - Depende de abstracciones, no de implementaciones concretas
 * Principio: Open/Closed - Fácil de extender sin modificar
 */

const SyncResult = require('./sync-result');
const { NormalSyncStrategy } = require('./sync-strategy');

class SyncService {
  constructor(githubClient, fileManager, fileFilter, logger) {
    this.githubClient = githubClient;
    this.fileManager = fileManager;
    this.fileFilter = fileFilter;
    this.logger = logger;
    this.strategy = new NormalSyncStrategy();
  }

  /**
   * Establece la estrategia de sincronización
   * @param {SyncStrategy} strategy - Estrategia a usar
   */
  setStrategy(strategy) {
    this.strategy = strategy;
  }

  /**
   * Sincroniza documentación desde GitHub
   * @param {Object} options - Opciones de sincronización
   * @returns {Promise<SyncResult>}
   */
  async sync(options = {}) {
    const { targetDir, remotePath, force = false } = options;
    const result = new SyncResult();

    try {
      // 1. Preparar directorio
      const targetPath = this.fileManager.getTargetPath(targetDir);
      this._ensureDirectory(targetPath);

      // 2. Obtener archivos del repositorio
      this.logger.info('📡 Obteniendo lista de archivos del repositorio...');
      const files = await this.githubClient.getRepoContents(remotePath);

      // 3. Filtrar archivos relevantes
      const filteredFiles = this.fileFilter.filter(files);
      this.logger.emptyLine();
      this.logger.log(`📚 Se encontraron ${filteredFiles.length} archivos para sincronizar`, 'yellow');
      this.logger.emptyLine();

      // 4. Procesar cada archivo
      for (const file of filteredFiles) {
        await this._processFile(file, targetPath, force, result);
      }

      return result;
    } catch (error) {
      throw new Error(`Error en sincronización: ${error.message}`);
    }
  }

  /**
   * Asegura que el directorio existe
   * @private
   */
  _ensureDirectory(targetPath) {
    if (!this.fileManager.exists(targetPath)) {
      this.fileManager.createDirectory(targetPath);
      this.logger.success('Carpeta docs/copilot creada');
    }
  }

  /**
   * Procesa un archivo individual
   * @private
   */
  async _processFile(file, targetPath, force, result) {
    const destPath = this.fileManager.joinPath(targetPath, file.name);
    const fileExists = this.fileManager.exists(destPath);

    // Verificar si debe sincronizarse
    if (!this.strategy.shouldSync(fileExists, force)) {
      this.logger.warning(`${file.name} (ya existe, usa --force para sobrescribir)`);
      result.recordSkip();
      return;
    }

    // Descargar archivo
    try {
      await this.githubClient.downloadFile(file.download_url, destPath);
      const status = this.strategy.getStatusMessage(fileExists);
      this.logger.success(`${file.name} ${status}`);
      result.recordDownload();
    } catch (error) {
      this.logger.error(`${file.name} (error: ${error.message})`);
      result.recordError(file.name, error);
    }
  }
}

module.exports = SyncService;
