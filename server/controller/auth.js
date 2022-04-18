const router = require('express').Router()
var jwt = require('jsonwebtoken');
const { postViewModel, userViewModel } = require('../mapper');
const mongoose = require('mongoose')
const { register, login, createPost, getPostById, getUserById, getUserByUsername, addComment, editUser } = require('../services/userServices');

router.post('/register', async (req, res) => { 
    try {const user = await register(req.body.email, req.body.username, req.body.password)
    var token = jwt.sign(JSON.stringify(user), 'test123')
    return res.status(200).send({token})
    }
    catch (err){ 
        console.log(err)
    }
})

router.post('/login', async (req, res) => { 
    try{
        const user = await login(req.body.email, req.body.password)
        var token = jwt.sign(JSON.stringify(user), 'test123')
        return res.status(200).send({token})
    }
    catch (err){
        console.log(err)
        return res.json({message: err})
    }
})

router.post('/create', async (req, res) => {
    try {
        const token = req.body.token
        const payload = jwt.verify(token, 'test123')
        const creatorUsername = payload.username
        const creatorId = payload._id
        const data = req.body.data
        console.log(req.body)
        await createPost(data.title, data.imgUrl, creatorUsername, creatorId)
        return res.status(200).json({message: "Post Created"})
    }
    catch (err) { 
        console.log(err)
    }
})

router.get('/details/:id', async (req, res) => { 
    try{
        console.log(req.params)
    const id = req.params.id
    
    const post = postViewModel(await getPostById(id))
    
    for(let comment of post.comments){
       const user = userViewModel(await getUserById(comment[0]))
       comment.push(user.username)
       comment.push(user.pfp)
    }
    
    const user = userViewModel(await getUserById(post.authorId))
    user.hasLiked = false
    if (post.likes.includes(user._id)){user.hasLiked = true}
    res.json({post, user})
    }
    catch (err){
        console.log(err)
    }
})

router.get('/profile/:username', async (req, res) => { 
    try{
        const username = req.params.username
        const user = userViewModel(await getUserByUsername(username))
        const posts = []
        
        for (let id of user.posts){
            posts.push(postViewModel(await getPostById(id.toString())))
        }
        
        
        res.json({user, posts})
    }
    catch (err){
        console.log(err)
    }
})

router.post('/follow', async (req, res) => { 
    try{
        const token = req.body.token
    const payload = jwt.verify(token, 'test123')
    const user = await getUserById(payload._id)
    if (payload._id == req.body.id) { 
        throw new Error ('cannot follow yourself!')
    }
    user.following.push(req.body.id)
    await user.save()
    res.json({message: "successfull following!"})

    }
    catch (err){
        console.log(err)
    }

})

router.post('/home', async (req, res) => { 
    try{
    const token = req.body.token
    console.log(req.body)
    const payload = jwt.verify(token, 'test123')
    const user = await getUserById(payload._id)
    const following = user.following
    console.log(user.following)
    let result = []
    for (let usr of following){
        const userr = userViewModel(await getUserById(usr.toString()))
        console.log(userr)
        const posts = userr.posts
        console.log(posts)
        for (let post of posts){
            const obj = postViewModel(await getPostById(post.toString()))
            obj.pfp = userr.pfp
            result.push(obj)
        }
        
    }
    result.sort((a, b) => { 
        return b.number - a.number
    })
    
    
    
    res.json(result)
    }
    catch (err) {
        console.log(err)
    }
})

router.post('/comment', async (req, res) => {
    try{
        const token = req.body.token
    console.log(req.body)
    const payload = jwt.verify(token, 'test123')
    
    const comment = [payload._id, req.body.comment]
    await addComment(comment, req.body.postId)
    res.send({message: "comment added"})
    }
    catch (err){
        console.log(err)
    }
})

router.post('/checkOwnership', async (req, res) => { 
    try{
        const token = req.body.token
    console.log(req.body)
    const payload = jwt.verify(token, 'test123')
    res.json(payload.username == req.body.username)
    }
    catch (err) { 
        console.log(err)
    }
})

router.post('/editProfile', async (req, res) => { 
    try{ const token = req.body.token
    console.log(req.body)
    const payload = jwt.verify(token, 'test123')
    res.json(payload)
    }
    catch (err){ 
        console.log(err)
    }
})

router.post('/editProfileInfo', async (req, res) => { 
    try {
        const token = req.body.token
        console.log(req.body)
        const payload = jwt.verify(token, 'test123')
        const data = req.body
        data.id = payload._id
        await editUser(data)
        res.send({message: "user edited!"})

    }
    catch (err) { 
        console.log(err)
    }
})

router.post('/submitLike', async (req, res) => { 
    try{
        const token = req.body.token
        console.log(req.body)
        const payload = jwt.verify(token, 'test123')
        const post = await getPostById(req.body.id)
        if (post.likes.includes(payload._id) == false){post.likes.push(payload._id)}
        await post.save()
        const author = await getUserById(post.authorId)
        author.receivedLikes.unshift({user: payload._id, postId: req.body.id})
        author.save()
        res.send({message: "liked successfully"})
    }
    catch (err){
        console.log(err)
    }
})

router.post('/removeLike', async (req, res) => { 
    try{
        const token = req.body.token
        
        const payload = jwt.verify(token, 'test123')
        const post = await getPostById(req.body.id)
        const index = post.likes.indexOf(req.body.id)
        console.log(index)
        post.likes.splice(index, 1)
        await post.save()
        const author = await getUserById(post.authorId)
        author.receivedLikes.unshift({user: payload._id, postId: req.body.id})
        res.send({message: "disliked successfully"})
    }
    catch (err){
        console.log(err)
    }
})

router.get('/likes', async (req, res) => { 
    try{
        console.log('daaa')
        console.log(req.headers)
        res.send({message: "disliked successfully"})
    }
    catch (err) {
        console.log(err)
    }
})




module.exports = (app) => {
    app.use(router)
}