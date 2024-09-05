const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const cors = require('cors');

const app = express();
app.use(cors());

const url = 'mongodb://localhost:27017'; // Reemplaza con tu conexión
const dbName = 'tu_base_de_datos'; // Reemplaza con el nombre de tu base de datos
let db;

MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
  if (err) throw err;
  db = client.db(dbName);
});

app.get('/data', async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const documents = await db.collection('tu_coleccion').find().skip(skip).limit(limit).toArray();
  res.json(documents);
});

app.listen(3000, () => {
  console.log('Servidor escuchando en el puerto 3000');
});
