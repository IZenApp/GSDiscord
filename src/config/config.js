import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Загружаем переменные окружения из .env файла если он существует
const envPath = path.join(process.cwd(), '.env');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  envContent.split('\n').forEach(line => {
    const [key, ...valueParts] = line.split('=');
    if (key && valueParts.length > 0) {
      const value = valueParts.join('=').trim();
      if (value && !process.env[key]) {
        process.env[key] = value;
      }
    }
  });
}

/**
 * Конфигурация приложения
 */
export const config = {
  // Google Sheets настройки
  google: {
    scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    credentialsPath: path.join(process.cwd(), 'credentials', 'google-credentials.json'),
    sheetId: process.env.GOOGLE_SHEET_ID || 'YOUR_SHEET_ID_HERE',
    range: 'Sheet1!C2:F' // Диапазон данных
  },

  // Discord настройки
  discord: {
    webhookUrl: process.env.DISCORD_WEBHOOK_URL || 'YOUR_DISCORD_WEBHOOK_URL_HERE',
    embedColor: 0xFFA500,
    mentionEveryone: true
  },

  // Настройки приложения
  app: {
    checkInterval: parseInt(process.env.CHECK_INTERVAL) || 10000, // Интервал проверки в миллисекундах (10 секунд)
    logLevel: process.env.LOG_LEVEL || 'info'
  }
};

export default config;
