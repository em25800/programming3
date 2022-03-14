let grassArr = []
let grassEaterArr = []
let predatorArr = []
let PosionedGrassArr = []
let vochxarArr = []
let tabletArr = []
let matrix = []
// let matrix = [
//     [2, 3, 1, 1, 0, 1, 1, 1, 0, 0, 1, 2, 0, 1, 0, 3, 1, 3, 1, 3],
//     [0, 2, 3, 1, 2, 0, 1, 2, 0, 0, 1, 0, 2, 3, 1, 1, 3, 0, 3, 3],
//     [0, 0, 1, 1, 2, 2, 3, 1, 2, 2, 0, 1, 3, 1, 1, 0, 3, 2, 0, 0],
//     [3, 2, 2, 0, 3, 0, 3, 1, 0, 1, 0, 1, 3, 1, 1, 2, 2, 0, 0, 0],
//     [2, 2, 0, 2, 3, 5, 0, 1, 3, 1, 2, 0, 0, 3, 3, 1, 2, 0, 0, 3],
//     [2, 2, 1, 2, 0, 3, 1, 1, 2, 0, 2, 2, 0, 1, 0, 0, 2, 3, 1, 1],
//     [1, 0, 3, 1, 1, 1, 1, 3, 1, 3, 2, 3, 0, 3, 1, 3, 3, 0, 1, 3],
//     [2, 0, 1, 0, 1, 3, 2, 1, 2, 1, 0, 3, 0, 3, 0, 2, 1, 1, 1, 0],
//     [2, 1, 2, 3, 0, 2, 3, 3, 1, 0, 3, 0, 3, 2, 2, 1, 0, 0, 3, 0],
//     [3, 0, 2, 5, 2, 2, 2, 0, 4, 0, 0, 1, 0, 1, 1, 1, 3, 0, 3, 3],
//     [3, 3, 0, 1, 3, 0, 1, 3, 0, 3, 1, 3, 0, 2, 3, 1, 2, 1, 0, 2],
//     [1, 1, 3, 2, 1, 3, 3, 3, 1, 2, 1, 0, 0, 0, 1, 0, 2, 2, 1, 3],
//     [3, 0, 0, 3, 1, 3, 2, 0, 1, 0, 1, 1, 3, 0, 1, 0, 3, 3, 3, 1],
//     [1, 2, 3, 0, 1, 0, 2, 2, 0, 3, 0, 1, 2, 1, 3, 1, 1, 1, 2, 3],
//     [0, 2, 1, 0, 3, 0, 1, 2, 3, 0, 1, 0, 3, 1, 0, 3, 2, 3, 0, 0],
//     [1, 2, 3, 3, 1, 2, 0, 0, 0, 0, 2, 2, 1, 2, 1, 2, 1, 0, 1, 3],
//     [3, 1, 0, 3, 3, 1, 3, 0, 1, 0, 1, 1, 2, 0, 0, 1, 2, 1, 3, 0],
//     [1, 1, 3, 0, 0, 1, 3, 2, 2, 2, 3, 1, 2, 3, 0, 1, 1, 1, 0, 2],
//     [1, 3, 0, 2, 3, 2, 2, 1, 0, 0, 0, 3, 1, 0, 2, 3, 1, 0, 3, 0],
//     [1, 3, 3, 3, 0, 2, 0, 2, 0, 0, 0, 2, 2, 2, 2, 0, 1, 3, 1, 0],
// ]
function matrixGen(n, gr, grEat, predator, posion, tabletka) {
    for (let x = 0; x < n; x++) {
        matrix[x] = []
        for (let y = 0; y < n; y++) {
            matrix[x][y] = 0
        }
    }

    for (let i = 0; i < gr; i++) {
        let x = Math.floor(Math.random() * n)
        let y = Math.floor(Math.random() * n)

        if (matrix[x][y] == 0) {
            matrix[x][y] = 1
        } else {
            i--
        }
    }

    for (let i = 0; i < grEat; i++) {
        let x = Math.floor(Math.random() * n)
        let y = Math.floor(Math.random() * n)

        if (matrix[x][y] == 0) {
            matrix[x][y] = 2
        } else {
            i--
        }
    }
    for (let i = 0; i < predator; i++) {
        let x = Math.floor(Math.random() * n)
        let y = Math.floor(Math.random() * n)

        if (matrix[x][y] == 0) {
            matrix[x][y] = 3
        } else {
            i--
        }

    }
    for (let i = 0; i < posion; i++) {
        let x = Math.floor(Math.random() * n)
        let y = Math.floor(Math.random() * n)

        if (matrix[x][y] == 0) {
            matrix[x][y] = 4
        } else {
            i--
        }
    }
    for (let i = 0; i < tabletka; i++) {
        let x = Math.floor(Math.random() * n)
        let y = Math.floor(Math.random() * n)

        if (matrix[x][y] == 0) {
            matrix[x][y] = 5
        } else {
            i--
        }
    }
    return matrix
}
var n
var a=prompt("enter matrix length")
var b=prompt("enter grass number")
var c=prompt("enter grass eater number")
var d=prompt("enter predator number")
var e=prompt("enter poisoned grass number")
var f=prompt("enter tablet number")

matrixGen(a,b,c,d,e,f)
function rand(arr) {
    return arr[Math.floor(Math.random() * arr.length)]
}




let side = 10
function setup() {

    createCanvas(matrix[0].length * side, matrix.length * side)
    frameRate(5)
    background("#acacac")

    for (var x = 0; x < matrix.length; x++) {
        for (var y = 0; y < matrix[x].length; y++) {
            if (matrix[x][y] == 1) {
                let gr = new Grass(x, y)
                grassArr.push(gr)
            }
            else if (matrix[x][y] == 2) {
                let great = new GrassEater(x, y)
                grassEaterArr.push(great)
            }
            else if (matrix[x][y] == 3) {
                let small = new Predator(x, y)
                predatorArr.push(small)
            }
            else if (matrix[x][y] == 4) {
                let toxic = new PosionedGrass(x, y)
                PosionedGrassArr.push(toxic)
            }
            else if (matrix[x][y] == 5) {   
                let bomba = new EnergyTablet(x, y)
                tabletArr.push(bomba)
            }
        }
    }

    // setInterval(() => {
    //     let x = Math.floor(Math.random() * 10)
    //     let y = Math.floor(Math.random() * 10)
    //     new Vochxar(x, y)
    // }, 300);
}

function draw() {
    var colors = ["#ff0000", "#9dff00", "#0044ff", "#ff00c3", "#634747"]
    var color1 = rand(colors)
    // console.log(color1);
    for (var x = 0; x < matrix.length; x++) {
        for (var y = 0; y < matrix[x].length; y++) {
            if (matrix[x][y] == 0) {
                fill("#acacac")
            }
            else if (matrix[x][y] == 1) {
                fill("green")
            }
            else if (matrix[x][y] == 2) {
                fill("yellow")
            }
            else if (matrix[x][y] == 3) {
                fill("red")
            }
            else if (matrix[x][y] == 4) {
                fill("brown")
            }
            else if (matrix[x][y] == 5) {
                fill(color1)
            }
            rect(y * side, x * side, side, side)
        }
    }
    for (let i in grassArr) {
        grassArr[i].mul()
    }
    for (let i in grassEaterArr) {
        grassEaterArr[i].eat()
    }
    for (let i in predatorArr) {
        predatorArr[i].eat()
    }
    for (let i in PosionedGrassArr) {
        PosionedGrassArr[i].mul()
    }
    for (let i in PosionedGrassArr) {
        PosionedGrassArr[i].posion()
    }
    for (let i in tabletArr) {
        tabletArr[i].mul()
    }
    for (let i in predatorArr) {
        predatorArr[i].die()
    }
}
