<!-- PROJECT SHIELDS -->
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <h3 align="center">🤖 GSDiscord</h3>
  <p align="center">
    Современный бот для интеграции Google Sheets с Discord
    <br />
    <a href="docs/INSTALLATION.md"><strong>📖 Документация »</strong></a>
    <br />
    <br />
    <a href="docs/QUICKSTART.md">🚀 Быстрый старт</a>
    ·
    <a href="https://github.com/IZenApp/GSDiscord/issues">🐛 Сообщить об ошибке</a>
    ·
    <a href="https://github.com/IZenApp/GSDiscord/issues">✨ Предложить функцию</a>
  </p>
</div>

<!-- ABOUT THE PROJECT -->
## 🌟 О проекте

GSDiscord - это мощный и безопасный бот, который автоматически отслеживает изменения в ваших Google Sheets и отправляет красивые уведомления в Discord каналы. Проект создан с фокусом на безопасность, простоту использования и профессиональную архитектуру.

### ✨ Основные особенности:

* 🔄 **Автоматический мониторинг** Google Sheets в реальном времени
* 💬 **Красивые embed сообщения** в Discord с настраиваемым форматированием
* 🔐 **Максимальная безопасность** - защита от утечек данных
* 📝 **Продвинутое логирование** с записью в файлы
* ⚙️ **Гибкая конфигурация** через переменные окружения
* 🚀 **Простая установка** с автоматическими скриптами
* 📚 **Подробная документация** для всех уровней пользователей

### 🏗️ Построен с использованием:

* [![Node.js][Node.js]][Node-url]
* [![Google Sheets API][GoogleSheets.js]][GoogleSheets-url]
* [![Discord][Discord.js]][Discord-url]

<!-- GETTING STARTED -->
## 🚀 Быстрый старт

### Требования

* Node.js 14.x или выше
* npm
* Google Cloud Project с Google Sheets API
* Discord сервер с правами на создание webhook'ов

### Установка

1. Клонируйте репозиторий
   ```sh
   git clone https://github.com/IZenApp/GSDiscord.git
   cd GSDiscord
   ```

2. Установите зависимости
   ```sh
   npm install
   ```

3. Запустите настройку
   ```sh
   npm run setup
   ```

4. Следуйте инструкциям по настройке Google Cloud
   ```sh
   npm run google-setup
   ```

5. Добавьте учетные данные
   ```sh
   # Поместите ваш JSON файл в:
   credentials/google-credentials.json
   ```

6. Проверьте конфигурацию
   ```sh
   npm run validate
   ```

7. Запустите бота
   ```sh
   npm start
   ```

Подробные инструкции: [📖 docs/INSTALLATION.md](docs/INSTALLATION.md)

<!-- USAGE EXAMPLES -->
## 💡 Примеры использования

- 📊 **Мониторинг форм обратной связи** - получайте уведомления о новых отзывах
- 📋 **Отслеживание заявок** - автоматические уведомления о новых заявках
- 📈 **Отчеты по продажам** - мгновенные уведомления о новых сделках
- 🎯 **Системы голосования** - результаты опросов в реальном времени

_Больше примеров в [документации](docs/INSTALLATION.md)_

<!-- ROADMAP -->
## 🎯 Планы развития

- [ ] Поддержка множественных Google Sheets
- [ ] Веб-интерфейс для управления
- [ ] Интеграция с Telegram
- [ ] Система плагинов
- [ ] Docker контейнеризация
- [ ] Поддержка других мессенджеров

Полный список задач: [open issues](https://github.com/IZenApp/GSDiscord/issues)

<!-- CONTRIBUTING -->
## 🤝 Вклад в проект

Любые вклады **очень ценятся**! Если у вас есть предложения по улучшению проекта:

1. Fork проект
2. Создайте ветку (`git checkout -b feature/AmazingFeature`)
3. Commit изменения (`git commit -m 'Add some AmazingFeature'`)
4. Push в ветку (`git push origin feature/AmazingFeature`)
5. Откройте Pull Request

Подробнее: [CONTRIBUTING.md](CONTRIBUTING.md)

<!-- LICENSE -->
## 📄 Лицензия

Распространяется под MIT лицензией. См. `LICENSE` для дополнительной информации.

<!-- CONTACT -->
## 📞 Контакты

**IZenApp** - [@izenapp](https://twitter.com/izenapp) - support@izenapp.com

**Ссылка на проект:** [https://github.com/IZenApp/GSDiscord](https://github.com/IZenApp/GSDiscord)

<!-- ACKNOWLEDGMENTS -->
## 🙏 Благодарности

* [Google Sheets API](https://developers.google.com/sheets/api)
* [Discord API](https://discord.com/developers/docs/intro)
* [Node.js](https://nodejs.org/)
* [GitHub Pages](https://pages.github.com)

<!-- MARKDOWN LINKS & IMAGES -->
[contributors-shield]: https://img.shields.io/github/contributors/IZenApp/GSDiscord.svg?style=for-the-badge
[contributors-url]: https://github.com/IZenApp/GSDiscord/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/IZenApp/GSDiscord.svg?style=for-the-badge
[forks-url]: https://github.com/IZenApp/GSDiscord/network/members
[stars-shield]: https://img.shields.io/github/stars/IZenApp/GSDiscord.svg?style=for-the-badge
[stars-url]: https://github.com/IZenApp/GSDiscord/stargazers
[issues-shield]: https://img.shields.io/github/issues/IZenApp/GSDiscord.svg?style=for-the-badge
[issues-url]: https://github.com/IZenApp/GSDiscord/issues
[license-shield]: https://img.shields.io/github/license/IZenApp/GSDiscord.svg?style=for-the-badge
[license-url]: https://github.com/IZenApp/GSDiscord/blob/master/LICENSE
[Node.js]: https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white
[Node-url]: https://nodejs.org/
[GoogleSheets.js]: https://img.shields.io/badge/Google%20Sheets-34A853?style=for-the-badge&logo=google-sheets&logoColor=white
[GoogleSheets-url]: https://developers.google.com/sheets/api
[Discord.js]: https://img.shields.io/badge/Discord-7289DA?style=for-the-badge&logo=discord&logoColor=white
[Discord-url]: https://discord.com/developers/docs/intro
