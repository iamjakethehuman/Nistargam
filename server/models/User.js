const {Schema, model, Types:{ObjectId}} = require('mongoose')

//TO DO change user model according to exam description 
// TO DO ADD VALIDATION 
const userSchema = new Schema({
        email: {type: String, required: true},
        username: {type: String, required: true},
        hashedPassword: {type: String, required: true},
        verified: {type: Boolean},
        posts: [{type: ObjectId, ref:'Post' }],
        following: [{type: ObjectId, ref:'User' }],
        followers: [{type: ObjectId, ref:'User'}],
        pfp: {type: String, required: true},
        savedPosts: [{type: ObjectId, ref: 'Post'}],
        receivedLikes: [{
            user: {type: ObjectId, ref: 'User'},
            postId: {type: ObjectId, ref: 'Post'}
        }]

        
    })

userSchema.index({email: 1}, {
    unique: false,
    collation: {
        locale: 'en',
        strength: 2
    }
})

const User = model('User', userSchema)

module.exports = User;