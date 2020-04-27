var express=require("express"),
    app=express(),
    bodyparser=require("body-parser"),
    mongoose=require("mongoose");
    
  
var port = process.env.PORT || 5000;
var methodOverride=require("method-override");
// App configuration  

app.set("view engine","ejs");
app.use(bodyparser.urlencoded({extended:true}));
app.use(methodOverride("_method"));
mongoose.connect('mongodb+srv://abhi:abhi@firstcluster-kvdh2.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser:true, useUnifiedTopology: true,useCreateIndex:true
}).then(()=>{
    console.log("connected to db");
}).catch(err =>{
    console.log("error:", err.message);
});

// database configuration

var blogschema=new mongoose.Schema(
    {
    title:String,
    image:String,
    body:String,
    created:{type:Date,default:Date.now}

    }
);

var Blog=mongoose.model("Blog",blogschema); //model

// Blog.create({
//     title:"Harley Davidson",
//     image:"https://images.unsplash.com/photo-1558980664-ce6960be307d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
//     body:"Harley-Davidson, Inc., H-D, or Harley, is an American motorcycle manufacturer founded in 1903 in Milwaukee, Wisconsin. It was one of two major American motorcycle manufacturers to survive the Great Depression, along with Indian"

// },function(err,data){
//     if(err){
//         console.log(err);
//     }
//     else{
//         console.log(data);
//     }
       
    
// });


// Routes routes
app.get("/",(req,res)=>{
  res.render("heroku rocks");
})
// indexa
app.get("/blog",(req,res)=>{
    Blog.find({},function(err,data){
        if(err){
            console.log(err);
        }
        else{
            res.render("index",{blog:data});
        }
    });
});
// new
app.get("/blog/new",function(req,res){
    res.render("new")
});
// create
app.post("/blog",(req,res)=>{

    Blog.create(req.body.blog,function(err,newdata){
        if(err){
            console.log(err);
        }
        else{
             console.log(newdata);
        }
    });
    res.redirect("/blog");
});

// show
app.get("/blog/:id",function(req,res){
    Blog.findById(req.params.id,function(err,foundblog){
        if(err){
            console.log(err);
        }
        else{
            // render the show template 
            res.render("show",{blog:foundblog});
        }
    });

});
// edit route
app.get("/blog/:id/edit",function(req,res){
    Blog.findById(req.params.id,function(err,foundblog){
        if(err){
            console.log(err);
        }
        else{
            // render the show template 
            res.render("edit",{blog:foundblog});
        }
    });
});
// update route
app.put("/blog/:id",function(req,res){
    Blog.findByIdAndUpdate(req.params.id,req.body.blog,function(err,updatedblog){
        if(err){
            console.log(err);
        }
        else{
            res.redirect("/blog/"+req.params.id);
        }
    });
    
});
// delete route
app.delete("/blog/:id",function(req,res){
    Blog.findByIdAndRemove(req.params.id,function(err){
        if(err){
            res.redirect("/blog");
        }
        else{
            res.redirect("/blog");
        }
    });
});

app.listen(port,function(req,res){
    console.log("someone started the server");
});
