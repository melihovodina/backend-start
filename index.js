import express from "express"
import mongoose from "mongoose"
import Post from "./post.js";
import { config } from 'dotenv';
config(); //загрузка переменных окружения из файла .env

const PORT = process.env.PORT; //наш порт
const DB = process.env.DB; //ссылка бд
const app = express() //экземпляр, к нему нужно все писать

app.use(express.json()) //добавление middleware для парсинга json в запросах

//определение обработчика POST-запросов на корневой маршрут
app.post('/', async (req, res) => {
    const {author, title, content, picture} = req.body //извлечение данных из тела запроса
    const post = await Post.create({author, title, content, picture}) //создание нового поста в бд
    res.json(post)
})

//функция для запуска приложения
async function startApp(){
    try {
        await mongoose.connect(DB) //подключение к бд
        app.listen(PORT, () => console.log("listening port 5000")) //запуск сервера
    } catch(e) {
        console.log(e) //вывод ошибок в консоль
    }
}

startApp()
