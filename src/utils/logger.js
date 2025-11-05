/**
 * Logger con formateo de colores
 * Principio: Single Responsibility - Solo se encarga de logging
 */

const COLORS = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  blue: '\x1b[34m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  cyan: '\x1b[36m'
};

class Logger {
  constructor(silent = false) {
    this.silent = silent;
  }

  log(message, color = 'reset') {
    if (!this.silent) {
      console.log(`${COLORS[color]}${message}${COLORS.reset}`);
    }
  }

  success(message) {
    this.log(`✓ ${message}`, 'green');
  }

  error(message) {
    this.log(`✗ ${message}`, 'red');
  }

  warning(message) {
    this.log(`⚠ ${message}`, 'yellow');
  }

  info(message) {
    this.log(`ℹ ${message}`, 'blue');
  }

  title(message) {
    this.log(`\n${message}`, 'cyan');
    this.log('═'.repeat(51), 'cyan');
  }

  separator() {
    this.log('═'.repeat(51), 'cyan');
  }

  emptyLine() {
    if (!this.silent) {
      console.log();
    }
  }
}

module.exports = Logger;
