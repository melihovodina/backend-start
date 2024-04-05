import Router from "express"; // Импорт Router из Express
import postController from "../controller/postController/postController"; // Импорт контроллера постов

const router = Router(); // Создание нового экземпляра роутера

// Определение маршрутов для различных HTTP-методов
router.post('/posts', postController.create) // Добавление нового поста
router.get('/posts', postController.getAll) // Получение всех постов
router.get('/posts/:id', postController.getOne) // Получение одного поста по ID
router.put('/posts', postController.update) // Обновление поста
router.delete('/posts/:id', postController.delete) // Удаление поста по ID

export default router; // Экспорт роутера
