const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");

const app = express();

app.use(express.json());
app.use(express.static("public"));

const url = "mongodb://127.0.0.1:27017";
const client = new MongoClient(url);

let db;

async function startServer(){
    try{

        await client.connect();

        db = client.db("studentNotes");

        console.log("MongoDB connected");

        app.listen(3000,()=>{
            console.log("Server running on http://localhost:3000");
        });

    }
    catch(err){
        console.log("Database connection error:",err);
    }
}

startServer();


// ADD NOTE
app.post("/notes", async(req,res)=>{

    const note={
        title:req.body.title,
        subject:req.body.subject,
        description:req.body.description,
        created_date:new Date()
    };

    const result = await db.collection("notes").insertOne(note);

    res.json(result);

});


// VIEW NOTES
app.get("/notes", async(req,res)=>{

    const notes = await db.collection("notes").find().toArray();

    res.json(notes);

});


// UPDATE NOTE
app.put("/notes/:id", async(req,res)=>{

    const id=req.params.id;

    await db.collection("notes").updateOne(
        {_id:new ObjectId(id)},
        {
            $set:{
                title:req.body.title,
                description:req.body.description
            }
        }
    );

    res.json({message:"Note updated"});

});


// DELETE NOTE
app.delete("/notes/:id", async(req,res)=>{

    const id=req.params.id;

    await db.collection("notes").deleteOne(
        {_id:new ObjectId(id)}
    );

    res.json({message:"Note deleted"});

});