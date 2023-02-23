import { Users } from "../models/UsersModel.js";
import argon2 from "argon2";

const cekEmail = async (email) => {
    const users = await Users.findOne({
        where: {
            email: email
        }
    })

    return users
}

const usersNoPass = async (email) => {
    const users = await Users.findOne({
        attributes: ["uuid", "email", "name"],
        where: {
            email: email
        }
    });
    return users
}

export const createUsers = async (req, res) => {
    const { email, name, password, confPassword } = req.body
    const users = await cekEmail(email);

    if (users) return res.status(400).json({ msg: "Email yang anda gunakan sudah terdaftar" })
    if (password !== confPassword) return res.status(400).json({ msg: "Password dan confirmasi password tidak sama" });
    const hashPassword = await argon2.hash(password);

    try {
        await Users.create({
            name: name,
            email: email,
            password: hashPassword
        })
        res.status(200).json({ msg: "Register Success" })
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}

export const login = async (req, res) => {
    const { password } = req.body
    const users = await cekEmail(req.body.email)

    if (users === null) return res.status(400).json({ msg: "Email tidak terdaftar" });

    const match = await argon2.verify(users.password, password);
    if (!match) return res.status(400).json({ msg: "Password yang anda masukan salah" });

    req.session.usersId = users.uuid;
    const uuid = users.uuid;
    const name = users.name;
    const email = users.email;
    res.status(200).json({ uuid, name, email });
}

export const auth = async (req, res) => {
    if (!req.session.usersId) {
        return res.status(401).json({ msg: "mohon login ke akun anda" });
    }
    const users = await Users.findOne({
        attributes: ["uuid", "email", "name"],
        where: {
            uuid: req.session.usersId
        }
    })
    if (!users) return res.status(400).json({ msg: "Users tidak ditemukan" });
    res.status(200).json(users);
}

export const logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) return res.status(400).json({ msg: "Tidak dapat logout" });
        res.status(200).json({ msg: "Anda telah logout" });
    })
}