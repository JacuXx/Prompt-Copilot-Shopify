/**
 * Resultado de sincronización
 * Principio: Single Responsibility - Solo almacena estadísticas
 */

class SyncResult {
  constructor() {
    this.downloaded = 0;
    this.skipped = 0;
    this.errors = 0;
    this.errorDetails = [];
  }

  recordDownload() {
    this.downloaded++;
  }

  recordSkip() {
    this.skipped++;
  }

  recordError(fileName, error) {
    this.errors++;
    this.errorDetails.push({ fileName, error: error.message });
  }

  getTotalProcessed() {
    return this.downloaded + this.skipped + this.errors;
  }

  hasErrors() {
    return this.errors > 0;
  }

  isSuccessful() {
    return this.errors === 0 && this.downloaded > 0;
  }
}

module.exports = SyncResult;
