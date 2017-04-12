var mongodb =  require('mongodb').MongoClient
var express =  require('express')
var request = require('request')
var app = express()
var mongoUrl = process.env.MONGOLAB_URI
var apikey = process.env.API_KEY
var cx = process.env.CX

app.get('/api/imagesearch/:search', (req,res)=>{
    var search = req.params.search
    var offset = req.query.offset || 10
    var endPoint = "https://www.googleapis.com/customsearch/v1?q="+search+"&cx="+cx+"&num="+offset+"&searchType=image&key="+apikey
    
    mongodb.connect(mongoUrl, (err, db)=>{
        if(err){ throw err}
            var collection = db.collection('search')
            var date = new Date()
            collection.insert({term : search, when: date.toUTCString() })
    })
    
    request(endPoint, (error, response, body)=> {
          if (!error && response.statusCode === 200) {
                const searchResponse = JSON.parse(body)
                var items = searchResponse.items
                var imagesObject = [];
                items.forEach((item)=>{
                    var newitem = {url: item.link, snippet: item.snippet , thumbnail: item.image.thumbnailLink, context: item.image.contextLink}
                    imagesObject.push(newitem)                    
                })
                res.json(imagesObject)
          } else {
              res.send({error: "invalid search"})
              console.log("Got an error: ", error, ", status code: ", response.statusCode)
          }
        })
})

app.get('/api/latest/imagesearch/', (req, res)=>{
        mongodb.connect(mongoUrl, (err, db)=>{
            if(err){throw err}
            var collection = db.collection('search')
            collection.find().sort({_id:-1}).limit(10).toArray((err,doc)=>{
                if(err){throw err}
                res.json(doc)                
            })
        })
})

app.listen(process.env.PORT || 8080, ()=>{
    console.log("listening on port: " + process.env.PORT || "8080")
})