import Post from "../schemes/post/post"

interface postInterface {
    _id?: string;
    author: string;
    title: string;
    content: string;
    picture?: string;
}

class Service<T extends postInterface> {
    async create(post: T){
        const createdPost = await Post.create(post) //создаем пост
        return createdPost
    } //созданиe документа в бд

    async getAll() {
        const posts = await Post.find() //поск в ходе которого получем все посты
        return posts
    } //получение всех доков

    async getOne(id: string){
        if(!id){
            throw new Error("Id is required")
        } //при ненаходе
        const post = await Post.findById(id) //ищем документ с таким _id
        return post
    } //получение конкретного дока   

    async update(post: T) {
        if(!post._id) {
            throw new Error("Id is required")        
        } //если нет _id в запросе
        const updatedPost = await Post.findByIdAndUpdate(post._id, post, {new: true}) //находим нужный пост и обновляем его
        return updatedPost;
    } //обновление по _id

    async delete(id: string) { 
        if (!id) {
            throw new Error("Id is required")
        }
        const post = await Post.findByIdAndDelete(id) //находим нужный пост и удаляем его
        return post
    } //удаление дока
}

export default new Service();