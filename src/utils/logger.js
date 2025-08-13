import fs from 'fs';
import path from 'path';

/**
 * Простой логгер для приложения
 */
class Logger {
  constructor() {
    this.logDir = path.join(process.cwd(), 'logs');
    this.ensureLogDirectory();
  }

  /**
   * Создание директории для логов если её нет
   */
  ensureLogDirectory() {
    if (!fs.existsSync(this.logDir)) {
      fs.mkdirSync(this.logDir, { recursive: true });
    }
  }

  /**
   * Получение текущей даты в формате строки
   * @returns {string} Форматированная дата
   */
  getCurrentTimestamp() {
    return new Date().toLocaleString('ru-RU');
  }

  /**
   * Запись лога в файл
   * @param {string} level - Уровень лога
   * @param {string} message - Сообщение
   */
  writeToFile(level, message) {
    const today = new Date().toISOString().split('T')[0];
    const logFile = path.join(this.logDir, `${today}.log`);
    const logEntry = `[${this.getCurrentTimestamp()}] [${level.toUpperCase()}] ${message}\n`;
    
    fs.appendFileSync(logFile, logEntry);
  }

  /**
   * Логирование информационного сообщения
   * @param {string} message - Сообщение
   */
  info(message) {
    const timestamp = this.getCurrentTimestamp();
    console.log(`[${timestamp}] [INFO] ${message}`);
    this.writeToFile('info', message);
  }

  /**
   * Логирование ошибки
   * @param {string} message - Сообщение об ошибке
   * @param {Error} error - Объект ошибки
   */
  error(message, error = null) {
    const timestamp = this.getCurrentTimestamp();
    const errorMessage = error ? `${message}: ${error.message}` : message;
    console.error(`[${timestamp}] [ERROR] ${errorMessage}`);
    this.writeToFile('error', errorMessage);
    
    if (error && error.stack) {
      console.error(error.stack);
      this.writeToFile('error', error.stack);
    }
  }

  /**
   * Логирование предупреждения
   * @param {string} message - Сообщение
   */
  warn(message) {
    const timestamp = this.getCurrentTimestamp();
    console.warn(`[${timestamp}] [WARN] ${message}`);
    this.writeToFile('warn', message);
  }

  /**
   * Логирование отладочной информации
   * @param {string} message - Сообщение
   */
  debug(message) {
    const timestamp = this.getCurrentTimestamp();
    console.debug(`[${timestamp}] [DEBUG] ${message}`);
    this.writeToFile('debug', message);
  }
}

export const logger = new Logger();
export default logger;
