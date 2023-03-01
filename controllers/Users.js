import User from "../models/UsersModel.js";
import argon2 from "argon2";

const sessions = {};

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
        res.status(400).json({ msg: error.message });
    }
}

export const login = async (req, res) => {
    console.log("login")
    const users = await cekUsers(req.body.email);
    // Jika users tidak terdaftar
    if (!users) return res.status(404).json({ msg: "Users tidak terdaftar" })
    // cek password
    const match = await argon2.verify(users.password, req.body.password);
    if (!match) return res.status(400).json({ msg: "Password salah" });
    req.session.userId = users.uuid;
    const uuid = users.uuid
    const email = users.email
    const name = users.name


    const sessionId = users.uuid
    sessions[sessionId] = { email, userId: 1 };
    res.set('Set-Cookie', `session=${sessionId}`);
    res.status(200).json({ uuid, email, name })
}

export const auth = async (req, res) => {
    let sessionId = req.headers.cookie.split('=')[1];
    const userSession = sessions[sessionId]
    console.log(req.session.userId, userSession)
    if (!req.session.userId) {
        return res.status(401).json({ msg: "Mohon login ke akun anda" });
    }
    const users = await User.findOne({
        attributes: ["uuid", "name", "email"],
        where: {
            uuid: req.session.userId
        }
    });
    if (!users) return res.status(400).json({ msg: "User tidak ditemukan" });
    res.status(200).json(users);
}

export const logout = async (req, res) => {
    req.session.destroy((err) => {
        if (err) return res.status(400).json({ msg: "Tidak dapat logout" });
        res.status(200).json({ msg: "Anda berhasil logout" });
    });
}