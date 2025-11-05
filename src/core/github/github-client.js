/**
 * Cliente de GitHub API
 * Principio: Single Responsibility - Solo interactúa con GitHub API
 * Principio: Open/Closed - Abierto a extensión (nuevos métodos), cerrado a modificación
 */

const HttpClient = require('../../utils/http-client');
const config = require('../../config');

class GitHubClient {
  constructor(httpClient = new HttpClient()) {
    this.httpClient = httpClient;
  }

  /**
   * Obtiene los contenidos de un directorio del repositorio
   * @param {string} path - Ruta dentro del repositorio
   * @returns {Promise<Array>} Lista de archivos
   */
  async getRepoContents(path) {
    const url = config.getApiContentsUrl(path);
    const headers = this._getHeaders();

    try {
      const data = await this.httpClient.get(url, headers);
      
      if (!Array.isArray(data)) {
        throw new Error('Respuesta inesperada de la API de GitHub');
      }

      return data;
    } catch (error) {
      throw this._enrichError(error);
    }
  }

  /**
   * Descarga un archivo desde GitHub
   * @param {string} downloadUrl - URL de descarga del archivo
   * @param {string} destPath - Ruta de destino local
   * @returns {Promise<void>}
   */
  async downloadFile(downloadUrl, destPath) {
    const headers = {};
    
    if (config.hasAuthToken()) {
      headers['Authorization'] = `token ${config.auth.token}`;
    }

    await this.httpClient.download(downloadUrl, destPath, headers);
  }

  /**
   * Genera las cabeceras HTTP para las peticiones a GitHub
   * @private
   */
  _getHeaders() {
    const headers = {
      'User-Agent': config.github.userAgent,
      'Accept': config.github.apiVersion
    };

    if (config.hasAuthToken()) {
      headers['Authorization'] = `token ${config.auth.token}`;
    }

    return headers;
  }

  /**
   * Enriquece los errores con información útil para el usuario
   * @private
   */
  _enrichError(error) {
    let message = error.message;
    
    if (error.message.includes('404')) {
      message += '\n\n   💡 Posibles soluciones:';
      message += `\n   1. Verifica que el repositorio existe: ${config.getRepoUrl()}`;
      message += `\n   2. Asegúrate de haber hecho push de la carpeta ${config.repo.docsPath} a GitHub`;
      message += `\n   3. Verifica que la rama '${config.repo.branch}' existe`;
      message += '\n   4. Si el repo es privado, necesitas configurar un token de acceso';
    }

    return new Error(message);
  }
}

module.exports = GitHubClient;
