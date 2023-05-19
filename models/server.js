const express = require("express");
const cors = require("cors");

const { dbConnection } = require("../database/config.db");

class Server {
  constructor() {
    this.port = process.env.PORT;
    this.app = express();
    this.user_path = "/api/user";

    //Conexion a BD
    this.conectarDB();

    //Middlewares
    this.middlewares();

    //Rutas de mi aplicación
    this.routes();
  }

  async conectarDB() {
    await dbConnection();
  }

  middlewares() {
    //Cors
    this.app.use(cors());

    //LEctura y parseo del body
    this.app.use(express.json());

    //Directorio publico
    this.app.use(express.static("public"));
  }

  routes() {
    this.app.use(this.user_path, require("../routes/user.routes"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Server corriendo en el pueto: ", this.port);
    });
  }
}

module.exports = Server;
