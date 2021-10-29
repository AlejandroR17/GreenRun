const express = require('express');
const request = require('request');

const router = express.Router();
const access_key = '5f53de73d71399d37c10a924668cb450';

// Cuando se accede al directorio base de la aplicación se verifica que exista la ip entre los query params, si no existe
// se le muestra al usuario un texto informativo de cómo se debe utilizar la plataforma

router.use((req, res, next) => {
    let ip = req.query.ip;
    if (!ip) {
        res.send('<h1>Para encontrar las coordenadas relacionadas con una dirección IP se debe acceder a este mismo sitio pero pasando la IP como parámetro en la URL misma, de modo que quede /?ip=[Dirección IP]</h1>');
    }

    // Si el usuario sí ingresa una IP en los query params entonces se accede a la API de IPStack para buscar su ubicación
    // a través de esta y, asimismo, se le muestra esta información al usuario
    request(`http://api.ipstack.com/${ip}?access_key=${access_key}&fields=latitude,longitude`, (error, response, body) => {
        if (!error && response.statusCode == 200) {
            // Aparentemente el API retorna un objeto pero en verdad es un string que parece un objeto, por tanto lo cortamos
            // para eliminar las llaves exteriores
            let data = body.slice(1, -1);
            // Separamos el string por los espacios para quedar con un array de 4, las dos llaves llamadas latitud y longitud
            // y sus correspondientes valores
            data = data.split(' ');
            // Tomamos el segundo y cuarto elemento que corresponden precisamente a los valores de longitud y latitud respectivamente
            const longitude = data[1];
            const latitude = data[3];
            res.send(`<h1>De acuerdo a la IP ingresada: ${ ip }
            <h3>La latitud es igual a: ${ latitude }</h3>
            <h3>La longitud es igual a: ${ longitude }</h3>`);
        }
    })
});

module.exports = router;