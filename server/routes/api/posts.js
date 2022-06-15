const express = require("express");
const router = express.Router();
const mongodb = require("mongodb");


/*####################################################
 ************ Connecting to MongoDB ************/
async function loadPostsCollection(){
    const client = await mongodb.MongoClient.connect(
        "mongodb+srv://SR_DB:dbPassword@cluster0.hwyee.mongodb.net/Cluster0?retryWrites=true&w=majority",
        { useNewUrlParser: true});
    
    // This creates a connection with the collection
    // named posts from the database named Cluster0
    return client.db('Cluster0').collection('posts');
}
/* #################################################### */

// Get all posts
router.get('/', async(req,res)=>{
    // res.send('hello');
    const posts = await loadPostsCollection();
    res.send(await posts.find().toArray());
    console.log(`Fetching ${(await posts.find().toArray()).length} posts`);
});

// Add post
router.post('/', async(req,res)=>{
    const posts = await loadPostsCollection();
    await posts.insertOne({
        text: req.body.text,
        createdAt: new Date()
    });
    res.status(201).send();
    console.log("Created new post");
})

// Delete post

// :id is an argument containing id of the post which 
// we'll  pass through when delete req is sent
router.delete('/:id', async(req,res)=>{
    const posts = await loadPostsCollection();

    // req.params.id will take the value which :id
    // carried in the URL
    await posts.deleteOne({_id: new mongodb.ObjectID(
        req.params.id
    )});
    res.status(200).send();
    console.log(`Deleted post with id: ${new mongodb.ObjectID(
        req.params.id
    )}`);
})

// Update post

module.exports = router;