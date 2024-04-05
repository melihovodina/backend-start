import Post from "../schemes/post/post" // Импорт модели Mongoose для постов
import fileService from "./fileService"; // Импорт сервиса для работы с файлами
import { UploadedFile } from 'express-fileupload'; // Импорт типа UploadedFile из библиотеки express-fileupload

// Определение интерфейса для поста
interface postInterface {
    _id?: string; // ID поста (необязательное поле)
    author: string; // Автор поста
    title: string; // Заголовок поста
    content: string; // Содержимое поста
    picture?: UploadedFile; // Изображение поста (необязательное поле)
}

class Service<T extends postInterface> {
    async create(post: T, picture: UploadedFile){ 
        const fileName = await fileService.saveFile(picture) // Сохранение файла изображения
        const createdPost = await Post.create({...post, picture: fileName}) // Создание нового поста в базе данных
        return createdPost // Возвращение созданного поста
    } // Метод для создания нового поста

    async getAll() { 
        const posts = await Post.find() // Получение всех постов из базы данных
        return posts // Возвращение всех постов
    } // Метод для получения всех постов

    async getOne(id: string){
        if(!id){ 
            throw new Error("Id is required") // Если ID отсутствует, выбрасывается ошибка
        } // Проверка наличия ID
        const post = await Post.findById(id) // Поиск поста по ID в базе данных
        return post // Возвращение найденного поста
    } // Метод для получения одного поста по ID

    async update(post: T) {
        if(!post._id) { 
            throw new Error("Id is required") // Если ID отсутствует, выбрасывается ошибка
        } // Проверка наличия ID поста
        const updatedPost = await Post.findByIdAndUpdate(post._id, post, {new: true}) // Обновление поста в базе данных
        return updatedPost; // Возвращение обновленного поста
    } // Метод для обновления поста

    async delete(id: string) {
        if (!id) { 
            throw new Error("Id is required") // Если ID отсутствует, выбрасывается ошибка
        } // Проверка наличия ID
        const post = await Post.findByIdAndDelete(id) // Удаление поста из базы данных
        return post // Возвращение удаленного поста
    } // Метод для удаления поста
}

export default new Service(); // Экспорт экземпляра класса Service