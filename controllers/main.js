const login = async (req, res) => {
  res.status(200).json({ msg: "Fake sign in or login" });
};

const dashboard = async (req, res) => {
  const luckyNumber = Math.floor(Math.random() * 1000);
  res.status(200).json({
    msg: "Hello Clement",
    secret: `Here is your authorized data, your lucky number is ${luckyNumber}`,
  });
};

module.exports = { login, dashboard };
