const User = require('../models/User')
const {hash, compare} = require('bcrypt')
const Post = require('../models/Post')

async function register(email, username, password){ 
    const existing = await getUserByEmail(email, username)
    if (existing){
        throw new Error('Username is taken')
    }
    const hashedPassword = await hash(password, 10)
    const user = new User({
        email: email,
        hashedPassword: hashedPassword,
        username: username,
        posts: [],
        verified: false,
        following: [],
        pfp: "https://thebenclark.files.wordpress.com/2014/03/facebook-default-no-profile-pic.jpg"
    })
    await user.save()
    return user;
}

async function login(email, password){
    const user = await getUserByEmail(email)
    if (!user){
        throw new Error('user doesnt exist')
    }
    
    const hasMatch = await compare(password.trim(), user.hashedPassword.trim())
    if (hasMatch == false){
        throw new Error('Password incorrect')
    }

    return user
}

async function createPost(title, imgUrl, username, id){
    const number = (await Post.find({})).length
    const post = new Post({
        title,
        imgUrl,
        author: username,
        authorId: id,
        comments: [[]],
        number: number
    })
    await post.save()
    const user = await getUserById(id)
    
    user.posts.push(post.id)
    await user.save()
    return post;
}



async function getUserByEmail(email, username){
    var user = await User.findOne({email: new RegExp(`^${email}$`, 'i')})
    /* if (!user) {
        user = await User.findOne({username: new RegExp(`^${username}$`, 'i')})
    } */ 
    return user
}

async function getPostById(id){
    const result=await Post.findById(id)
    return result
}

async function getUserById(id){
    const result=await User.findById(id)
    return result
}

async function getUserByUsername(username){
    var user = await User.findOne({username: new RegExp(`^${username}$`, 'i')})
    
    return user
}

async function getPostsByManyIds(ids){
    const posts = await User.find({authorId: ids.include(authorId)})
    return posts
}

async function addComment(comment, postId){ 
    const post = await getPostById(postId)
    post.comments.push(comment)
    await post.save()
}

async function editUser(data){
    const user = await getUserById(data.id)
    user.pfp = data.pfp
    user.username = data.username
    await user.save()
}



module.exports = {
    register, 
    login,
    createPost,
    getPostById,
    getUserById,
    getUserByUsername,
    getPostsByManyIds,
    addComment,
    editUser
}