# Home Library Service

## HOME LIBRARY SERVICE 3 задание
чтобы скачать и корректно запустить приложение, следует последовательно выполнить следующие команды
``` 
git clone https://github.com/zgibex333/nodejs2022Q4-service.git 

cd nodejs2022Q4-service

git checkout auth-develop

создайте .env на основе .env-example

npm install

<!-- запустите базу данных в контейнере -->
docker-compose up 

<!-- так как в данном задании необязательно чтобы приложение тоже находилось в контейнере -->
<!-- откройте папку проекта в новом терминале и выполните миграцию и запуск приложения -->
npx prisma midrate dev --name inital-migration
npm run start:dev

<!-- чтобы запустить тесты, откройте папку проекта в новом терминале и запустите тесты -->
npm run test:auth
```

### !!!_Все что находится в ридми ниже - не нужно для проверки этого задания_!!!

## Чтобы запустить сервер используются следующие команды
```
git clone https://github.com/zgibex333/nodejs2022Q4-service.git 

cd nodejs2022Q4-service 

git checkout development

npm install

npm run start:dev - запуск в live режиме
npm run start - запуск в обычном режиме 
```
## ENV VARIABLE
Чтобы ENV переменные работали, создайте файл в корне .env и перенесите в него данные из .env.example. Тогда порт для запуска сервера будет взят из .env файла

## Тесты 
Тесты следует запускать, когда сервер работает, т.е. в новом терминале, не закрывая тот в котором запущен сервер
```
npm run test - запускает тесты
```

## Документация и работа сервера
Swagger документация будет доступна при запущенном сервере по адресу `http://localhost:${PORT}/api`
Там же можно отправлять запросы, получать ответы и таким образом тестить задание

Также, в папке doc находится файл `newApi.yaml` со схемой для swagger. Если хотите тестить в каком-нибудь swagger editor, тогда нужно на `642` строке убедиться, что `http://localhost:${PORT}/` корректный (если вдруг меняли переменную в .env)<br>
![screenshot](https://i.ibb.co/Hxqy2dh/swagger.png)<br>
Поэтому чтобы не заморчиваться, просто используйте `http://localhost:${PORT}/api` в браузере, и все будет работать!

Далее дока от RS School
## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading

```
git clone {repository URL}
```

## Installing NPM modules

```
npm install
```

## Running application

```
npm start
```

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc/.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm run test
```

To run only one of all test suites

```
npm run test -- <path to suite>
```

To run all test with authorization

```
npm run test:auth
```

To run only specific test suite with authorization

```
npm run test:auth -- <path to suite>
```

### Auto-fix and format

```
npm run lint
```

```
npm run format
```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging
