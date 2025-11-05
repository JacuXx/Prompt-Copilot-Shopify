/**
 * Estrategia de sincronización
 * Principio: Strategy Pattern - Define cómo sincronizar archivos
 * Principio: Open/Closed - Fácil agregar nuevas estrategias
 */

class SyncStrategy {
  /**
   * Determina si un archivo debe sincronizarse
   * @param {boolean} fileExists - Si el archivo ya existe
   * @param {boolean} force - Si se fuerza la sincronización
   * @returns {boolean}
   */
  shouldSync(fileExists, force) {
    throw new Error('shouldSync must be implemented');
  }

  /**
   * Obtiene el mensaje de estado
   * @param {boolean} fileExists - Si el archivo ya existe
   * @returns {string}
   */
  getStatusMessage(fileExists) {
    throw new Error('getStatusMessage must be implemented');
  }
}

/**
 * Estrategia normal: no sobrescribe archivos existentes
 */
class NormalSyncStrategy extends SyncStrategy {
  shouldSync(fileExists, force) {
    return !fileExists || force;
  }

  getStatusMessage(fileExists) {
    return fileExists ? '(actualizado)' : '(descargado)';
  }
}

/**
 * Estrategia forzada: siempre sobrescribe
 */
class ForceSyncStrategy extends SyncStrategy {
  shouldSync(fileExists, force) {
    return true;
  }

  getStatusMessage(fileExists) {
    return fileExists ? '(actualizado)' : '(descargado)';
  }
}

module.exports = {
  SyncStrategy,
  NormalSyncStrategy,
  ForceSyncStrategy
};
