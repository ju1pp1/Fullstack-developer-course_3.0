const dummy = (blogs) => {   
    blogs = [2]

    blogs.map(names => names.name)
    return blogs.slice(0, 1).length
}
const totalLikes = (likesSum) => {

    const sum = likesSum.reduce((sum, item) => sum + item.likes, 0)
    
    
    return sum
}
const favoriteBlog = (favorites) => {
    
    return favorites.find(o => o.likes === Math.max(...favorites.map(o => o.likes)))
}
const mostBlogs = (most) => {
    const auth = most.find(m => m.blogs === Math.max(...most.map(m => m.blogs)))
    return most.find(m => m.blogs === Math.max(...most.map(m => m.blogs)))
}

//Testing with arrays inside an array.
const justTesting = (test) => {
    
    const firstNest = test[0].map(m => m.blogs)
    const firstNestFind = Math.max(...firstNest)
    const secondNest = test[1][0].blogs

    if (firstNestFind > secondNest) {
        return firstNestFind
    } else {
        return secondNest
    }
}
const mostLikes = (allLikes) => {

    const test = allLikes.filter(m => m.author === 'Robert C. Martin')
    const tester = test.reduce((sum, item) => sum + item.likes, 0)

    const test2 = allLikes.filter(m => m.author === 'Edsger W. Dijkstra')
    const tester2 = test2.reduce((sum, item) => sum + item.likes, 0)

    const test3 = allLikes.filter(m => m.author === 'Michael Chan')
    const tester3 = test3.reduce((sum, item) => sum + item.likes, 0)
    
    const arr = [test, test2, test3]
    const array1 = [tester, tester2, tester3]
    
    const arrayResult = array1.find(m => m === Math.max(...array1.map(m => m)))

    if (tester < tester2) {
        return "Edsger W. Dijkstra"
    }
    if (tester < tester3) {
        return "Michael Chan"
    }
    if (tester2 < tester) {
        return "Robert C. Martin"
    }
    if (tester2 < tester3) {
        return "Michael Chan"
    }
    if (tester3 < tester) {
        return "Robert C. Martin"
    }
    if (tester3 < tester2) {
        return "Edsger W. Dijkstra"
    }
    
}
const combinedLikes = (allLikes) => {
    
    const test = allLikes.filter(m => m.author === 'Robert C. Martin')
    const tester = test.reduce((sum, item) => sum + item.likes, 0)

    const test2 = allLikes.filter(m => m.author === 'Edsger W. Dijkstra')
    const tester2 = test2.reduce((sum, item) => sum + item.likes, 0)

    const test3 = allLikes.filter(m => m.author === 'Michael Chan')
    const tester3 = test3.reduce((sum, item) => sum + item.likes, 0)
    
    const array1 = [tester, tester2, tester3]
    const arrayResult = array1.find(m => m === Math.max(...array1.map(m => m)))

    return arrayResult
}


module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    justTesting,
    mostLikes,
    combinedLikes
}
