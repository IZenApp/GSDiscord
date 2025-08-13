import fetch from 'node-fetch';
import config from '../config/config.js';
import { logger } from '../utils/logger.js';

/**
 * Сервис для работы с Discord
 */
export class DiscordService {
  constructor() {
    this.webhookUrl = config.discord.webhookUrl;
  }

  /**
   * Отправка сообщения в Discord
   * @param {Array} formData - Данные формы
   * @param {Array} headers - Заголовки полей
   * @returns {Promise<boolean>} Успешность отправки
   */
  async sendMessage(formData, headers) {
    try {
      const fieldsForDiscord = formData.map((item, index) => {
        const header = headers[index] || `Поле ${index + 1}`;
        return `**${header}:**\n${item}`;
      }).join('\n\n');

      const payload = {
        embeds: [{
          title: '📋 Новая запись в Google Sheets',
          description: fieldsForDiscord,
          color: config.discord.embedColor,
          footer: {
            text: 'Обновлено: ' + new Date().toLocaleString('ru-RU'),
          },
          timestamp: new Date().toISOString(),
        }],
        content: config.discord.mentionEveryone ? '@everyone' : null,
      };
      
      const response = await fetch(this.webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      
      if (response.status === 204) {
        logger.info('Сообщение успешно отправлено в Discord');
        return true;
      } else {
        logger.error(`Ошибка при отправке в Discord: ${response.status}`);
        return false;
      }
    } catch (error) {
      logger.error('Ошибка при отправке в Discord:', error);
      return false;
    }
  }

  /**
   * Отправка уведомления о запуске бота
   * @returns {Promise<void>}
   */
  async sendStartupNotification() {
    try {
      const payload = {
        embeds: [{
          title: '🚀 GSDiscord Bot запущен',
          description: 'Бот успешно запущен и начинает мониторинг Google Sheets',
          color: 0x00FF00,
          timestamp: new Date().toISOString(),
        }],
      };
      
      await fetch(this.webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      
      logger.info('Уведомление о запуске отправлено в Discord');
    } catch (error) {
      logger.error('Ошибка при отправке уведомления о запуске:', error);
    }
  }
}

export default DiscordService;
