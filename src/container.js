/**
 * Contenedor de dependencias (Dependency Injection Container)
 * Principio: Dependency Inversion - Gestiona todas las dependencias de la aplicación
 * Principio: Single Responsibility - Solo crea y conecta dependencias
 */

const config = require('./config');
const Logger = require('./utils/logger');
const HttpClient = require('./utils/http-client');
const GitHubClient = require('./core/github/github-client');
const FileManager = require('./core/file/file-manager');
const FileFilter = require('./core/file/file-filter');
const SyncService = require('./core/sync/sync-service');
const OutputFormatter = require('./cli/output/output-formatter');
const SyncCommand = require('./cli/commands/sync-command');
const HelpCommand = require('./cli/commands/help-command');
const VersionCommand = require('./cli/commands/version-command');
const CliApp = require('./cli/cli-app');

/**
 * Crea y configura todas las dependencias de la aplicación
 */
class Container {
  constructor() {
    this._instances = {};
  }

  /**
   * Obtiene o crea el logger
   */
  getLogger() {
    if (!this._instances.logger) {
      this._instances.logger = new Logger();
    }
    return this._instances.logger;
  }

  /**
   * Obtiene o crea el cliente HTTP
   */
  getHttpClient() {
    if (!this._instances.httpClient) {
      this._instances.httpClient = new HttpClient();
    }
    return this._instances.httpClient;
  }

  /**
   * Obtiene o crea el cliente de GitHub
   */
  getGitHubClient() {
    if (!this._instances.githubClient) {
      this._instances.githubClient = new GitHubClient(this.getHttpClient());
    }
    return this._instances.githubClient;
  }

  /**
   * Obtiene o crea el gestor de archivos
   */
  getFileManager() {
    if (!this._instances.fileManager) {
      this._instances.fileManager = new FileManager();
    }
    return this._instances.fileManager;
  }

  /**
   * Obtiene o crea el filtro de archivos
   */
  getFileFilter() {
    if (!this._instances.fileFilter) {
      this._instances.fileFilter = new FileFilter(config.sync.fileExtensions);
    }
    return this._instances.fileFilter;
  }

  /**
   * Obtiene o crea el servicio de sincronización
   */
  getSyncService() {
    if (!this._instances.syncService) {
      this._instances.syncService = new SyncService(
        this.getGitHubClient(),
        this.getFileManager(),
        this.getFileFilter(),
        this.getLogger()
      );
    }
    return this._instances.syncService;
  }

  /**
   * Obtiene o crea el formateador de salida
   */
  getOutputFormatter() {
    if (!this._instances.outputFormatter) {
      this._instances.outputFormatter = new OutputFormatter(this.getLogger());
    }
    return this._instances.outputFormatter;
  }

  /**
   * Obtiene o crea el comando de sincronización
   */
  getSyncCommand() {
    if (!this._instances.syncCommand) {
      this._instances.syncCommand = new SyncCommand(
        this.getSyncService(),
        this.getOutputFormatter()
      );
    }
    return this._instances.syncCommand;
  }

  /**
   * Obtiene o crea el comando de ayuda
   */
  getHelpCommand() {
    if (!this._instances.helpCommand) {
      this._instances.helpCommand = new HelpCommand(this.getOutputFormatter());
    }
    return this._instances.helpCommand;
  }

  /**
   * Obtiene o crea el comando de versión
   */
  getVersionCommand() {
    if (!this._instances.versionCommand) {
      this._instances.versionCommand = new VersionCommand(this.getOutputFormatter());
    }
    return this._instances.versionCommand;
  }

  /**
   * Obtiene o crea la aplicación CLI
   */
  getCliApp() {
    if (!this._instances.cliApp) {
      this._instances.cliApp = new CliApp(
        this.getSyncCommand(),
        this.getHelpCommand(),
        this.getVersionCommand()
      );
    }
    return this._instances.cliApp;
  }
}

module.exports = new Container();
