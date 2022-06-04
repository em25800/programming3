side = 10
var socket = io()

function setup() {

    createCanvas(50 * side, 50 * side)
    frameRate(5)
    background("#acacac")
}function nkarel(){
//     for (var x = 0; x < matrix.length; x++) {
//         for (var y = 0; y < matrix[x].length; y++) {
//             if (matrix[x][y] == 1) {
//                 let gr = new Grass(x, y)
//                 grassArr.push(gr)
//             }
//             else if (matrix[x][y] == 2) {
//                 let great = new GrassEater(x, y)
//                 grassEaterArr.push(great)
//             }
//             else if (matrix[x][y] == 3) {
//                 let small = new Predator(x, y)
//                 predatorArr.push(small)
//             }
//             else if (matrix[x][y] == 4) {
//                 let toxic = new PosionedGrass(x, y)
//                 PosionedGrassArr.push(toxic)
//             }
//             else if (matrix[x][y] == 5) {
//                 let bomba = new EnergyTablet(x, y)
//                 tabletArr.push(bomba)
//             }
//         }
//     } 
//     socket.on("matrix")
// }

// function draw() {
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
    // for (let i in grassArr) {
    //     grassArr[i].mul()
    // }
    // for (let i in grassEaterArr) {
    //     grassEaterArr[i].eat()
    // }
    // for (let i in predatorArr) {
    //     predatorArr[i].eat()
    // }
    // for (let i in PosionedGrassArr) {
    //     PosionedGrassArr[i].mul()
    // }
    // for (let i in PosionedGrassArr) {
    //     PosionedGrassArr[i].posion()
    // }
    // for (let i in tabletArr) {
    //     tabletArr[i].mul()
    // }
    // for (let i in predatorArr) {
    //     predatorArr[i].die()
    // }
}
socket.on('send matrix', nkarel)