// запуск сервера нужно выделять в отдельный модуль, т.к. легче тестировать; и при подключении каких-либо сервисов, к примеру, баз данных, перед запуском основного рпиложения. Без базы данных запускать приложение становиться бессмысленным
const app = require("../app"); //export файла app.js

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
