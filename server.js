var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var fs = require("fs");
// io.sockets.emit(io())
app.use(express.static("."));

app.get('/', function (req, res) {
    res.redirect('index.html');
});
server.listen(3000);
matrix = []
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
console.log(matrix);
var n
var a = 50
var b = Math.floor(Math.random() * a)
var c = Math.floor(Math.random() * a)
var d = Math.floor(Math.random() * a)
var e = Math.floor(Math.random() * a)
var f = Math.floor(Math.random() * a)
matrixGen(a, b, c, d, e, f)
io.sockets.emit('send matrix', matrix)
grassArr=[]
grassEaterArr = []
predatorArr = []
PosionedGrassArr = []
tabletArr = []
Grass = require("./GrASS")
GrassEater = require("./grASSeater")
PosionedGrass = require("./poison")
Predator = require("./predator")
tabletka = require("./tablet")
function createObject(matrix) {
    for (var x = 0; x < matrix; x++) {
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
                let bomba = new tabletka(x, y)
                tabletArr.push(bomba)
            }
        }
    }
    io.sockets.emit('send matrix', matrix)
}
function game() {
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
    io.sockets.emit("send matrix", matrix);
}
setInterval(game, 1000)
io.on('connection', function (socket) {
    createObject(matrix)
})

function kill() {
    grassArr = [];
    grassEaterArr = []
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            matrix[y][x] = 0;
        }
    }
    io.sockets.emit("send matrix", matrix);
}


function addGrass() {
    for (var i = 0; i < 7; i++) {
        var x = Math.floor(Math.random() * matrix[0].length)
        var y = Math.floor(Math.random() * matrix.length)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 1
            var gr = new Grass(x, y, 1)
            grassArr.push(gr)
        }
    }
    io.sockets.emit("send matrix", matrix);
}
function addGrassEater() {
    for (var i = 0; i < 7; i++) {
        var x = Math.floor(Math.random() * matrix[0].length)
        var y = Math.floor(Math.random() * matrix.length)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 2
            grassEaterArr.push(new GrassEater(x, y, 2))
        }
    }
    io.sockets.emit("send matrix", matrix);
}



io.on('connection', function (socket) {
    createObject(matrix);
    socket.on("kill", kill);
    socket.on("add grass", addGrass);
    socket.on("add grassEater", addGrassEater);
});


var statistics = {};

setInterval(function () {
    statistics.grass = grassArr.length;
    statistics.grassEater = grassEaterArr.length;
    fs.writeFile("statistics.json", JSON.stringify(statistics), function () {
        console.log("send")
    })
}, 1000)