const express = require('express');
const { connect } = require('mongoose');
const cors = require('cors');
const { PORT, DB_CONNECT } = require('./Config/user.config');

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended:true}));


app.use(require('./Routes/user.route'));
app.use(require('./Routes/category.route'));
app.use(require('./Routes/product.route'));
app.use(require('./Routes/bill.route'));    
app.use(require('./Routes/dashboard.route'));

const start = async () => {
    await connect(DB_CONNECT).then(() => console.log('Successfully connected to DataBase')).catch((error) => {
        console.log('Error Connecting to Database :- ' + error)
    })
    app.listen(PORT);
}


start().then(() => {
    console.log(`Server is On at ${PORT}`);
})


// https://soshace.com/implementing-role-based-access-control-in-a-node-js-application/

