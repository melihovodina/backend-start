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
const post_1 = __importDefault(require("../post/post"));
class PostController {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { author, title, content, picture } = req.body; //извлечение данных из тела запроса
                const post = yield post_1.default.create({ author, title, content, picture }); //создание нового поста в бд
                res.json(post); //отправляем созданный пост
            }
            catch (error) {
                res.status(500).json(error); //обработка ошибки
            }
        });
    } //логика создания документа в бд
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const posts = yield post_1.default.find();
                return res.json(posts);
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const post = yield post_1.default.findById(id);
                return res.json(post);
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const post = req.body;
                if (!post._id) {
                    res.status(404).json({ message: "Id required" });
                }
                const updatedPost = yield post_1.default.findByIdAndUpdate(post._id, post, { new: true });
                return res.json(updatedPost);
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                if (!id) {
                    res.status(400).json({ message: "Id is required" });
                }
                const post = yield post_1.default.findByIdAndDelete(id);
                return res.json(post);
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
    }
}
exports.default = new PostController();
