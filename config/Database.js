// import { Sequelize } from "sequelize";

// const db = new Sequelize('notes-fadhil','root', '',{

//     host: 'localhost',
//     dialect: 'mysql'
// } );

// export default db;
// import { Sequelize } from "sequelize";
// import dotenv from "dotenv";

// dotenv.config();

// const {
//   DB_HOST: host,
//   DB_USERNAME: username,
//   DB_PASSWORD: password,
//   DB_NAME: database,
// } = process.env;

// const db = new Sequelize(database, username, password, {
//   host,
//   dialect: "mysql",
// });

// export default db;

import { Sequelize } from "sequelize";
import dotenv from "dotenv";
import path from "path";

<<<<<<< HEAD
dotenv.config({ path: path.resolve(process.cwd(), "../.env") });  // naik satu folder

const {
  DB_HOST: host,
  DB_USERNAME: username,
  DB_PASSWORD: password,
  DB_NAME: database,
} = process.env;

console.log("DB_HOST:", host);
console.log("DB_USERNAME:", username);
console.log("DB_PASSWORD:", password);
console.log("DB_NAME:", database);


const db = new Sequelize(database, username, password, {
  host,
  dialect: "mysql",
});

export default db;
=======
const db = new Sequelize('RECOVER_YOUR_DATA','root', '',{

    host: '35.202.137.184',
    dialect: 'mysql'
} );
>>>>>>> 25bda538749f540e11faf7651d4ad2c65463999d

