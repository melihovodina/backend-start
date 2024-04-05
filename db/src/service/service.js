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
const post_1 = __importDefault(require("../schemes/post/post"));
class Service {
    create(post) {
        return __awaiter(this, void 0, void 0, function* () {
            const createdPost = yield post_1.default.create(post); //создаем пост
            return createdPost;
        });
    } //созданиe документа в бд
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const posts = yield post_1.default.find(); //поск в ходе которого получем все посты
            return posts;
        });
    } //получение всех доков
    getOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!id) {
                throw new Error("Id is required");
            } //при ненаходе
            const post = yield post_1.default.findById(id); //ищем документ с таким _id
            return post;
        });
    } //получение конкретного дока   
    update(post) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!post._id) {
                throw new Error("Id is required");
            } //если нет _id в запросе
            const updatedPost = yield post_1.default.findByIdAndUpdate(post._id, post, { new: true }); //находим нужный пост и обновляем его
            return updatedPost;
        });
    } //обновление по _id
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!id) {
                throw new Error("Id is required");
            }
            const post = yield post_1.default.findByIdAndDelete(id); //находим нужный пост и удаляем его
            return post;
        });
    } //удаление дока
}
exports.default = new Service();
