// models/UserModel.js
import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const User = db.define('users', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    refresh_token: {
        type: DataTypes.TEXT
    }
}, {
    freezeTableName: true
});

export default User;


(async()=>{
    await db.sync();
})();