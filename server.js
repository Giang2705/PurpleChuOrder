require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const cookieParser = require('cookie-parser')

const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(cors())
app.use(fileUpload({
    useTempFiles: true,
}));

// Routes
app.use("/user", require("./routes/userRoutes"));
app.use("/api", require("./routes/categoryRoutes"))
app.use("/api", require("./routes/upload"))
app.use("/api", require("./routes/productRoutes"))
app.use("/api", require("./routes/paymentRoutes"))

// Connect to mongodb
const URI = process.env.MONGODB_URL
mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, err =>{
    if(err) throw err;
    console.log('Connected to MongoDB')
})

app.get("/", (req, res) => {
    res.json({msg: "Welcome to Purple Chu Order"});
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()  => {
    console.log("Server is running on port", PORT);
})