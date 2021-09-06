const express = require("express");
const connectDB = require("./config/db");
const app = express();

// Connect Database
connectDB();

//Init Middleware - to get body of req received by server
app.use(express.json());
//app.use(express.urlencoded());


//Define Routes
app.use("/api/users", require("./routes/users"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/contacts", require("./routes/contacts"));

// HomePage Route
app.get("/", (req, res) =>
    res.sendFile("C:/Users/Parvinder/Desktop/contact-keeper/index.html")
);
app.post("/", (req, res) => res.send(req.body));



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`server started at port:${PORT}`));
