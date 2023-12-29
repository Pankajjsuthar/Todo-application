const bodyParser = require("body-parser");
const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();
const mongoose = require("mongoose");
const PORT = 3000;

app.use(express.json());

const secretKey = "S3cr#tK3y";

//mongodb user schema
const userSchema = {
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  todos: [{ type: mongoose.Schema.Types.ObjectId, ref: "Todo" }],
};

const todoSchema = {
  title: { type: String, required: true },
  description: { type: String, default: "" },
  date: { type: Date, default: Date.now },
};

// define mongoose models
const User = mongoose.model("User", userSchema);
const Todo = mongoose.model("Todo", todoSchema);

const authenticatejwt = (req, res, next) => {
    const auth = req.headers.authorise;
    if (auth) {
      const token = auth.split(" ")[1];
      jwt.verify(token, secretKey, (err, user) => {
        if (err) {
          res.sendStatus(500);
        }
        req.user = user;
        next();
      });
    }
    else{
      res.sendStatus(500);
    }
  };

//connect db
const db = "mongodb+srv://pankajsuthar27302:pankajsuthar@cluster0.ysbw1vb.mongodb.net/";

async function connectDB(){
    try{
        await mongoose.connect(db);
        console.log("MongoDB connected.");
    }
    catch{
        console.log("Failed to connect with MongoDB.");
    }
}
connectDB();


app.post("/user/signup", (req, res) => {
  //checks if email already exists or not
  //add the email and password in the mongodb.
  const {email,password} = req.body;
  User.findOne({email}).then((admin) => {
    if(admin){
        res.status(403).json({message : "User already exists."});
    }
    else{
        const obj = {
            email : email,
            password : password
        }
        const newUser = new User(obj);
        newUser.save();
        res.status(200).json({message : "User created successfully."});
    }
  });
});

app.post("/user/login",async (req, res) => {
  //checks if user exists in the database or not and the deails are correct or not.
  //return a jwt token that will be used for further todos routes.
  const {email,password} = req.body;
  const user = await User.findOne({email : email, password : password});
  if(user){
    const token =await jwt.sign({email : email, password : password}, secretKey, {expiresIn : '1hr'});
    res.status(200).json({message : "User logged in successfully.", token})
  }
  else{
    res.status(403).json({message : "User not found."});
  }
});

app.post("/user/todo", authenticatejwt,async (req, res) => {
  // adds a new todo in the database after authorisation.
  const todo = req.body;
  const newTodo = new Todo(todo);
  await newTodo.save();
  res.status(200).json({message : "Todo added successfully."});
});

app.get("/user/todo", authenticatejwt, async (req, res) => {
  // get all the todos for a respective user after authorisation.
  const todos = await Todo.find({});
  res.status(200).json({todos : todos});
});

app.put("/user/todo/:id", authenticatejwt,async (req, res) => {
  //route to update a specific todo item.
  const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, {new : true });
  if(todo){
    res.status(200).json({message : "Todo item updated successfully."});
  }
  else{
    res.sendStatus(403);
  }
});

app.delete("/user/todo/:id", authenticatejwt,async (req, res) => {
  // delete a specific todo item.
  const deletedTodo = await Todo.findByIdAndDelete(req.params.id);
  if(!deletedTodo){
    res.status(403).json({message : "Todo not found."});
  }
  res.status(200).json({message : "Todo item deleted."});
});

app.listen(3000, () => {
  console.log(`Server started at port ${PORT}`);
});
