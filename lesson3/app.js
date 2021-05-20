const express = require("express"); //подключение приложения express
const app = express(); //создание приложения express

app.use((req, res, next) => {
  next();
});

app.use("/", require("./routes/api/weather"));

// обработка ошибок, если не найден ни один роутер. Создаем промежуточное ПО
app.use((_req, res, _next) => {
  res.status(404).json({ message: "Not found" });
});

// обработка ошибок. Cо знаком _ - это обозначает, что эти пораметры нужны, но не используются
app.use((err, _req, res, _next) => {
  res.status(500).json({ message: err.message });
});

// подключение промежуточного ПО из router.js
app.use("/", require("./routes/api/weather"));

module.exports = app;
