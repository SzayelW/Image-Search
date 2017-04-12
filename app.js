var mongodb =  require('mongodb').MongoClient
var express =  require('express')
var request = require('request')
var app = express()

var apikey = process.env.API_KEY
var cx = process.env.CX

app.get('/:search', (req,res)=>{
    var search = req.params.search
    var offset = req.query.offset || 10
    
    var endPoint = "https://www.googleapis.com/customsearch/v1?q="+search+"&cx="+cx+"&num="+offset+"&searchType=image&key="+apikey
    request(endPoint, (error, response, body)=> {
          if (!error && response.statusCode === 200) {
            const searchResponse = JSON.parse(body)
            console.log("Got a response: ", searchResponse.items)
                res.send(searchResponse.items)
          } else {
              res.send({error: "invalid search"})
              console.log("Got an error: ", error, ", status code: ", response.statusCode)
          }
        })
})

app.listen(8080, ()=>{
    console.log("listening on port 8080")
})