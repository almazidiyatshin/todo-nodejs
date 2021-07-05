const Todo = require('../mysql');

exports.handleRoot = (req, res) => {
  Todo.findAll({ raw: true })
    .then((todos) => res.render('index.hbs', {
      data: todos,
    }))
    .catch((err) => console.log(err));
};

exports.handleChange = (req, res) => {
  const id = Number(req.params.id);
  const { title } = req.body;

  Todo.update({ title }, {
    where: {
      id,
    },
  })
    .catch((error) => console.log(error))
    .finally(() => res.redirect('/'));
};

exports.handleCreate = (req, res) => {
  const { title } = req.body;

  Todo.create({
    title,
    completed: false,
  })
    .catch((error) => console.log(error))
    .finally(() => res.redirect('/'));
};

exports.handleDelete = (req, res) => {
  const id = Number(req.params.id);

  Todo.destroy({
    where: {
      id,
    },
  })
    .catch((error) => console.log(error))
    .finally(() => res.render('index.hbs'));
};

exports.handleComplete = async ({ params: { id } }, res) => {
  try {
    const todo = await Todo.findByPk(id);
    const newCompleted = !(todo.dataValues.completed);
    await Todo.update({ completed: newCompleted }, { where: { id } });
    res.render('index.hbs');
  } catch (err) {
    console.log(err);
  }

  // Todo.findByPk(id)
  //   .then((todo) => {
  //     if (!todo) {
  //       return Promise.reject(new Error('Todo not found'));
  //     }
  //     const newCompleted = !(todo.dataValues.completed);
  //     return newCompleted;
  //   })
  //   .then((completed) => {
  //     Todo.update({ completed }, {
  //       where: {
  //         id,
  //       },
  //     })
  //       .catch((error) => console.log(error));
  //   })
  //   .catch((error) => console.log(error))
  //   .finally(() => res.render('index.hbs'));
};
