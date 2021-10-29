const express = require('express');
const request = require('request');

const router = express.Router();
const access_key = '5f53de73d71399d37c10a924668cb450';

// Guardamos en un objeto las coordenadas de Monserrate pues son las que siempre se usarán para hacer la comparación
// y encontrar la distancia que necesitamos responder

const monserrate = {
    "latitud": 4.604255341354443, 
    "longitud": -74.05532057505118
}

// Si se hace GET a esta dirección se le presenta al usuario un formulario para ingresar una IP y hacer el cálculo de la distancia
// hasta el teleférico de Monserrate

router.get('/distancia', (req, res, next) => {
    res.send('<h2>Ingrese la dirección IP para comparar su distancia hasta la entrada de Monserrate</h2><form action="/distancia" method="POST"><input type="text" name="ip"><button>Enviar</button></form>');
});

// Si se hace post, se toma la IP, se accede al API de IPStack para obtener la latitud y longitud relacionadas
// con la IP ingresada y así poder hacer el cálculo de la distancia

router.post('/distancia', (req, res, next) => {
    const ip = req.body.ip;
    request(`http://api.ipstack.com/${ip}?access_key=${access_key}&fields=latitude,longitude`, (error, response, body) => {
        if (!error && response.statusCode == 200) {
            let data = body.slice(1, -1);
            data = data.split(' ');
            const longitude = parseInt(data[1]);
            const latitude = parseInt(data[3]);
            let distancia = calculateDistance(latitude, longitude, monserrate.latitud, monserrate.longitud);
            res.send(`<h1>La distancia entre la IP ingresada (${ ip }) y la entrada al teleférico de Monserrate es de aproximadamente ${ distancia } kilómetros</h1>`);
        }
    })
});

// Implementación de la fórmula de Haversine para encontrar la menor distancia entre dos puntos ubicados en una esfera
// en este caso, la tierra

const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radio de la tierra en kilómetros
    const dLat = toRad(lat2 - lat1); // Se convierten la diferencia entre latitudes de grados a radianes en una función externa
    const dLon = toRad(lon2 - lon1);
    let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    let d = R * c;
    return d.toFixed(2);
}

// Función externa para convertir los datos que están en grados a radianes

const toRad = (degrees) => {
    return degrees * (Math.PI / 180);
}

module.exports = router;