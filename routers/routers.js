const express = require("express");
const Router = express.Router();
const server = require('../models/mens')

Router.get("/", (req, res) => {
    res.send("Hello from the hello page");
});
Router.post('/mens', async (req, res) => {
    try {
        const addingMensRecord = new server(req.body);


        console.log(req.body)
        const insertMens = await addingMensRecord.save();
        res.status(201).send(insertMens);
    } catch (err) {
        res.status(400).send(err);
    }
})

Router.get('/mens', async (req, res) => {
    try {
        const getMens = await server.find().sort({"ranking":1});
        console.log(getMens);
        res.status(201).send(getMens);
    }
    catch (err) {
        res.status(400).send(err);

    }
})
// If you want to access an individual or want to see an individual person
// information then with the help of params.name or by passing any argument
// It will show you those things

// Router.get("/mens/:name", async (req, res) => {
//     try {
//         const name = req.params.name;
//         const olympicsName = await server.findOne({ name });

//         if (!olympicsName) {
//             return res.status(404).send();
//         }
//         else {
//             res.send(olympicsName);
//             console.log(olympicsName);
//         }
//     } catch (err) {
//         res.status(500).send(err)
//     }
// })


// Suppose, if you want to aceess the information with the help of id
// And the important thing you can use only one at a time
Router.get("/mens/:id", async (req, res) => {
    try {
        const _id = req.params.id;
        const olympicsID = await server.findById(_id);
        
            console.log(olympicsID);
            res.send(olympicsID);
        
    }
    catch(err){
        res.status(500).send(err);
    }
    
    
})

// If you want to update it then you can use patch method
// Router.patch('/mens/:id', async(req,res) => {
//     try{
//         const _id = req.params.id;
//         const olympicsData = await server.findByIdAndUpdate({_id}, req.body, {
//             new:true,
//         });
//         res.send(olympicsData); 

       
//     }catch(err){
//         res.status(500).send(err);

//     }
// })


// And suppose if you want to update it by name then here it is

Router.patch("/mens/:name", async(req,res) => {
    try{
    const name = req.params.name;
    const olympicsData = await server.findOneAndUpdate({name}, req.body,{
        new:true,
    })
    res.status(201).send(olympicsData);
}
    catch(err){
        res.status(500).send(err);
    }

})

// we will handle the delete request in api from database

Router.delete("/mens/:id", async(req,res) => {
    try{
        const _id = req.params.id;
        const olympicsDel = await server.findByIdAndDelete(_id)
        console.log("Deleted Succesfully");
        res.send(olympicsDel)
    }
    catch(err){
        res.status(500).send(err);
    }
})
module.exports = Router;