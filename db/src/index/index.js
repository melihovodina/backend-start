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
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const post_1 = __importDefault(require("../post/post"));
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)({ path: './db/other/.env' }); //загрузка переменных окружения из файла .env
const PORT = process.env.PORT || 1; //наш порт
const DB = process.env.DB || ""; //ссылка бд
const app = (0, express_1.default)(); //экземпляр, к нему нужно все писать
app.use(express_1.default.json()); //добавление middleware для парсинга json в запросах
//определение обработчика POST-запросов на корневой маршрут
app.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { author, title, content, picture } = req.body; //извлечение данных из тела запроса
    const post = yield post_1.default.create({ author, title, content, picture }); //создание нового поста в бд
    res.json(post);
}));
//функция для запуска приложения
function startApp() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield mongoose_1.default.connect(DB); //подключение к бд
            app.listen(PORT, () => console.log("listening port 5000")); //запуск сервера
        }
        catch (e) {
            console.log(e); //вывод ошибок в консоль
        }
    });
}
startApp();