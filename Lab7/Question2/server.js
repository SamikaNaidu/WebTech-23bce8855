const express = require("express");
const { MongoClient } = require("mongodb");

const app = express();

app.use(express.json());
app.use(express.static("public"));

const url = "mongodb://127.0.0.1:27017";
const client = new MongoClient(url);

let db;

async function startServer(){

    await client.connect();

    db = client.db("bookFinder");

    console.log("MongoDB connected");

    app.listen(3001,()=>{
        console.log("Server running on http://localhost:3001");
    });

}

startServer();


// SEARCH BOOK BY TITLE
app.get("/books/search", async(req,res)=>{

const title = req.query.title;

const books = await db.collection("books")
.find({title:{$regex:title,$options:"i"}})
.toArray();

res.json(books);

});


// FILTER BY CATEGORY
app.get("/books/category/:category", async(req,res)=>{

const category = req.params.category;

const books = await db.collection("books")
.find({category:category})
.toArray();

res.json(books);

});


// SORT BY PRICE
app.get("/books/sort/price", async(req,res)=>{

const books = await db.collection("books")
.find()
.sort({price:1})
.toArray();

res.json(books);

});


// SORT BY RATING
app.get("/books/sort/rating", async(req,res)=>{

const books = await db.collection("books")
.find()
.sort({rating:-1})
.toArray();

res.json(books);

});


// TOP RATED BOOKS
app.get("/books/top", async(req,res)=>{

const books = await db.collection("books")
.find({rating:{$gte:4}})
.limit(5)
.toArray();

res.json(books);

});


// PAGINATION
app.get("/books", async(req,res)=>{

const page = parseInt(req.query.page) || 1;
const limit = 5;
const skip = (page-1)*limit;

const books = await db.collection("books")
.find()
.skip(skip)
.limit(limit)
.toArray();

res.json(books);

});