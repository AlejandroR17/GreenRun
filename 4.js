function getInParallel(apiCalls) {
    // Usando el método de map vamos a recorrer el array de llamadas y a poblar un nuevo array con las promesas de dichas
    // llamadas
    let promiseArr = apiCalls.map((funct) => {
        return funct();
    })
    // Usando el método all de Promise retornamos una promesa única que nos resuelva un array con las respuestas de todas
    // las promesas que pasamos en el array promiseArr
    return Promise.all(promiseArr).then((res) => {
        return res;
    })
}
  
let promise = getInParallel([() => Promise.resolve("First API call!"),
                             () => Promise.resolve("Second API call!")]);
if(promise) {
    promise.then((result) => console.log(result)).catch((err) => console.log(err));
}


module.exports.getInParallel = getInParallel;