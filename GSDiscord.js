// Импортируем необходимые библиотеки
import { google } from 'googleapis';
import { GoogleAuth } from 'google-auth-library';
import fetch from 'node-fetch';
import fs from 'fs';
import path from 'path';

// Настройки для Google Sheets API
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
const credentialsPath = path.join(process.cwd(), 'conf/discordbot.json');
const auth = new GoogleAuth({
  keyFile: credentialsPath,
  scopes: SCOPES,
});
const sheets = google.sheets({ version: 'v4', auth });

// Получаем лист Google Sheets
const sheetId = 'SheetsID'; // Замените на свой ID Google Sheets

// URL вебхука Discord
const discordWebhookUrl = 'DiscordWebhookURL'; // Замените на свой URL вебхука Discord

// Проверка обновлений в Google Sheets
let previousData = [];

// Получение заголовков из Google Sheets
async function getSheetHeaders() {
  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: sheetId,
      range: 'Sheet1!C1:F1', // Предполагается, что заголовки находятся в первой строке
    });
    return response.data.values[0] || []; // Возвращаем первую строку как массив заголовков
  } catch (error) {
    console.error('Ошибка при получении заголовков из Google Sheets:', error);
    return [];
  }
}

async function checkForUpdates() {
  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: sheetId,
      range: 'Sheet1!C2:F', // Укажите диапазон ваших данных
    });
    const currentData = response.data.values || [];

    if (JSON.stringify(currentData) !== JSON.stringify(previousData)) {
      previousData = currentData;
      return currentData[currentData.length - 1]; // Возвращаем только последнюю строку
    } else {
      return null;
    }
  } catch (error) {
    console.error('Ошибка при получении данных из Google Sheets:', error);
    return null;
  }
}

// Отправка сообщения в Discord
async function sendMessageToDiscord(formData) {
  const headers = await getSheetHeaders(); // Получаем заголовки (вопросы)

  const fieldsForDiscord = formData.map((item, index) => {
    const header = headers[index] || `Поле ${index + 1}`;
    return `**${header}:**\n${item}`;
  }).join('\n');

  try {
    const payload = {
      embeds: [{
        description: fieldsForDiscord,
        color: 0xFFA500,
        footer: {
          text: 'Обновлено: ' + new Date().toLocaleString(),
        },
      }],
      content: '@everyone', // Или другой текст, если нужно
    };
    
    const response = await fetch(discordWebhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    
    if (response.status === 204) {
      console.log('Сообщение успешно отправлено в Discord.');
    } else {
      console.log(`Ошибка при отправке в Discord: ${response.status}`);
    }
  } catch (error) {
    console.error('Ошибка при отправке в Discord:', error);
  }
}

// Основной цикл проверки Google Sheets
async function main() {
  previousData = await checkForUpdates();

  setInterval(async () => {
    const updates = await checkForUpdates();
    if (updates) {
      await sendMessageToDiscord(updates); // Отправляем данные сразу в Discord
    }
  }, 10000); // Проверка каждые 10 секунд
}

main();
