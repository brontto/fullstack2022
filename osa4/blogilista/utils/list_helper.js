const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const reducer = (sum, item) => {
        return sum + item.likes
    }

    return blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
    return blogs.length === 0 ? 
        NaN : 
        blogs.reduce((max, blog) => max.likes > blog.likes ? max : blog)
}

const authors = (blogs) => {
    var authors = []
    blogs.forEach(blog => {
        if(authors.includes((item) => item.author === blog.author)){
            authors = authors.filter((item) => item.author !== blog.author).concat({
                author: item.author,
                blogs: item.blogs+1,
                likes: item.likes + blog.likes
            })
        }else{
            authors = authors.concat({
                author: blog.author,
                blogs: 1,
                likes: blog.likes
            })
        }
    });
    return authors
}

const mostBlogs = (blogs) => {
    return authors(blogs).reduce((max, author) => max.blogs > author.blogs ? max : author) 
}

const mostLikes = (blogs) => {
    return authors(blogs).reduce((max, author) => max.likes > author.likes ? max : author)
}
module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}

