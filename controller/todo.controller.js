const Todo = require('../models/Todo');
const nodemailer = require('nodemailer');

exports.getTodos = async (req, res) => {
  const todos = await Todo.find();

  try {
    res.json(todos);
  } catch (error) {
    console.log('get todos failed', error);
    res.status(500).json({ msg: 'Fetch todos failed' });
  }
};

exports.createTodo = async (req, res) => {
  console.log(req.body);

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD
    }
  });

  const mailOptions = {
    to: req.body.email,
    from: process.env.EMAIL,
    subject: 'Testing and Testing',
    text: 'Todo created successfully '
  };

  const mailOptions2 = {
    to: process.env.EMAIL,
    from: process.env.EMAIL,
    subject: 'Testing and Testing',
    text: 'You have a new todo'
  };
  try {
    const newTodo = new Todo(req.body);
    await newTodo.save();

    await transporter.sendMail(mailOptions);
    await transporter.sendMail(mailOptions2);

    res.json(newTodo);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'Create todo failed' });
  }
};

exports.editTodo = async (req, res) => {
  const { _id } = req.params;

  console.log(req.body);

  try {
    const todo = await Todo.findById(_id);
    todo.isCompleted = req.body.isCompleted;
    await todo.save();
    res.json(todo);
  } catch (error) {
    console.log('Todo complete failed', error);
    res.status(500).json({ msg: 'Todo complete failed' });
  }
};
