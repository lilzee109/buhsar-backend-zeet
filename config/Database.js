import { Sequelize } from "sequelize";

const db = new Sequelize("freedb_freedb_dbBuah", "freedb_buhsar", "KVHTptWx26U?!3e", {
    host: "sql.freedb.tech",
    dialect: "mysql"
})

export default db;