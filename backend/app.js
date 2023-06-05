const express = require('express');
require('express-async-errors');
const userRouter = require('./routes/user');
const actorRouter = require('./routes/actor');
const movieRouter = require('./routes/movie');
const adminRouter = require('./routes/admin');
const reviewRouter = require('./routes/review');
const {errorHandler} = require('./middlewares/error')
const {handleNotFound} = require('./utils/helper');

const cors = require('cors');


require('dotenv').config()

require('./db');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/user',userRouter);
app.use('/api/actor',actorRouter);
app.use('/api/movie',movieRouter);
app.use('/api/review',reviewRouter);
app.use('/api/admin',adminRouter);


app.use('/*',handleNotFound)

app.use(errorHandler);

app.get("/",(req,res) => {
	res.send("<h1>..::..::..::..::..::..::..</h1>");
});


app.listen(5000,() => {
	console.log("Hello from PORT 5000");
})