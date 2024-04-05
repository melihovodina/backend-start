import express from "express" // Импорт библиотеки Express для создания и управления HTTP-сервером
import service from "../../service/service" // Импорт сервиса, который обрабатывает бизнес-логику приложения
import { UploadedFile } from "express-fileupload"; // Импорт типа UploadedFile для работы с загруженными файлами

class PostController {
    async create(req: express.Request, res: express.Response, next: express.NextFunction){ 
        try {
            if (!req.files || !req.files.picture) { 
                throw new Error("Picture file is missing");
            } // Проверка наличия файла изображения в запросе
            const post = await service.create(req.body, req.files.picture as UploadedFile) // Создание нового поста в базе данных
            res.json(post) // Отправка созданного поста в ответе
        } catch (error) {
            next(error) // Обработка ошибок
        }
    } // Метод для создания нового поста

    async getAll(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            const posts = await service.getAll() // Получение всех постов из базы данных
            return res.json(posts) // Отправка всех постов в ответе
        } catch (error) {
            next(error) // Обработка ошибок
        }
    }  // Метод для получения всех постов

    async getOne(req: express.Request, res: express.Response, next: express.NextFunction) { 
        try {
            const post = await service.getOne(req.params.id) // Получение поста по ID из базы данных
            return res.json(post) // Отправка поста в ответе
        } catch (error) {
            next(error) // Обработка ошибок
        }
    } // Метод для получения одного поста по ID

    async update(req: express.Request, res: express.Response, next: express.NextFunction) { 
        try {
            const updatedPost = await service.update(req.body) // Обновление поста в базе данных
            return res.json(updatedPost); // Отправка обновленного поста в ответе
        } catch (error) {
            next(error) // Обработка ошибок
        }
    } // Метод для обновления поста

    async delete(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            const post = await service.delete(req.params.id) // Удаление поста из базы данных
            return res.json(post) // Отправка удаленного поста в ответе
        } catch (error) {
            next(error) // Обработка ошибок
        }
    }  // Метод для удаления поста
}

export default new PostController(); // Экспорт экземпляра класса PostController
