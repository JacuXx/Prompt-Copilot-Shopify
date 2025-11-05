/**
 * Filtro de archivos
 * Principio: Single Responsibility - Solo filtra archivos según criterios
 * Principio: Open/Closed - Fácil de extender con nuevos filtros
 */

class FileFilter {
  constructor(allowedExtensions = ['.md']) {
    this.allowedExtensions = allowedExtensions;
  }

  /**
   * Filtra archivos según criterios definidos
   * @param {Array} files - Lista de archivos de GitHub API
   * @returns {Array} Archivos filtrados
   */
  filter(files) {
    return files.filter(file => this._shouldInclude(file));
  }

  /**
   * Determina si un archivo debe incluirse
   * @private
   */
  _shouldInclude(file) {
    if (file.type !== 'file') {
      return false;
    }

    return this.allowedExtensions.some(ext => 
      file.name.endsWith(ext)
    );
  }

  /**
   * Obtiene solo archivos markdown
   * @param {Array} files - Lista de archivos
   * @returns {Array} Archivos markdown
   */
  static getMarkdownFiles(files) {
    const filter = new FileFilter(['.md']);
    return filter.filter(files);
  }
}

module.exports = FileFilter;
