import Users from "../models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const Register = async (req, res) => {
  const { username, password, confirm_password } = req.body;
  if (password !== confirm_password)
    return res.status(400).json({ message: "Password tidak sama" });

  try {
    const hashPassword = await bcrypt.hash(password, 5);
    const data = await Users.create({ username, password: hashPassword });
    res.status(201).json({ message: "User berhasil dibuat", data });
  } catch (error) {
    res.status(500).json({ message: "Terjadi Kesalahan", error: error.message });
  }
};

export const Login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await Users.findOne({ where: { username } });
    if (!user) return res.status(404).json({ message: "User tidak ditemukan" });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(401).json({ message: "Password salah" });

    const accessToken = jwt.sign(
      { id: user.id, username: user.username },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1h" }
    );
    const refreshToken = jwt.sign(
      { id: user.id, username: user.username },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1d" }
    );

    await Users.update({ refresh_token: refreshToken }, { where: { id: user.id } });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      sameSite: "Lax",  // atau "None" jika kamu pakai HTTPS & beda origin
      secure: false,    // ganti ke true kalau pakai HTTPS
      path: "/",
      maxAge: 24 * 60 * 60 * 1000
    });

    res.status(200).json({ accessToken });
  } catch (error) {
    res.status(500).json({ message: "Terjadi Kesalahan", error: error.message });
  }
};

export const refreshToken = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.sendStatus(401);

  const user = await Users.findOne({ where: { refresh_token: refreshToken } });
  if (!user) return res.sendStatus(403);

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.sendStatus(403);

    const accessToken = jwt.sign(
      { id: user.id, username: user.username },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ accessToken });
  });
};

export const logout = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.sendStatus(204);

  const user = await Users.findOne({ where: { refresh_token: refreshToken } });
  if (!user) return res.sendStatus(204);

  await Users.update({ refresh_token: null }, { where: { id: user.id } });
  res.clearCookie("refreshToken");

  res.status(200).json({ message: "Logout Berhasil" });
};
