#!/usr/bin/env node

import fs from 'fs';
import path from 'path';

function validateConfig() {
  console.log('🔍 Проверка конфигурации...\n');
  
  let hasErrors = false;

  // Проверка .env файла
  const envPath = path.join(process.cwd(), '.env');
  if (!fs.existsSync(envPath)) {
    console.log('❌ Файл .env не найден');
    console.log('   Запустите: npm run setup\n');
    hasErrors = true;
  } else {
    console.log('✅ Файл .env найден');
  }

  // Проверка файла учетных данных
  const credentialsPath = path.join(process.cwd(), 'credentials', 'google-credentials.json');
  if (!fs.existsSync(credentialsPath)) {
    console.log('❌ Файл учетных данных Google не найден');
    console.log('   Поместите файл в: credentials/google-credentials.json\n');
    hasErrors = true;
  } else {
    console.log('✅ Файл учетных данных Google найден');
    
    // Проверка валидности JSON
    try {
      const credentials = JSON.parse(fs.readFileSync(credentialsPath, 'utf8'));
      if (!credentials.type || !credentials.project_id || !credentials.private_key) {
        console.log('❌ Неверный формат файла учетных данных');
        hasErrors = true;
      } else {
        console.log('✅ Файл учетных данных валиден');
      }
    } catch (error) {
      console.log('❌ Ошибка при чтении файла учетных данных:', error.message);
      hasErrors = true;
    }
  }

  // Проверка структуры проекта
  const requiredDirs = ['src', 'src/config', 'src/services', 'src/utils', 'logs', 'credentials'];
  const requiredFiles = ['src/index.js', 'src/config/config.js', 'package.json'];

  console.log('\n🏗️  Проверка структуры проекта...');
  
  requiredDirs.forEach(dir => {
    const dirPath = path.join(process.cwd(), dir);
    if (fs.existsSync(dirPath)) {
      console.log(`✅ Папка ${dir} существует`);
    } else {
      console.log(`❌ Папка ${dir} не найдена`);
      hasErrors = true;
    }
  });

  requiredFiles.forEach(file => {
    const filePath = path.join(process.cwd(), file);
    if (fs.existsSync(filePath)) {
      console.log(`✅ Файл ${file} существует`);
    } else {
      console.log(`❌ Файл ${file} не найден`);
      hasErrors = true;
    }
  });

  // Проверка зависимостей
  console.log('\n📦 Проверка зависимостей...');
  try {
    const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    const requiredDeps = ['googleapis', 'google-auth-library', 'node-fetch'];
    
    requiredDeps.forEach(dep => {
      if (packageJson.dependencies && packageJson.dependencies[dep]) {
        console.log(`✅ Зависимость ${dep} установлена`);
      } else {
        console.log(`❌ Зависимость ${dep} не установлена`);
        hasErrors = true;
      }
    });
  } catch (error) {
    console.log('❌ Ошибка при чтении package.json:', error.message);
    hasErrors = true;
  }

  // Итог
  console.log('\n' + '='.repeat(50));
  if (hasErrors) {
    console.log('❌ Обнаружены ошибки в конфигурации');
    console.log('   Исправьте ошибки перед запуском бота');
    process.exit(1);
  } else {
    console.log('✅ Конфигурация корректна! Бот готов к запуску');
    console.log('   Запустите бота командой: npm start');
  }
}

validateConfig();
