const express = require("express");
const router = express.Router();
const got = require("got"); //подключение got - это аналог axios

const { query, validationResult } = require("express-validator"); // подключить валидатор обязательно для проверки и валидации данных

require("dotenv").config();

router.use(function timeLog(req, res, next) {
  //   console.log("Time: ", Date.now());
  //   console.log(process.env.WEATHER_API_KEY);
  next();
});

//  Добавляем middleware для валидации, для отлавливания ошибок. Вставляем код из документации express-validator
const validator = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
// GET method route. Добавляем middleware в [] - это проверка lat, lon на число, validator
router.get(
  "/",
  [query("lat").isNumeric(), query("lon").isNumeric(), validator],
  async (req, res, next) => {
    try {
      const { lat, lon } = req.query;

      const apiKey = process.env.WEATHER_API_KEY;

      const response = await got(
        "https://api.openweathermap.org/data/2.5/weather",
        {
          searchParams: {
            lat,
            lon,
            appid: apiKey,
          },
        }
      ); //URL, параметры запроса

      //   Обрабатываем ответ
      const { weather, name, wind } = JSON.parse(response.body);
      // console.log(weather, name, wind);

      res.json(weather, name, wind);
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
