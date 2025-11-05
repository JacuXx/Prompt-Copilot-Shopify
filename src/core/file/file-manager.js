/**
 * Gestor de operaciones de archivos
 * Principio: Single Responsibility - Solo maneja operaciones del sistema de archivos
 */

const fs = require('fs');
const path = require('path');

class FileManager {
  /**
   * Verifica si un archivo existe
   * @param {string} filePath - Ruta del archivo
   * @returns {boolean}
   */
  exists(filePath) {
    return fs.existsSync(filePath);
  }

  /**
   * Crea un directorio recursivamente
   * @param {string} dirPath - Ruta del directorio
   */
  createDirectory(dirPath) {
    if (!this.exists(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
  }

  /**
   * Obtiene la ruta completa del directorio objetivo
   * @param {string} relativePath - Ruta relativa
   * @returns {string} Ruta absoluta
   */
  getTargetPath(relativePath) {
    return path.join(process.cwd(), relativePath);
  }

  /**
   * Une rutas de archivos
   * @param {...string} paths - Segmentos de ruta
   * @returns {string} Ruta completa
   */
  joinPath(...paths) {
    return path.join(...paths);
  }

  /**
   * Obtiene el nombre del archivo desde una ruta
   * @param {string} filePath - Ruta del archivo
   * @returns {string} Nombre del archivo
   */
  getFileName(filePath) {
    return path.basename(filePath);
  }

  /**
   * Obtiene la extensión del archivo
   * @param {string} filePath - Ruta del archivo
   * @returns {string} Extensión del archivo
   */
  getExtension(filePath) {
    return path.extname(filePath);
  }
}

module.exports = FileManager;
