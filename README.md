# Discord Бот для Google Sheets

## Описание
Этот проект представляет собой бота, который интегрируется с Google Sheets и Discord. Бот позволяет получать данные из Google Sheets и отправлять их в Discord.

## Требования
- Node.js (рекомендуется версия 14.x и выше)
- npm (Node Package Manager)

## Установка Node.js и npm
1. **Linux (Ubuntu/Debian):**
    - Откройте терминал и выполните следующие команды:
    ```sh
    sudo apt update
    sudo apt install nodejs npm
    ```
    - Проверьте успешную установку:
    ```sh
    node -v
    npm -v
    ```

2. **macOS:**
    - Установите [Homebrew](https://brew.sh/), если он не установлен:
    ```sh
    /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
    ```
    - Установите Node.js и npm:
    ```sh
    brew install node
    ```
    - Проверьте успешную установку:
    ```sh
    node -v
    npm -v
    ```

3. **Windows:**
    - Скачайте и установите Node.js с официального сайта: [https://nodejs.org](https://nodejs.org).
    - Во время установки убедитесь, что npm также установлен (он входит в состав Node.js).
    - Проверьте успешную установку, открыв командную строку (cmd) и выполнив команды:
    ```sh
    node -v
    npm -v
    ```

## Установка
1. Клонируйте репозиторий:
    ```sh
    git clone https://github.com/IZenApp/GSDiscord.bot.git
    ```
2. Перейдите в директорию проекта:
    ```sh
    cd your-repo
    ```
3. Установите зависимости:
    ```sh
    npm install
    ```

## Установка библиотек
В проекте используются следующие библиотеки:
- **googleapis**: предоставляет доступ к API Google.
- **google-auth-library**: используется для аутентификации с Google API.
- **node-fetch**: для отправки HTTP-запросов.
- **fs** и **path**: встроенные модули Node.js для работы с файловой системой и путями.

Чтобы установить их, выполните команду:
```sh
npm install googleapis google-auth-library node-fetch
```    

## Конфигурация
1. **Google Sheets API**:
    - Создайте проект в [Google Cloud Console](https://console.cloud.google.com/).
    - Включите Google Sheets API.
    - Создайте учетные данные и скачайте JSON файл.
    - Поместите JSON файл в директорию и назовите его `discordbot.json`.

2. **Discord Webhook**:
    - Создайте вебхук в вашем Discord сервере.
    - Замените `discordWebhookUrl` в `GSDiscord.js`.

## Использование
1. Запустите бота:
    ```sh
    node GSDiscord.js
    ```
2. Бот автоматически начнет опрашивать Google Sheets и отправлять данные в Discord.
