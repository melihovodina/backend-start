import uuid from "uuid"; // Импорт библиотеки uuid для генерации уникальных идентификаторов
import path from "path"; // Импорт модуля path для работы с путями файлов
import { UploadedFile } from "express-fileupload"; // Импорт типа UploadedFile из библиотеки express-fileupload

class fileService {
    async saveFile(file: UploadedFile){ 
        try {
            const fileName = uuid.v4() + '.jpg'; // Генерация уникального имени файла
            const filePath = path.resolve('static', fileName); // Создание полного пути к файлу
            file.mv(filePath); // Перемещение файла в указанный путь
            return fileName // Возвращение имени файла
        } catch (error) {
            console.error(error); // Вывод ошибки в консоль
            throw error; // Выброс ошибки
        }
    } // Метод для сохранения загруженного файла
}

export default new fileService() // Экспорт экземпляра класса Service