const Blog = require('../models/person')

const initialPersons = [
    {
        title: 'HTML is easy', 
        author: "J.An" 
    },
    {
        title: "Browserr can execute only Javascript",
        author: "J.A"
    }
]

const nonExistingId = async () => {
    const blog = new Blog({ title: "willremovethissoon"})
    await blog.save()
    await blog.remove()
    return blog._id.toString()
}

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}
module.exports = {
    initialPersons, nonExistingId, blogsInDb //
}