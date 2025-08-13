import { google } from 'googleapis';
import { GoogleAuth } from 'google-auth-library';
import config from '../config/config.js';
import { logger } from '../utils/logger.js';

/**
 * Сервис для работы с Google Sheets
 */
export class GoogleSheetsService {
  constructor() {
    this.auth = new GoogleAuth({
      keyFile: config.google.credentialsPath,
      scopes: config.google.scopes,
    });
    this.sheets = google.sheets({ version: 'v4', auth: this.auth });
    this.previousData = [];
  }

  /**
   * Получение заголовков из Google Sheets
   * @returns {Promise<Array>} Массив заголовков
   */
  async getSheetHeaders() {
    try {
      const response = await this.sheets.spreadsheets.values.get({
        spreadsheetId: config.google.sheetId,
        range: 'Sheet1!C1:F1',
      });
      
      const headers = response.data.values?.[0] || [];
      logger.info(`Получены заголовки: ${headers.join(', ')}`);
      return headers;
    } catch (error) {
      logger.error('Ошибка при получении заголовков из Google Sheets:', error);
      return [];
    }
  }

  /**
   * Проверка обновлений в Google Sheets
   * @returns {Promise<Array|null>} Новые данные или null, если обновлений нет
   */
  async checkForUpdates() {
    try {
      const response = await this.sheets.spreadsheets.values.get({
        spreadsheetId: config.google.sheetId,
        range: config.google.range,
      });
      
      const currentData = response.data.values || [];
      
      if (JSON.stringify(currentData) !== JSON.stringify(this.previousData)) {
        logger.info('Обнаружены обновления в Google Sheets');
        this.previousData = currentData;
        return currentData[currentData.length - 1]; // Возвращаем последнюю строку
      }
      
      return null;
    } catch (error) {
      logger.error('Ошибка при получении данных из Google Sheets:', error);
      return null;
    }
  }

  /**
   * Инициализация начальных данных
   * @returns {Promise<void>}
   */
  async initialize() {
    try {
      this.previousData = await this.checkForUpdates();
      logger.info('GoogleSheetsService инициализирован');
    } catch (error) {
      logger.error('Ошибка при инициализации GoogleSheetsService:', error);
    }
  }
}

export default GoogleSheetsService;
