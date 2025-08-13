# 🤝 Руководство по участию в проекте

Спасибо за интерес к проекту GSDiscord! Мы приветствуем любые вклады от сообщества.

## 🚀 Как начать

### 1. Подготовка рабочей среды

```bash
# 1. Fork репозиторий на GitHub
# 2. Клонируйте ваш fork
git clone https://github.com/ВАШ_USERNAME/GSDiscord.git
cd GSDiscord

# 3. Добавьте upstream репозиторий
git remote add upstream https://github.com/IZenApp/GSDiscord.git

# 4. Установите зависимости
npm install

# 5. Проверьте что все работает
npm run validate
npm run security
```

### 2. Создание новой ветки

```bash
# Синхронизируйтесь с upstream
git checkout main
git pull upstream main

# Создайте новую ветку
git checkout -b feature/your-feature-name
# или
git checkout -b fix/bug-description
```

## 📋 Типы вкладов

### 🐛 Исправление ошибок
- Найдите issue с меткой `bug` или создайте новую
- Опишите проблему и способ воспроизведения
- Создайте исправление с тестами

### ✨ Новые функции
- Обсудите идею в issue перед началом работы
- Создайте подробное описание функции
- Реализуйте с учетом существующей архитектуры

### 📚 Документация
- Улучшайте README, руководства, комментарии в коде
- Добавляйте примеры использования
- Переводите документацию

### 🧪 Тестирование
- Добавляйте unit тесты
- Тестируйте на разных платформах
- Создавайте интеграционные тесты

## 🎯 Стандарты кода

### JavaScript/Node.js
```javascript
// ✅ Хорошо
const config = {
  sheetId: process.env.GOOGLE_SHEET_ID,
  webhookUrl: process.env.DISCORD_WEBHOOK_URL
};

// ❌ Плохо
const config = {
  sheetId: "1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms",
  webhookUrl: "https://discord.com/api/webhooks/123/abc"
};
```

### Именование
- **Файлы:** `camelCase.js` или `kebab-case.js`
- **Классы:** `PascalCase`
- **Функции/переменные:** `camelCase`
- **Константы:** `UPPER_SNAKE_CASE`

### Комментарии
```javascript
/**
 * Получение данных из Google Sheets
 * @param {string} sheetId - ID таблицы
 * @param {string} range - Диапазон ячеек
 * @returns {Promise<Array>} Данные из таблицы
 */
async function getSheetData(sheetId, range) {
  // Реализация...
}
```

## 🔐 Безопасность

### ⚠️ КРИТИЧНО: Никогда не коммитьте:
- API ключи и токены
- Файлы учетных данных (.json)
- Переменные окружения (.env)
- Личные данные пользователей

### ✅ Перед каждым коммитом:
```bash
npm run security  # Проверка на секреты
npm run validate  # Валидация кода
npm run precommit # Полная проверка
```

## 📝 Процесс разработки

### 1. Планирование
- Обсудите идею в issue
- Получите одобрение мейнтейнеров
- Создайте план реализации

### 2. Разработка
- Следуйте архитектуре проекта
- Пишите чистый, понятный код
- Добавляйте комментарии для сложной логики

### 3. Тестирование
```bash
npm run security   # Проверка безопасности
npm run validate   # Валидация конфигурации  
npm test          # Запуск тестов (когда будут)
```

### 4. Документация
- Обновите README если нужно
- Добавьте комментарии к новому коду
- Создайте примеры использования

### 5. Pull Request
- Заполните шаблон PR
- Опишите изменения подробно
- Добавьте скриншоты если нужно

## 🔄 Commit Guidelines

### Формат коммитов:
```
тип(область): краткое описание

Подробное описание (опционально)

Fixes #123
```

### Типы коммитов:
- `feat:` новая функция
- `fix:` исправление ошибки
- `docs:` изменения в документации
- `style:` форматирование кода
- `refactor:` рефакторинг
- `test:` добавление тестов
- `chore:` обновление зависимостей

### Примеры:
```bash
git commit -m "feat(discord): add support for multiple webhooks"
git commit -m "fix(sheets): handle empty cells correctly"
git commit -m "docs(readme): update installation instructions"
```

## 🎯 Приоритетные области

### 🔥 Высокий приоритет
- Исправление критических ошибок
- Улучшения безопасности
- Производительность

### 📋 Средний приоритет
- Новые функции
- Улучшения UX
- Рефакторинг

### 📚 Низкий приоритет
- Документация
- Тесты
- Примеры

## 🏆 Система признания

### 📊 Статистика вкладов
- Автор PR'ов добавляется в Contributors
- Значимые вклады отмечаются в CHANGELOG
- Активные участники получают роли в Discord

### 🎖️ Типы участников
- **Contributor** - сделал хотя бы 1 PR
- **Regular Contributor** - 5+ PR'ов
- **Core Contributor** - 20+ PR'ов
- **Maintainer** - постоянный участник с правами

## ❓ Получение помощи

### 📞 Где спросить:
- **GitHub Issues** - вопросы по проекту
- **Discord** - быстрые вопросы и обсуждения
- **Email** - приватные вопросы

### 📚 Полезные ресурсы:
- [docs/INSTALLATION.md](docs/INSTALLATION.md) - установка
- [docs/SECURITY.md](docs/SECURITY.md) - безопасность
- [README.md](README.md) - общая информация

## 📄 Лицензия

Участвуя в проекте, вы соглашаетесь с тем, что ваши вклады будут лицензированы под MIT License.

---

**🎉 Спасибо за вклад в развитие GSDiscord!**
