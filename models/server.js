const express = require("express");
const cors = require("cors");

const { dbConnection } = require("../database/config.db");

class Server {
  constructor() {
    this.port = process.env.PORT;
    this.app = express();

    this.paths = {
      user: "/api/user",
      search: "/api/search",
      auth: "/api/auth",
      category: "/api/category",
      product: "/api/product",
    };

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
    this.app.use(this.paths.user, require("../routes/user.routes"));
    this.app.use(this.paths.auth, require("../routes/auth.routes"));
    this.app.use(this.paths.category, require("../routes/category.routes"));
    this.app.use(this.paths.product, require("../routes/product.routes"));
    this.app.use(this.paths.search, require("../routes/search.routes"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Server corriendo en el pueto: ", this.port);
    });
  }
}

module.exports = Server;
