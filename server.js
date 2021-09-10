const express = require("express");
const connectDB = require("./config/db");
const app = express();
const path = require("path");

//TODO nothing

// Connect Database
connectDB();

//Init Middleware - to get body of req received by server
app.use(express.json());
//app.use(express.urlencoded());

//Define Routes
app.use("/api/users", require("./routes/users"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/contacts", require("./routes/contacts"));

// Serve static assets in production
if (process.env.NODE_ENV === "production") {
    // Set static folder
    app.use(express.static(path.resolve(__dirname, client, build)));
    app.get("*", (req, res) =>
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
    );
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`server started at port:${PORT}`));
