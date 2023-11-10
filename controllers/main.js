const jwt = require("jsonwebtoken");
const CustomAPIError = require("../errors/custom-error");

const login = async (req, res) => {
  const { username, password } = req.body;

  //we can run validation by the following way
  //1 -> using mongoose validation
  //2 -> using joi validation
  //3 -> validation in controllers ( we are using it here)
  if (!username || !password)
    throw new CustomAPIError("please provide the userna me and password", 400);

  const id = new Date().getDate();

  const token = jwt.sign({ username, id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  res.status(200).json({ msg: "user is signed in", token });
};

const dashboard = async (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new CustomAPIError("No token present", 400);
  }
  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const luckyNumber = Math.floor(Math.random() * 1000);
    res.status(200).json({
      msg: `Hello ${decoded.username}`,
      secret: `Here is your authorized data, your lucky number is ${luckyNumber}`,
    });
  } catch (err) {
    throw new CustomAPIError("user is not authorized", 401);
  }
};

module.exports = { login, dashboard };
