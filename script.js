let grassArr = []
let grassEaterArr = []
let predatorArr = []
let PosionedGrassArr = []
let vochxarArr = []
let tabletArr = []
let matrix = []
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
var a=50
var b=Math.floor(Math.random() * a)
var c=Math.floor(Math.random() * a)
var d=Math.floor(Math.random() * a)
var e=Math.floor(Math.random() * a)
var f=Math.floor(Math.random() * a)

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
