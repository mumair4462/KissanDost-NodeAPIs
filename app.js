require('dotenv').config();

const express = require('express');
const cors = require('cors');
const auth_routes = require('./routes/auth')
const product_routes = require('./routes/products')

const app = express();
const PORT = process.env.PORT || 3000;


// middleware
app.use(express.json({limit: '50mb'}));

app.use(cors());
// to set router
app.use('/api/auth',auth_routes)
app.use('/api/product',product_routes);

app.get('/getImg/:id', async(req, res)=>{
    const {id} = req.params;

    res.sendFile(__dirname + `/uploads/${id}`);
})


const start = async ()=>{
    try {
        app.listen(PORT, ()=>{
            console.log("Server is listen at ", `http://localhost:${PORT}`);
        });
    } catch (error) {
        console.log(error);
    }
}

start();