const {Schema, model, Types:{ObjectId}} = require('mongoose')

//TO DO change user model according to exam description 
// TO DO ADD VALIDATION 
const postSchema = new Schema({
        title: {type: String, required: true},
        imgUrl: {type: String, required: true},
        author: {type: String, required: true},
        authorId: {type: String, required: true},
        comments: [[Schema.Types.Mixed]],
        number: {type: Number, required: true},
        likes: [{type: ObjectId, ref:'User' }],
        creationDate: {type: Date, required: true}
    })

/* userSchema.index({email: 1}, {
    unique: false,
    collation: {
        locale: 'en',
        strength: 2
    }
})
*/

const Post = model('Post', postSchema)

module.exports = Post;