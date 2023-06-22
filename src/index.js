import express from 'express';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import mysql from 'mysql';
import cors from 'cors';

const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));

app.set("views", join(__dirname, '/views'));
app.set("view engine", 'ejs');

app.get('/', (req, res) => res.render('index'));

app.use(express.static(join(__dirname, 'public')));

app.use(express.json());
app.use(cors());

const conexion = mysql.createConnection({
    host: "127.0.0.1",
    user: "alex",
    password: "123456",
    database: "formulario"
  });

conexion.connect(function (error) {
  if (error) {
    throw error;
  } else {
    console.log("Conexión exitosa");
  }
});

const puerto = process.env.PUERTO || 3000;

app.listen(
  puerto, function () {
    console.log("Servidor funcionando en puerto: " + puerto);
  }
);

app.post("/api/personas", (req, res) => {
  let data = {
    nombres: req.body.NOMBRES,
    email: req.body.EMAIL,
    celular: req.body.CELULAR,
    msg: req.body.MSG
  };
  let sql = "INSERT INTO personas SET ?";
  conexion.query(sql, data, function (error, results) {
    if (error) {
      throw error;
    } else {
      console.log(data);
      res.send(data);
    }
  });
});

//Fecha civica

app.get("/api/fechas_civicas", function(req, res) {
  var sql = "SELECT * FROM fechas_civicas WHERE FECHA = CURDATE()";
  conexion.query(sql, function(error, results) {
      if (error) {
          throw error;
      } else {
          res.json(results);
      }
  });
});