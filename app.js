const express = require("express");
const app = express();

app.use(express.static("public"));

const p = __dirname + "/public/";

app.get("/", (req, res) => {
    return res.sendFile(p + "index.html");
});

app.listen(3000, (error) => {
    if (error) {
        console.log(error);
    } else {
        console.log("Server listening on port", 3000);
    }
});