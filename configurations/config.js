const mongoose=require('mongoose')
mongoose.connect('mongodb://localhost/ketsy').then(()=>{
    console.log('Connected to the databse successfully')
}).catch(()=>{
    console.log('There has been an error connecting to the database')
})