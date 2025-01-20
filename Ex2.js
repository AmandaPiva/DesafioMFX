
const matriz = [
    [5, 2, 3],
    [4, 8, 6],
    [7, 1, 9]
]

// Função para somar os elementos das linhas da matriz
function sumRows(matriz) {
    for (let i = 0; i < matriz.length; i++) { //Percorrendo linhas da matriz
        let soma = 0;
        for (var j = 0; j < matriz[i].length; j++) { //Percorrendo colunas da matriz
            soma += matriz[i][j]; //Somando os elementos da linha
        }
        console.log(`Soma da linha ${i}: ${soma}`);
    }
}

// Função para somar os elementos das colunas da matriz
function sumColumns(matriz) {
    for (let j = 0; j < matriz[0].length; j++) { //acessando a primeira linha da matriz retornando o numero de colunas
        let soma = 0;
        for (var i = 0; i < matriz.length; i++) { //Percorrendo as linhas da matriz
            soma += matriz[i][j]; //Somando os elementos da coluna
        }
        console.log(`Soma da coluna ${j}: ${soma}`);
    }
}

// Função para somar os elementos da diagonal principal da matriz
function diagonalPrincipal(matriz) {
    let soma = 0;
    //verifica se o número de linhas é igual ao número de colunas
    if (matriz.length !== matriz[0].length) {
        console.log("Não foi possível calcular a diagonal principal! Matriz não é quadrada.");
        return;
    }

    for (let i = 0; i < matriz.length; i++) {
        soma += matriz[i][i]; //Soma dos elementos na posição linha e coluna a cada iteração do loop
    }
    console.log(`Soma da diagonal principal: ${soma}`);
}

// Função para somar os elementos da diagonal secundária da matriz
function diagonalSecundaria(matriz) {
    let soma = 0;

    //verifica se o número de linhas é igual ao número de colunas
    if (matriz.length !== matriz[0].length) {
        console.log("Não foi possível calcular a diagonal secundária! Matriz não é quadrada.");
        return;
    }

    for (let i = 0; i < matriz.length; i++) {
        soma += matriz[i][matriz.length - 1 - i]; //Subtraindo o indice para acessar o ultimo elemento da linha e somar a cada iteração
    }
    console.log(`Soma da diagonal secundária: ${soma}`);
}

// Função para processar a matriz e calcular as somas
function processMatriz(matriz) {
    return {
        sumRows: sumRows(matriz),
        sumColumns: sumColumns(matriz),
        diagonalPrincipal: diagonalPrincipal(matriz),
        diagonalSecundaria: diagonalSecundaria(matriz)
    }
}

processMatriz(matriz);
