const express = require('express');
const app = express();
app.use(express.json());

const userRouter = require('./routes/user');
// const blogRouter = require('./routes/blog');
const categoryRouter = require('./routes/category');

//Use Router

app.use('/user', userRouter)
app.use('/category', categoryRouter)
// app.use('/property', propertyRouter)

app.listen(4000, '0.0.0.0', () => {
    console.log(`Server started on port 4000`)
})