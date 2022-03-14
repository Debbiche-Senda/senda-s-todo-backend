require('dotenv').config({ path: './config/.env' });
const express = require('express');
const connectDB = require('./config/connectDB');
const { getTodos, createTodo, editTodo } = require('./controller/todo.controller');
const { getUserById, userLogin, userRegister } = require('./controller/user.controller');
const isAuth = require('./jwt/passport-setup');

const app = express();

const Router = express.Router();

connectDB();

app.use(express.json());

Router.get('/todo', getTodos);
Router.post('/todo', createTodo);
Router.patch('/edit/:_id', editTodo);

Router.get('/user/:_id', isAuth(), getUserById);
Router.post('/login', userLogin);
Router.post('/register', userRegister);

app.use('/', Router);

const PORT = process.env.PORT;

app.listen(PORT, (err) => {
  err ? console.log('server connection failed') : console.log(`server connected successfully on PORT ${PORT}`);
});
