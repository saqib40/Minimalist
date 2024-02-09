const express = require("express");
const user = require("./routes/users");
require("dotenv").config();
const path = require('path');

const app = express();

const PORT = process.env.PORT || 4000;

const cors = require("cors");
app.use(cors());
app.use(express.static(path.join(__dirname, '../frontend/build')));

app.use(express.json());

require("./config/db").connect();

const fileupload = require("express-fileupload");
app.use(fileupload({
    useTempFiles: true,
    tempFileDir: "/tmp",
}));

const cloudinary = require("./config/cloudinary");
cloudinary.cloudinaryConnect();

app.use("/v1", user);

app.listen(PORT, () => {
    console.log(`App is listening at ${PORT}`);
});