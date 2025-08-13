#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import readline from 'readline';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function ask(question) {
  return new Promise((resolve) => {
    rl.question(question, resolve);
  });
}

async function setup() {
  console.log('🚀 Настройка GSDiscord бота...\n');

  // Создание .env файла
  const envPath = path.join(process.cwd(), '.env');
  
  if (fs.existsSync(envPath)) {
    console.log('⚠️  Файл .env уже существует. Пропускаем создание...\n');
  } else {
    console.log('📝 Создание файла .env...');
    
    const sheetId = await ask('Введите ID вашего Google Sheets: ');
    const discordWebhook = await ask('Введите URL Discord Webhook: ');
    
    const envContent = `# Google Sheets Configuration
GOOGLE_SHEET_ID=${sheetId}

# Discord Configuration  
DISCORD_WEBHOOK_URL=${discordWebhook}

# Application Configuration
LOG_LEVEL=info
`;

    fs.writeFileSync(envPath, envContent);
    console.log('✅ Файл .env создан успешно!\n');
  }

  // Создание примера файла учетных данных
  const credentialsDir = path.join(process.cwd(), 'credentials');
  const credentialsExample = path.join(credentialsDir, 'google-credentials.example.json');
  
  if (!fs.existsSync(credentialsExample)) {
    console.log('📋 Создание примера файла учетных данных...');
    
    const exampleCredentials = {
      "type": "service_account",
      "project_id": "your-project-id",
      "private_key_id": "your-private-key-id",
      "private_key": "-----BEGIN PRIVATE KEY-----\\nYOUR_PRIVATE_KEY_HERE\\n-----END PRIVATE KEY-----\\n",
      "client_email": "your-service-account@your-project.iam.gserviceaccount.com",
      "client_id": "your-client-id",
      "auth_uri": "https://accounts.google.com/o/oauth2/auth",
      "token_uri": "https://oauth2.googleapis.com/token",
      "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
      "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/your-service-account%40your-project.iam.gserviceaccount.com"
    };
    
    fs.writeFileSync(credentialsExample, JSON.stringify(exampleCredentials, null, 2));
    console.log('✅ Пример файла учетных данных создан: credentials/google-credentials.example.json\n');
  }

  console.log('🎉 Настройка завершена!');
  console.log('\n📋 Следующие шаги:');
  console.log('1. Скопируйте ваш файл учетных данных Google в credentials/google-credentials.json');
  console.log('2. Проверьте настройки в файле .env');
  console.log('3. Запустите бота командой: npm start');
  console.log('\n📚 Подробные инструкции смотрите в README.md');

  rl.close();
}

setup().catch(console.error);
