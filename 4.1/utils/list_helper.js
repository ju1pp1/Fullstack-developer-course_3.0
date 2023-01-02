const dummy = (blogs) => {   
    blogs = [2]

    blogs.map(names => names.name)
    return blogs.slice(0, 1).length
}
const totalLikes = (likesSum) => {

    const sum = likesSum.reduce((sum, item) => sum + item.likes, 0)
    //console.log(sum)
    
    return sum
}
const favoriteBlog = (favorites) => {
    //const favorite = favorites.map((lol) => lol.likes)
    //console.log(Math.max(...favorites.map(o => o.likes)))
    console.log(favorites.find(o => o.likes === Math.max(...favorites.map(o => o.likes))))
    return favorites.find(o => o.likes === Math.max(...favorites.map(o => o.likes)))
}
module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}
