# 🔐 Руководство по безопасности GSDiscord

## ⚠️ КРИТИЧНО: Защита конфиденциальных данных

### 🔑 Файлы, которые НИКОГДА не должны попадать в Git:

#### Учетные данные Google
- `credentials/google-credentials.json`
- Любые файлы с суффиксами: `-credentials`, `-service-account`, `-key`
- JSON файлы с приватными ключами Google Cloud

#### Discord токены и webhook'и
- `discord.json`, `discordbot.json`
- Файлы содержащие Discord Bot Token
- Webhook URL'ы в открытом виде

#### Переменные окружения
- `.env` (основной файл с секретами)
- `.env.production`, `.env.staging`
- Любые файлы конфигурации с API ключами

#### Базы данных и логи
- `*.sql`, `*.dump`, `*.sqlite`
- Файлы логов с чувствительной информацией
- Бэкапы баз данных

## 🛡️ Рекомендации по безопасности:

### 1. Переменные окружения
```bash
# ✅ Правильно - используйте .env файл
GOOGLE_SHEET_ID=your_sheet_id
DISCORD_WEBHOOK_URL=your_webhook_url

# ❌ Неправильно - НЕ захардкоживайте в коде
const webhookUrl = "https://discord.com/api/webhooks/123456789/secret_token"
```

### 2. Файлы учетных данных
```bash
# ✅ Правильно - в отдельной папке с .gitignore
credentials/google-credentials.json

# ❌ Неправильно - в корне проекта
google-service-account.json
```

### 3. Конфигурация
```javascript
// ✅ Правильно - через переменные окружения
const config = {
  sheetId: process.env.GOOGLE_SHEET_ID,
  webhookUrl: process.env.DISCORD_WEBHOOK_URL
};

// ❌ Неправильно - захардкоженные значения
const config = {
  sheetId: "1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms",
  webhookUrl: "https://discord.com/api/webhooks/real_webhook_url"
};
```

## 🚨 Что делать, если секреты попали в Git:

### 1. Немедленные действия:
```bash
# Удалите файл из индекса
git rm --cached credentials/google-credentials.json

# Добавьте в .gitignore
echo "credentials/" >> .gitignore

# Закоммитьте изменения
git add .gitignore
git commit -m "🔐 Add sensitive files to .gitignore"
```

### 2. Очистка истории Git (ОСТОРОЖНО!):
```bash
# Удаление файла из всей истории
git filter-branch --force --index-filter \
  'git rm --cached --ignore-unmatch credentials/google-credentials.json' \
  --prune-empty --tag-name-filter cat -- --all

# Принудительный push (ТОЛЬКО если уверены!)
git push origin --force --all
```

### 3. Обновите все токены и ключи:
- 🔄 Пересоздайте Google Service Account
- 🔄 Сгенерируйте новые Discord Webhook URL
- 🔄 Обновите все API ключи
- 🔄 Измените пароли и токены доступа

## ✅ Checklist перед каждым commit:

- [ ] Проверил `.env` файл - он в `.gitignore`?
- [ ] Нет ли захардкоженных API ключей в коде?
- [ ] Все учетные данные в папке `credentials/`?
- [ ] Запустил `git status` и проверил список файлов?
- [ ] Убедился, что логи не содержат секретов?

## 🔍 Полезные команды для проверки:

```bash
# Поиск потенциальных секретов в коде
grep -r "sk_" .              # Stripe API keys
grep -r "pk_" .              # Public keys
grep -r "secret" .           # Общие секреты
grep -r "token" .            # Токены
grep -r "password" .         # Пароли
grep -r "api_key" .          # API ключи

# Проверка что файлы в .gitignore
git check-ignore credentials/google-credentials.json
git check-ignore .env

# Просмотр файлов которые будут закоммичены
git diff --cached --name-only
```

## 📋 Контрольный список для команды:

### Для разработчиков:
- ✅ Никогда не коммитьте `.env` файлы
- ✅ Используйте `.env.example` для примеров
- ✅ Регулярно обновляйте зависимости
- ✅ Проверяйте код на уязвимости

### Для DevOps:
- ✅ Настройте автоматическое сканирование секретов
- ✅ Используйте отдельные учетные данные для разных сред
- ✅ Регулярно ротируйте ключи и токены
- ✅ Мониторьте доступ к API

## 🆘 Контакты для экстренных случаев:

Если вы обнаружили утечку данных:
1. Немедленно отзовите скомпрометированные ключи
2. Уведомите команду безопасности
3. Создайте инцидент в системе трекинга
4. Обновите документацию по безопасности

---

**⚠️ ПОМНИТЕ: Безопасность - это ответственность каждого разработчика!**
