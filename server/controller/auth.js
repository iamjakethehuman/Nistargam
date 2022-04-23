const router = require('express').Router()
var jwt = require('jsonwebtoken');
const { postViewModel, userViewModel } = require('../mapper');
const mongoose = require('mongoose')
const { register, login, createPost, getPostById, getUserById, getUserByUsername, addComment, editUser } = require('../services/userServices');
const multer = require('multer')

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
        
        cb(null, Date.now() + file.originalname)
    }
})

const upload = multer({storage: storage})

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
        return res.json({message: 'login failed'})
    }
})

router.post('/create', upload.single('img'), async (req, res) => {
    try {
        
        const token = req.body.token
        const payload = jwt.verify(token, 'test123')
        const creatorUsername = payload.username
        const creatorId = payload._id
        const data = req.body
        
        await createPost(data.title, req.file.path, creatorUsername, creatorId)
        return res.status(200).json({message: "Post Created"})
    }
    catch (err) { 
        console.log(err)
    }
})

router.post('/details/:id', async (req, res) => { 
    try{
        console.log(req.params)
    const id = req.params.id
    const token = req.body.token
        const payload = jwt.verify(token, 'test123')
    const post = postViewModel(await getPostById(id))
    if (post.comments)
    for(let comment of post.comments){
       const user = userViewModel(await getUserById(comment[0]))
       comment.push(user.username)
       comment.push(user.pfp)
    }
    
    const user = userViewModel(await getUserById(post.authorId))
    const user2 = userViewModel(await getUserById(payload._id))
    user2.hasLiked = false
    if (post.likes.includes(user2._id)){user2.hasLiked = true}
    res.json({post, user, user2})
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
    const user2 = await getUserById(req.body.id)
    if (payload._id == req.body.id) { 
        throw new Error ('cannot follow yourself!')
    }
    if (!user.following.includes(req.body.id)){user.following.push(req.body.id)}
    if (!user2.followers.includes(payload._id)){user2.followers.push(payload._id)}
    await user2.save()
    await user.save()
    res.json({message: "successfull following!"})

    }
    catch (err){
        console.log(err)
    }

})

router.post('/unfollow', async (req, res) => { 
    try{
        const token = req.body.token
    const payload = jwt.verify(token, 'test123')
    const user = await getUserById(payload._id)
    const user2 = await getUserById(req.body.id)
    if (payload._id == req.body.id) { 
        throw new Error ('cannot follow yourself!')
    }
    if (user.following.includes(req.body.id)){user.following.splice(user.following.indexOf(req.body.id), 1)}
    if (user2.followers.includes(payload._id)){user2.followers.splice(user2.followers.indexOf(payload._id),1)}
    await user2.save()
    await user.save()
    res.json({message: "successfull un  following!"})

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
            obj.userHasLiked = false
            if (obj.likes.includes(payload._id)){obj.hasLiked = true;}
            result.push(obj)
        }
        
    }
    result.sort((a, b) => { 
        
        return b.creationDate - a.creationDate
    })
    for (let i = 0; i < result.length; i++){
        result[i].number = [i]
    }
    
    
    
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
    let ownership = false
    let following = false
    const profileUser =userViewModel( await getUserByUsername(req.body.username))
    const user2 = payload._id
    console.log(user2)
    console.log(profileUser)
    if (payload.username == req.body.username) {ownership = true;}
    if (profileUser.followers.includes(user2)) {following = true;}
    res.json({ownership, following})
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

router.post('/likes', async (req, res) => { 
    try{
        const token = req.body.token
        console.log(req.body)
        const payload = jwt.verify(token, 'test123')
        const user = userViewModel(await getUserById(payload._id))
        const likes = user.receivedLikes
        const result = []
        for (let like of likes){
            let username = userViewModel(await getUserById(like.user)).username
            let post = postViewModel(await getPostById(like.postId))
            result.push({username, post})
        }
        res.json(result)
    }
    catch (err) {
        console.log(err)
    }
})

router.post('/test', upload.single('pmi'), (req, res) => { 
    console.log(req)
    res.json({message: req.file})
})




module.exports = (app) => {
    app.use(router)
}