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
    //console.log(favorites.find(o => o.likes === Math.max(...favorites.map(o => o.likes))))
    return favorites.find(o => o.likes === Math.max(...favorites.map(o => o.likes)))
}
const mostBlogs = (most) => {
    console.log(most.find(m => m.blogs === Math.max(...most.map(m => m.blogs))))
    const auth = most.find(m => m.blogs === Math.max(...most.map(m => m.blogs)))
    //const blogs = most.find(m => m.blogs === Math.max(...most.map(m => m.blogs)))
    console.log(auth.author + " who has " + auth.blogs + " blogs.")
    return most.find(m => m.blogs === Math.max(...most.map(m => m.blogs)))
}

//Testing with arrays inside an array.
const justTesting = (test) => {
    
    //const first = test[0][0].blogs
    const firstNest = test[0].map(m => m.blogs)
    const firstNestFind = Math.max(...firstNest)
    const secondNest = test[1][0].blogs
    console.log(firstNest)
    console.log(firstNestFind)
    //console.log(first)
    if (firstNestFind > secondNest) {
        return firstNestFind
    } else {
        return secondNest
    }
    // return test[0].find(m => m.blogs === Math.max(...test[0].map(m => m.blogs)))
}
module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    justTesting
}
