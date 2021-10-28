function createCheckDigit(membershipId) {
    // Se crea el caso base de la función recursiva en que, si membershipId es menor a 10 es porque ya se encontró el dígito
    // que se debe retornar
    if (membershipId < 10) {
        return membershipId;
    } else {
        // En caso de que ese caso base no se cumpla, se llama la misma función pero ahora usando como argumento la sumatoria
        // de los dígitos del número previo cuyo valor fue mayor que 10
        return createCheckDigit(sumDigits(membershipId));
    }
}

// Se creó una función externa para hacer la sumatoria de los dígitos para mayor limpieza en el código
function sumDigits(value) {
    let sum = 0;
    while (value) {
        // Se usa la operación módulo 10 para obtener el último dígito del valor y sumarlo al valor de sum
        sum += value % 10;
        // Se divide el valor entre 10 para eliminar ese último dígito que ya se agregó a sum y poder seguir con el siguiente
        value = Math.floor(value / 10);
    }
    // Cuando ya se han sumado todos los dígitos se retorna el valor de la variable sum, o sea la sumatoria total
    return sum;
}

console.log(createCheckDigit("55555"));