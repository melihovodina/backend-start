import express from "express"
import service from "../../service/service"

class PostController {
    async create(req: express.Request, res: express.Response, next: express.NextFunction){
        try {
            const post = await service.create(req.body) //создание нового поста в бд
            res.json(post)//отправляем созданный пост
        } catch (error) {
            next(error)//обработка ошибки
        }
    } //логика создания документа в бд

    async getAll(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            const posts = await service.getAll() //поск в ходе которого получем все посты
            return res.json(posts) //отправляем посты
        } catch (error) {
            next(error)
        }
    } //получение всех доков

    async getOne(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            const post = await service.getOne(req.params.id) //ищем документ с таким _id
            return res.json(post) //отправляем пост
        } catch (error) {
            next(error)
        }
    } //получение конкретного дока   

    async update(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            const updatedPost = await service.update(req.body) //находим нужный пост и обновляем его
            return res.json(updatedPost); //отправляем обновленный пост
        } catch (error) {
            next(error)
        }
    } //обновление по _id

    async delete(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            const post = await service.delete(req.params.id)
            return res.json(post)
        } catch (error) {
            next(error)
        }
    } //удаление дока
}

export default new PostController();