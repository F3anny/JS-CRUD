const connection=require('./configurations/config')
const express=require('express')
const app=express()
const cors=require('cors')
app.use(cors())




app.use(express.json())
const userroute=require('./route/route')


app.use('/api',userroute)

 const port=process.env.PORT || 1200
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
})