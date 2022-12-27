const dummy = (blogs) => {   
    blogs = [2]

    blogs.map(names => names.name)
    return blogs.slice(0, 1).length
}
const totalLikes = (likesSum) => {

    const sum = likesSum.reduce((sum, item) => sum + item.likes, 0)
    console.log(sum)
    
    return sum
}
module.exports = {
    dummy,
    totalLikes
}
