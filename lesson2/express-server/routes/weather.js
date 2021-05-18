// Занятие №3. Создание виджета погоды

const express = require("express");
const router = express.Router();
require("dotenv").config(); //dotenv - модуль, который  загружает переменные среды из файла .env, который нужно добавить в gitignore
const got = require("got"); //альтернатива axios, не менее популярный пакек

/* GET users listing. */
//это запрос асинхронный
router.get("/", async (req, res, next) => {
  //через query-параметр будем добалять: широту и долготу req.query - то, что приходит через query-параметр
  const { lat, lon } = req.query;

  try {
    // Асинхронная функции всегда возвращает разresolve promise. Пример - если return 123 - под капотом это  Promise.resolve(123)
    const response = await got(
      "http://api.openweathermap.org/data/2.5/weather",
      {
        searchParams: {
          lat, //широта
          lon, //долгота
          appid: process.env.API_KEY, //appid - из докуметации, это ключ для активации
        },
      }
    ); //1 параметр - это всегда URL; 2-й  - объект с searchParams параметрами

    // response вернулся, распарсиваем, и достаем необходимые данные
    const { data } = JSON.parse(response.body);
  } catch (e) {
    // пробрасываем ошибку дальше. next - это проброс, и чтобы выполнился обработчик ошибок  next(createError);
    next(e);
  }
});

module.exports = router;
