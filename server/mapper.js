function postViewModel(post) {
    return {
        _id: post.id,
        title: post.title,
        imgUrl: post.imgUrl,
        comments: post.comments,
        author: post.author,
        number: post.number,
        authorId: post.authorId,
        likes: post.likes
    }

}

function userViewModel(user) {
    return {
        _id: user.id,
        username: user.username,
        pfp: user.pfp,
        verified: user.verified,
        posts: user.posts,
        following: user.following
        
    }

}


module.exports = {
    postViewModel,
    userViewModel
}