"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const service_1 = __importDefault(require("../../service/service"));
class PostController {
    create(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const post = yield service_1.default.create(req.body); //создание нового поста в бд
                res.json(post); //отправляем созданный пост
            }
            catch (error) {
                next(error); //обработка ошибки
            }
        });
    } //логика создания документа в бд
    getAll(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const posts = yield service_1.default.getAll(); //поск в ходе которого получем все посты
                return res.json(posts); //отправляем посты
            }
            catch (error) {
                next(error);
            }
        });
    } //получение всех доков
    getOne(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const post = yield service_1.default.getOne(req.params.id); //ищем документ с таким _id
                return res.json(post); //отправляем пост
            }
            catch (error) {
                next(error);
            }
        });
    } //получение конкретного дока   
    update(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updatedPost = yield service_1.default.update(req.body); //находим нужный пост и обновляем его
                return res.json(updatedPost); //отправляем обновленный пост
            }
            catch (error) {
                next(error);
            }
        });
    } //обновление по _id
    delete(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const post = yield service_1.default.delete(req.params.id);
                return res.json(post);
            }
            catch (error) {
                next(error);
            }
        });
    } //удаление дока
}
exports.default = new PostController();
