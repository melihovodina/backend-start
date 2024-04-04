import express from "express"
import Post from "../post/post"

class PostController {
    async create(req: express.Request, res: express.Response) {
        try {
            const {author, title, content, picture} = req.body //извлечение данных из тела запроса
            const post = await Post.create({author, title, content, picture}) //создание нового поста в бд
            res.json(post)//отправляем созданный пост
        } catch (error) {
            res.status(500).json(error)//обработка ошибки
        }
    } //логика создания документа в бд

    async getAll(req: express.Request, res: express.Response) {
        try {
            const posts = await Post.find() //поск в ходе которого получем все посты
            return res.json(posts) //отправляем посты
        } catch (error) {
            res.status(500).json(error)
        }
    } //получение всех доков

    async getOne(req: express.Request, res: express.Response) {
        try {
            const {id} = req.params //вытаскиваем _id из запроса
            const post = await Post.findById(id) //ищем документ с таким _id
            if (!post) {
                return res.status(404).json({message: "Post not found"});
            } //при неанходе
            return res.json(post) //отправляем пост
        } catch (error) {
            res.status(500).json(error)
        }
    } //получение конкретного дока   

    async update(req: express.Request, res: express.Response) {
        try {
            const post = req.body //вытаскиваем параметры из запроса
            if(!post._id){
                res.status(404).json({message: "Id required"});
            } //если нет _id в запросе
            const updatedPost = await Post.findByIdAndUpdate(post._id, post, {new: true}) //находим нужный пост и обновляем его
            return res.json(updatedPost); //отправляем обновленный пост
        } catch (error) {
            res.status(500).json(error)
        }
    } //обновление по _id

    async delete(req: express.Request, res: express.Response) {
        try {
            const {id} = req.params 
            const post = await Post.findByIdAndDelete(id)
            if (!post) {
                return res.status(404).json({message: "Post not found"});
            }
            return res.json(post)
        } catch (error) {
            res.status(500).json(error)
        }
    } //удаление дока
}

export default new PostController();