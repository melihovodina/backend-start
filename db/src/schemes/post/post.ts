import mongoose from "mongoose"; // Импорт библиотеки Mongoose для работы с MongoDB

// Определение схемы Mongoose для коллекции Post
const Post = new mongoose.Schema({
    author: {type: String, required: true}, // Поле 'author' типа String, обязательное
    title: {type: String, required: true}, // Поле 'title' типа String, обязательное
    content: {type: String, required: true}, // Поле 'content' типа String, обязательное
    picture: {type: String} // Поле 'picture' типа String, необязательное
})

// Экспорт модели Mongoose 'Post', используя схему Post и связывая её с коллекцией 'test' в MongoDB
export default mongoose.model('Post', Post, 'test')