import User from "../models/UsersModel.js";

const cekUsers = async (email) => {
    const users = await User.findOne({
        where: {
            email: email
        }
    });

    return users
}

export const createUsers = async (req, res) => {
    const { email, name, password, confPassword } = req.body;
    const Users = await cekUsers(email)
    // Jika users name sudah terdafatar
    if (Users) return res.status(400).json({ msg: "Email sudah digunakan" });
    // Jika password dan confirmasi password tidak sama
    if (password !== confPassword) return res.status(400).json({ msg: "Password dan confirmasi password tidak sama" })

    // Hash password
    const hashPassword = await argon2.hash(password);
    try {
        await User.create({
            name: name,
            email, email,
            password: hashPassword
        })
        res.status(200).json({ msg: "Register success" })
    } catch (error) {
        res.status(400).json({ error });
    }
}