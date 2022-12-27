
const dummy = (blogs) => {   
    const blogList = [
        { name: "FirstBlog"},
        { name: "SecondBlog"}
    ]
    blogList.map(names => names.name)
    return blogList.slice(0, 1).length
}

module.exports = {
    dummy
}
