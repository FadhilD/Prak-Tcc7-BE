import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const {DataTypes} = Sequelize;

const Note = db.define('notes',{
    matakuliah: DataTypes.STRING,
    judul: DataTypes.STRING,
    isi: DataTypes.STRING,
    deadline: DataTypes.STRING,
    userId: DataTypes.INTEGER, // foreign key dari users
},{
    freezeTableName:true
});

export default Note;

(async()=>{
    await db.sync();
})();