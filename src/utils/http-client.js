/**
 * Cliente HTTP reutilizable
 * Principio: Single Responsibility - Solo maneja peticiones HTTP
 * Principio: Dependency Inversion - Depende de abstracciones (https module)
 */

const https = require('https');

class HttpClient {
  /**
   * Realiza una petición GET
   * @param {string} url - URL a consultar
   * @param {Object} headers - Cabeceras HTTP
   * @returns {Promise<Object>} Respuesta parseada como JSON
   */
  async get(url, headers = {}) {
    return new Promise((resolve, reject) => {
      https.get(url, { headers }, (response) => {
        let data = '';

        response.on('data', (chunk) => {
          data += chunk;
        });

        response.on('end', () => {
          if (response.statusCode !== 200) {
            reject(this._createError(response.statusCode, data, url));
            return;
          }

          try {
            resolve(JSON.parse(data));
          } catch (error) {
            reject(new Error(`Error parsing JSON: ${error.message}`));
          }
        });
      }).on('error', reject);
    });
  }

  /**
   * Descarga un archivo
   * @param {string} url - URL del archivo
   * @param {string} destPath - Ruta de destino
   * @param {Object} headers - Cabeceras HTTP
   * @returns {Promise<void>}
   */
  async download(url, destPath, headers = {}) {
    const fs = require('fs');
    
    return new Promise((resolve, reject) => {
      https.get(url, { headers }, (response) => {
        // Manejar redirecciones
        if (response.statusCode === 302 || response.statusCode === 301) {
          return this.download(response.headers.location, destPath, headers)
            .then(resolve)
            .catch(reject);
        }

        if (response.statusCode !== 200) {
          reject(new Error(`Error al descargar: ${response.statusCode}`));
          return;
        }

        const fileStream = fs.createWriteStream(destPath);
        response.pipe(fileStream);

        fileStream.on('finish', () => {
          fileStream.close();
          resolve();
        });

        fileStream.on('error', (err) => {
          fs.unlink(destPath, () => {});
          reject(err);
        });
      }).on('error', reject);
    });
  }

  /**
   * Crea un error detallado con información de la API
   * @private
   */
  _createError(statusCode, data, url) {
    let errorMsg = `HTTP Error ${statusCode}`;
    
    try {
      const errorData = JSON.parse(data);
      if (errorData.message) {
        errorMsg += `\n   Mensaje: ${errorData.message}`;
      }
      if (errorData.documentation_url) {
        errorMsg += `\n   Docs: ${errorData.documentation_url}`;
      }
    } catch (e) {
      // Si no se puede parsear, usar mensaje simple
    }
    
    errorMsg += `\n   URL: ${url}`;
    
    return new Error(errorMsg);
  }
}

module.exports = HttpClient;
