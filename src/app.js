const express = require("express");
const app = express();
require('../db/server')
const homerouters = require('../routers/routers')
const PORT = process.env.PORT ||8000;
app.use(express.json( ))
app.use('/', homerouters);
app.listen(PORT, () => {
    console.log(`Server is running live on port no.${PORT}`)
})