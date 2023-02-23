// import { Sequelize } from "sequelize"

// const db = new Sequelize("auth_db", "root", "", {
//     host: "localhost",
//     dialect: "mysql"
// })

// export default db;


import { Sequelize } from "sequelize";

const db = new Sequelize("freedb_dbBuah", "freedb_data-website", "7@cW!5GTY%7bBwd", {
    host: "sql.freedb.tech",
    dialect: "mysql"
})

export default db;