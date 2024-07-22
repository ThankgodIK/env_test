import "dotenv/config";

//importing modules
import { log } from "console";
import express from "express";
import http from "http";
import mongoose from "mongoose";

const app = express();
const PORT = 7000;
// const dataBase = "";

app.use(express.json());
//route set
app.get("/", (req, res) => {
  res.send("Hello World");
});

//connecting to Mongodb
const connectMongoDb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CONNECTION_STRING);
    console.log("Server connected Succesfully");
  } catch (error) {
    console.log(error);
  }
};

//calling the function
connectMongoDb();

//importing model
import user from "./Models/user.js";

//creating multiple users
const createManyPeople = async () => {
  const arrayOfPeople = [
    { name: "Daniel", email: "example@mail.com", Number: 234567890 },
    { name: "Gad", email: "example1@mail.com", Number: 234567899 },
  ];
  try {
    const people = await user.create(arrayOfPeople);
    console.log(people);
  } catch (error) {
    console.log(error);
  }
};

//get route
app.get("/allUsers", async (req, res) => {
  try {
    const displayAll = await user.find();
    res.send(displayAll);
  } catch (error) {
    res.send("An error occured");
  }
});

//post route
app.post("/register", async (req, res) => {
  const { name, email, Number } = req.body;
  try {
    const userCreated = await user.create({
      name: name,
      email: email,
      Number: Number,
    });
    res.send(userCreated);
  } catch (error) {
    console.log(error);
    res.send("An error occurred");
  }
});

//put route
app.put("/updateuser/:userId", async (req, res) => {
  const { userId } = req.params;
  const { name } = req.body;
  try {
    const updateUser = await user.findByIdAndUpdate(
      userId,
      { name: name },
      { new: true }
    );
    res.send(updateUser);
  } catch (error) {
    res.send("an error occured");
  }

  // try {
  //   const editUser = await user.findOneAndUpdate(
  //     { _id: "6697f18453a0f84ddb49ddb2" },
  //     { name: "Thankgod" },
  //     { new: true }
  //     );
  //     res.send("User updated Succesfully");
  //   } catch (error) {
  //     res.send("an error occured");
  //   }
});

//delete route
app.delete("/deleteuser/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const deletePerson = await user.findByIdAndDelete(userId);
    res.send(deletePerson);
  } catch (error) {
    res.send("An error occured");
  }
});

//listen to server
app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});
