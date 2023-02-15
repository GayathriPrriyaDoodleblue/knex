const express = require('express');
require("dotenv").config();
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json())
const knex = require('knex')({
  client: 'mysql2',
  connection: {
    host: process.env.HOST,
    user: process.env.USER,
    password:process.env.PASSWORD,
    database:process.env.DATABASE
  } 
});
let port=process.env.PORT;
app.get('/users',(req, res) => {
    knex.select('*').from('users')
      .then((rows) => {
        res.json(rows);
      })
      .catch((err) => {
        res.status(500).json({ message: err.message });
      });
  });
  app.get('/users/get/:id',async (req,res)=>{
    try{
        // const id=req.params.id;
        // if(req.url === `/users/get/${id}`){
        const result=await knex('users').where({id:req.params.id});
        console.log(result);
         res.json({message:"Record updated successfully",result});
         }
        //  else {
        //     res.send('Unknown URL');
        // }
         catch(err){
             res.status(500).json({
                 error:'Internal server error'
             });
         }
       });
  app.post('/post',async (req,res)=>{
    try{
   const result= await knex('users').insert(req.body);
    res.json({message:"Record inserted successfully",result});
    }
    catch(err){
        res.status(500).json({
            error:'Internal server error'
        });
    }
  });
  app.put('/put/:id',async(req,res)=>{
    try{
   const result=await knex('users').where({id:req.params.id}).update(req.body);
    res.json({message:"Record updated successfully",result});
    }
    catch(err){
        res.status(500).json({
            error:'Internal server error'
        });
    }
  });
  app.delete('/delete/:id',async (req,res)=>{
    try{
   const result= await knex('users').where({id:req.params.id}).del();
    res.json({message:"Record deleted successfully",result});
    }
    catch(err){
        res.status(500).json({
            error:'Internal server error'
        });
    }
  });
  app.listen(port, () => {
    console.log('Server running on port',`${port}`);
  });
    