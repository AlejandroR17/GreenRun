const express = require('express');

const app = express();

const distanceRoutes = require('./routes/distance');
const ipRoutes = require('./routes/ip');

app.use(express.urlencoded());

// Toda la lógica de la aplicación fue movida a sus respectivas rutas para mantener limpia y concisa la aplicación de entrada

app.use(distanceRoutes);
app.use(ipRoutes);

// Como último recurso, si no se logra acceder a ninguna de las rutas existentes, se hizo una sencilla página de error

app.use((req, res, next) => {
    res.status(404).send('<h1>Página no encontrada</h1>');
});


app.listen(3000);