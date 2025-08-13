import GoogleSheetsService from './services/GoogleSheetsService.js';
import DiscordService from './services/DiscordService.js';
import config from './config/config.js';
import { logger } from './utils/logger.js';

/**
 * Основной класс приложения GSDiscord
 */
class GSDiscordBot {
  constructor() {
    this.googleSheetsService = new GoogleSheetsService();
    this.discordService = new DiscordService();
    this.isRunning = false;
    this.intervalId = null;
  }

  /**
   * Инициализация бота
   */
  async initialize() {
    try {
      logger.info('Инициализация GSDiscord бота...');
      
      // Проверяем конфигурацию
      this.validateConfig();
      
      // Инициализируем сервисы
      await this.googleSheetsService.initialize();
      
      // Отправляем уведомление о запуске
      await this.discordService.sendStartupNotification();
      
      logger.info('GSDiscord бот успешно инициализирован');
    } catch (error) {
      logger.error('Ошибка при инициализации бота', error);
      throw error;
    }
  }

  /**
   * Проверка конфигурации
   */
  validateConfig() {
    if (config.google.sheetId === 'YOUR_SHEET_ID_HERE') {
      throw new Error('Необходимо указать ID Google Sheets в конфигурации');
    }
    
    if (config.discord.webhookUrl === 'YOUR_DISCORD_WEBHOOK_URL_HERE') {
      throw new Error('Необходимо указать Discord Webhook URL в конфигурации');
    }
    
    logger.info('Конфигурация проверена успешно');
  }

  /**
   * Основной цикл проверки обновлений
   */
  async checkUpdates() {
    try {
      const updates = await this.googleSheetsService.checkForUpdates();
      
      if (updates) {
        logger.info('Найдены новые данные, отправляем в Discord...');
        const headers = await this.googleSheetsService.getSheetHeaders();
        await this.discordService.sendMessage(updates, headers);
      }
    } catch (error) {
      logger.error('Ошибка при проверке обновлений', error);
    }
  }

  /**
   * Запуск бота
   */
  async start() {
    try {
      if (this.isRunning) {
        logger.warn('Бот уже запущен');
        return;
      }

      await this.initialize();
      
      this.isRunning = true;
      logger.info(`Запуск мониторинга с интервалом ${config.app.checkInterval}ms`);
      
      // Запускаем периодическую проверку
      this.intervalId = setInterval(async () => {
        await this.checkUpdates();
      }, config.app.checkInterval);
      
      logger.info('GSDiscord бот успешно запущен и работает');
      
    } catch (error) {
      logger.error('Критическая ошибка при запуске бота', error);
      process.exit(1);
    }
  }

  /**
   * Остановка бота
   */
  async stop() {
    if (!this.isRunning) {
      logger.warn('Бот уже остановлен');
      return;
    }

    logger.info('Остановка GSDiscord бота...');
    
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    
    this.isRunning = false;
    logger.info('GSDiscord бот остановлен');
  }
}

// Создаем и запускаем бота
const bot = new GSDiscordBot();

// Graceful shutdown
process.on('SIGINT', async () => {
  logger.info('Получен сигнал SIGINT, останавливаем бота...');
  await bot.stop();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  logger.info('Получен сигнал SIGTERM, останавливаем бота...');
  await bot.stop();
  process.exit(0);
});

// Обработка необработанных ошибок
process.on('unhandledRejection', (reason, promise) => {
  logger.error('Необработанное отклонение промиса', reason);
});

process.on('uncaughtException', (error) => {
  logger.error('Необработанная ошибка', error);
  process.exit(1);
});

// Запускаем бота
bot.start();

export default GSDiscordBot;
