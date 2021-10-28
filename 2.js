function removeProperty(obj, prop) {
    // Revisar si el objeto contiene la propiedad prop que llega como argumento a la función
    if (obj.hasOwnProperty(prop)) {
        // Si el objeto tiene la propiedad prop, le quita dicha propiedad y retorna verdadero
        delete(obj[prop]);
        return true;
    }
    // Si el programa llega hasta aquí es porque el objeto no tiene la propiedad prop, por tanto sólo retorna verdadero
    return true;
}

