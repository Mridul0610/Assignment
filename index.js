let express=require("express");
let app=express();
let mongoose=require("mongoose");
let {userModel}=require("./model/userModel");
let hbs=require("hbs");
app.set("view-engine","hbs");
app.use(express.urlencoded({extended:true}));

// db connctions
mongoose.connect("mongodb://127.0.0.1:27017/ankDB");
mongoose.connection.once("open",()=>console.log("db is connected.."));
mongoose.connection.on("error",((err)=>console.log(err)));

app.get("/",(req,res)=>{
     res.render("./index.hbs");
})

app.post("/register",async(req,res)=>{
     let {name,age,salary,email,department}=req.body
          if(name==""||age==null||salary==null||department==""||email==""){
               res.render("./index.hbs",{data:"All fields are required!!"})
          }
            let find=await userModel.findOne({email:req.body.email});
            if(find){
               res.render("./index.hbs",{data:"email is already existed..."})
            }else{
     
          let result=await userModel.create(req.body);
          if(result){
               res.render("./index.hbs",{data:"data is submitted..."})
                   }
           }
     })


app.post("/register",async(req,res)=>{
     let result=await userModel.create(req.body);
     if(result){
          res.render("./index.hbs",{data:"data is submitted..."})
          
     }
})

app.get("/find",async(req,res)=>{
      let result=await userModel.find();
      if(result){
          res.render("./data.hbs",{data:result})
      }
})


app.post("/update",async(req,res)=>{
     let {id,name,age,salary,email,department}=req.body

       let update=await userModel.updateOne({_id:id},{
          $set:{
               name:name,
               age:age,
               email:email,
               salary:salary,
               department:department
          }
     });
     if(update){
          res.redirect("/find")
     }
})


app.get("/update/:id",async(req,res)=>{
   let id=req.params.id;
   let find=await userModel.findOne({_id:id})
   if(find){
     res.render("./update.hbs",{data:find})
   }
})



app.get("/delete/:id",async(req,res)=>{
     let id=req.params.id;
     let delete1=await userModel.deleteOne({_id:id})
     if(delete1){
       res.redirect("/find")
     }
  })

  app.listen(3000,()=>console.log("start server..."));