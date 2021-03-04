const model = require('../models/mysqldb')

const createUser = async (req, res) => {
  try {
    await model.user.create(req.body)
    return res.sendStatus(200)
  } catch (error) {
    return res.sendStatus(400)
  }
}

const getUsers = async (req, res) => {
  const users = await model.user.findAll()
  return res.send({ users })
}

const updateUser = async (req, res) => {
  try {
    await model.user.update(req.body, {
      where: {
        id: req.body.id
      }
    })
    return res.sendStatus(200)
  } catch (error) {
    return res.sendStatus(400)
  }
}

const deleteUser = async (req, res) => {

  console.log(req.body)
  try {
    await model.user.destroy({
      where: { id: req.body.id }
    })

    return res.sendStatus(200)
  } catch (error) {
    return res.sendStatus(400)
  }
}


module.exports = {
  createUser,
  getUsers,
  updateUser,
  deleteUser
}