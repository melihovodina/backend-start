import Router from "express";
import postController from "../controller/postController/postController";

const router = Router(); //экземпляр, к нему нужно все писать

router.post('/posts', postController.create) //добавление документа, логика прописана в postController
router.get('/posts', postController.getAll) //получение всех документов
router.get('/posts/:id', postController.getOne) //получение конкретного документа
router.put('/posts', postController.update) //обновление документа
router.delete('/posts/:id', postController.delete) //удаление документа

export default router;