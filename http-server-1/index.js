const express = require("express")
const app = express()
var users = [{
  name: "John",
  kidneys: [{
    healthy: false
  },{
    healthy: true
  }]
}]
//input type
// 1) Query parameters --> /?n=30
//                        for get const n = req.query.n;
app.get("/",function(req,res){
  const johnkidneys = users[0].kidneys;
  const noofkidneys = johnkidneys.length;
  let healthy =0;
  let unhealthy = 0;
  for(let i=0;i<johnkidneys.length;i++){
    if(johnkidneys[i].healthy){
      healthy++;
    }
    else{
      unhealthy++;
    }
  }
  res.json({
    noofkidneys,healthy,unhealthy
  })
})

// input type const body = req.body.ishealthy;
app.use(express.json())
app.post("/",function(req,res){
  const isHealthy = req.body.isHealthy;
  users[0].kidneys.push({
    healthy: isHealthy
  })
  res.json({
    msg:"Done!"
  })
})

//
app.put("/",function(req,res){
  for(let i=0;i<users[0].kidneys.length;i++){
    users[0].kidneys[i].healthy = true;
    res.json({});
  }
})

app.delete("/",function(req,res){
  const newkidneys = [];
  for(let i=0;i<users[0].kidneys.length;i++){
    if(users[0].kidneys[i].healthy){
      newkidneys.push({
        healthy: true
      })
    }
    users[0].kidneys = newkidneys;
    res.json({msg: "done"});
  }
})
app.listen(3000);