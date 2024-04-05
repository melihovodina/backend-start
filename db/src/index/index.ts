import express from "express" // Импорт библиотеки Express
import mongoose from "mongoose" // Импорт библиотеки Mongoose для работы с MongoDB
import router from "../router/router" // Импорт роутера
import fileUpload from "express-fileupload" // Импорт библиотеки для загрузки файлов
import { config } from 'dotenv'; 
config({ path: './db/other/.env'}); // Загрузка переменных окружения из файла .env

const PORT = process.env.PORT || 1; // Наш порт
const DB = process.env.DB || ""; // Ссылка на базу данных
const app = express() // Экземпляр приложения Express

app.use(express.json()) // Добавление middleware для парсинга JSON в запросах
app.use(express.static('static')) // Добавление middleware для обслуживания статических файлов из директории 'static'
app.use(fileUpload({})) // Добавление middleware для загрузки файлов
app.use('/api', router); // Использование запросов, прописанных в роутере
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error(err.stack);
    res.status(500).send({ message: err.message });
}); // Функция обработки ошибок
  
// Функция для запуска приложения
async function startApp(){
    try {
        await mongoose.connect(DB) // Подключение к базе данных
        app.listen(PORT, () => console.log("listening port 5000")) // Запуск сервера
    } catch(error) {
        console.log(error) // Вывод ошибок в консоль
    }
}

startApp()
