## К ревью
- Поправил обработку ошибок в request queue
- Убрал лишние async'и
- По поводу не оборачивания await'ов в try catch в контроллерах.
  Как раз таки делал это намеренно, для чистоты кода. Во всех контроллерах, где используется await,
  обработка reject'а происходит на уровне ниже, в api. В общем, целью было - сделать код более "плоским".
  Так же, как и во многих api, где находится упомянутая обработка, отказался от использования try catch в пользу
  обычной работы с промисами (если бы были какие-то случаи со сложной логикой / обработкой результатов - там возможно
  использовал бы try catch, если бы с ним код получался попроще для восприятия).
  
- Ещё добавил продакшн сборку
- И планирую подключить api чатов

## Netlify
[![Netlify Status](https://api.netlify.com/api/v1/badges/75dacb4d-dd75-4b6a-8964-a303ca3b8035/deploy-status)](https://app.netlify.com/sites/susam-ya-messenger/deploys)

https://susam-ya-messenger.netlify.app/

## Heroku
https://susam-ya-messenger.herokuapp.com/

## Установка
`npm install`

## Запуск
- `npm start` — запуск локального сервера,

сервер запустится на порту 4000

http://localhost:4000

## Сборка
- `npm build` — результат сборки - директория /static 


## Макеты
https://www.figma.com/file/Dh9jt0lumRSAkBrvIhAPcs/YaMessenger?node-id=6%3A2
