var LivingCreature=require("./livingcreature")
 module.exports=class PosionedGrass extends LivingCreature{
    constructor(x, y) {
        this.x = x
        this.y = y
        this.multiply = 0
        this.directions = [
            [x - 1, y - 1],
            [x - 1, y],
            [x - 1, y + 1],
            [x, y - 1],
            [x, y + 1],
            [x + 1, y - 1],
            [x + 1, y],
            [x + 1, y + 1]
        ]
    }
    chooseCell(char) {

        let found = []
        for (let i in this.directions) {
            let x = this.directions[i][0]
            let y = this.directions[i][1]
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length && matrix[x][y] == char) {
                found.push(this.directions[i])
            }
        }
        return found
    }
    mul() {
        this.multiply++
        let emptyCells = this.chooseCell(0)
        let emptyCell = rand(emptyCells)
        if (this.multiply >= 4 && emptyCell) {
            let newX = emptyCell[0]
            let newY = emptyCell[1]
            matrix[newX][newY] = 4
            let toxic = new PosionedGrass(newX, newY)
            PosionedGrassArr.push(toxic)
            this.multiply = 0

        }

    }
    posion() {
        let predatorCells = this.chooseCell(3)
        let predatorCell = rand(predatorCells)
        if (predatorCell) {
            let newX = predatorCell[0]
            let newY = predatorCell[1]
            if (matrix[newX][newY] == 3) {
                matrix[newX][newY] = 4
                for (var i = 0; i < predatorArr.length; i++) {
                    if (newX == predatorArr[i].x && newY == predatorArr[i].y) {
                        predatorArr.splice(i, 1)
                        break
                    }
                }
            }
        }
    }
}
