const express=require('express')
const request=require('request')

const app=express()
const dotenv=require('dotenv')
dotenv.config()

app.set("view engine","ejs")
app.use('/public',express.static('public'))


app.get("/",(req,res)=>{
    res.render("homepage",{navActive:"home"})
    
})

app.get("/result",(req,res)=>{
    // console.log(req.query.movieName)
    const url=`http://www.omdbapi.com/?apikey=${process.env.API_KEY}&s=${req.query.movieName}`
    request(url, function(error,response,body){
        if(!error&&response.statusCode==200){
            const data=JSON.parse(body)
            res.render("result",{movieData:data,title:req.query.movieName,navActive:"none"}) 
            // res.send(data)
        }
        else{
            res.send("Uh oh error")
        }
    })
})

app.get("/result/:id",(req,res)=>{
    // console.log(req.params.id)
    const url=`http://www.omdbapi.com/?apikey=${process.env.API_KEY}&i=${req.params.id}`
    request(url, function(error,response,body){
        if(!error&&response.statusCode==200){
            const data=JSON.parse(body)
            // console.log(data)
            // res.render("result",{movieData:data}) 
            res.render("AboutMovie",{movieData:data,navActive:"none"})
        }
        else{
            res.send("Uh oh error")
        }
    })
})

app.get("/aboutme",(req,res)=>{
    res.render("AboutMe",{navActive:"aboutme"})
})

app.get("*",(req,res)=>{
    res.send("uh oh something went wrong")
})

app.listen(process.env.PORT,()=>{
    console.log(`Server has started at port ${process.env.PORT}`)
})