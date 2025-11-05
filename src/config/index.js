/**
 * Configuración central de la aplicación
 * Principio: Single Responsibility - Solo gestiona configuración
 */

class Config {
  constructor() {
    this.repo = {
      owner: process.env.REPO_OWNER || 'JacuXx',
      name: process.env.REPO_NAME || 'Prompt-Copilot-Shopify',
      branch: process.env.REPO_BRANCH || 'main',
      docsPath: process.env.DOCS_PATH || 'docs/copilot'
    };

    this.auth = {
      token: process.env.GITHUB_TOKEN || process.env.GH_TOKEN || null
    };

    this.github = {
      apiUrl: 'https://api.github.com',
      userAgent: 'shopify-copilot-docs-sync',
      apiVersion: 'application/vnd.github.v3+json'
    };

    this.sync = {
      targetDir: 'docs/copilot',
      fileExtensions: ['.md']
    };
  }

  hasAuthToken() {
    return !!this.auth.token;
  }

  getRepoUrl() {
    return `https://github.com/${this.repo.owner}/${this.repo.name}`;
  }

  getApiContentsUrl(path) {
    return `${this.github.apiUrl}/repos/${this.repo.owner}/${this.repo.name}/contents/${path}?ref=${this.repo.branch}`;
  }
}

module.exports = new Config();
