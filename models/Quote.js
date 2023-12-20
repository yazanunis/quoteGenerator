import mongoose from "mongoose"

const quoteSchema = mongoose.Schema({
    text: String,
    author: String
})

const Quote = mongoose.model('quoteSchema', quoteSchema)

export default Quote