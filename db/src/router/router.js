"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const postController_1 = __importDefault(require("../controller/postController/postController"));
const router = (0, express_1.default)(); //экземпляр, к нему нужно все писать
router.post('/posts', postController_1.default.create); //добавление документа, логика прописана в postController
router.get('/posts', postController_1.default.getAll); //получение всех документов
router.get('/posts/:id', postController_1.default.getOne); //получение конкретного документа
router.put('/posts', postController_1.default.update); //обновление документа
router.delete('/posts/:id', postController_1.default.delete); //удаление документа
exports.default = router;
