# 🎯 Краткое руководство по запуску

## Быстрый старт (5 минут)

### 1. Установка зависимостей
```bash
npm install
```

### 2. Настройка проекта
```bash
npm run setup
```
*Введите ID Google Sheets и Discord Webhook URL*

### 3. Настройка Google Cloud Platform
```bash
npm run google-setup
```
*Следуйте инструкциям для создания Service Account*

### 4. Размещение учетных данных
```bash
# Скопируйте ваш JSON файл с ключами в:
cp /path/to/your/service-account.json credentials/google-credentials.json
```

### 5. Проверка конфигурации
```bash
npm run validate
```

### 6. Запуск!
```bash
npm start
```

## Что дальше?

- 📊 Добавьте данные в Google Sheets
- 👀 Наблюдайте уведомления в Discord
- 📝 Проверяйте логи в папке `logs/`
- 🔧 Настраивайте конфигурацию в `src/config/config.js`

## Нужна помощь?

- 📚 Полная документация: `docs/INSTALLATION.md`
- 🐛 Проблемы? Проверьте раздел "Типичные проблемы" в README.md
- 💬 Вопросы? Создайте Issue на GitHub
