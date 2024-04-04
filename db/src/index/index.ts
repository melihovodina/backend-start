import express from "express"
import mongoose from "mongoose"
import router from "../router/router";
import { config } from 'dotenv';
config({ path: './db/other/.env'}); //загрузка переменных окружения из файла .env

const PORT = process.env.PORT || 1; //наш порт
const DB = process.env.DB || ""; //ссылка бд
const app = express() //экземпляр, к нему нужно все писать

app.use(express.json()) //добавление middleware для парсинга json в запросах
app.use('/api', router); //использование запросов прописанных в router (можно использовать несколько)

//функция для запуска приложения
async function startApp(){
    try {
        await mongoose.connect(DB) //подключение к бд
        app.listen(PORT, () => console.log("listening port 5000")) //запуск сервера
    } catch(error) {
        console.log(error) //вывод ошибок в консоль
    }
}

startApp()