const { response, put } = require('../app')
const Blog = require('../models/person')

const initialPersons = [
    {
        title: 'HTML is easy', 
        author: "J.An",
        likes: 12,
    },
    {
        title: "Browserr can execute only Javascript",
        author: "J.A",
        likes: 7,
    }
]

const nonExistingId = async () => {
    const blog = new Blog({ title: "willremovethissoon"})
    await blog.save()
    await blog.remove()
    return blog._id.toString()
}
const updateBlog = async (request, response) => {
    const blogs = await blogsInDb()

    return await Blog.findByIdAndUpdate(`${blogs[0].id}`, {likes: 30}, {new: true})
    
}

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
    
}
const blogsIdInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog._id)
}
module.exports = {
    initialPersons, nonExistingId, blogsInDb, blogsIdInDb, updateBlog//
}