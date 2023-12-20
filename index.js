import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

import Quote from './models/Quote.js'

const app = express()
dotenv.config()

app.use(bodyParser.json({ limit:'30mb', extended:true }))
app.use(bodyParser.urlencoded({ limit:'30mb', extended:true }))
app.use(cors())


app.get("/", (req, res) => res.send("Welcome To Quotes API!"))

app.get("/quotes", async (req, res) => {
    try {
        const quotes = await Quote.find()
        res.status(200).json(quotes)
    } catch (error) {
        res.json({ message: error.message })
    }
})

app.post("/quote", async (req, res) => {
    const quote = req.body
    const newQuote = new Quote(quote)
    try {
        await newQuote.save()
        res.status(201).json(newQuote)
    } catch (error) {
        res.json({ message: error.message })
    }
})

app.delete("/quote/:id", async (req, res) => {
    const { id } = req.params
    
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`)
    
    await Quote.findByIdAndDelete(id)
    res.json({ message: "Post deleted successfully" })
})

const PORT = process.env.PORT || 5000

mongoose.connect(process.env.DB)
    .then(() => app.listen(PORT, () => console.log(`Server is running on port ${PORT}`)))
    .catch((err) => console.log({ error: err.message }))