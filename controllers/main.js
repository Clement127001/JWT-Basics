const jwt = require("jsonwebtoken");
const { BadRequestError } = require("../errors");

const login = async (req, res) => {
  const { username, password } = req.body;

  //we can run validation by the following way
  //1 -> using mongoose validation
  //2 -> using joi validation
  //3 -> validation in controllers ( we are using it here)
  if (!username || !password)
    throw new BadRequestError("please provide the username and password");

  const id = new Date().getDate();

  const token = jwt.sign({ username, id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  res.status(200).json({ msg: "user is signed in", token });
};

const dashboard = async (req, res) => {
  const { username, id } = req.user;
  const luckyNumber = Math.floor(Math.random() * 1000);
  res.status(200).json({
    msg: `Hello ${username}`,
    secret: `Here is your authorized data, your lucky number is ${luckyNumber}`,
  });
};

module.exports = { login, dashboard };
