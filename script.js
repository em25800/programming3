var side = 10;
function rand(arr) {
    return arr[Math.floor(Math.random() * arr.length)]
}
var socket = io();
function setup() {
    createCanvas(50 * side, 50 * side)
    frameRate(5)
    background("#acacac")
}
function nkarel(matrix) {
    var colors = ["#ff0000", "#9dff00", "#0044ff", "#ff00c3", "#634747"]
    var color1 = rand(colors)
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
    
    
}socket.on('send matrix',nkarel)