// Se hace uso de paréntesis para agrupar términos y que las operaciones se hagan en el orden que requerimos en la función,
// en este caso, primero la suma y después la división.

function average(a, b) {
    return (a + b) / 2;
}

console.log(average(2, 1));

module.exports = average;