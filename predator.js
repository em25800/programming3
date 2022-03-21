let LivingCreature = require('./LivingCreature')

module.exports = class Predator extends LivingCreature {
    constructor(x, y) {
        super(x, y);
        this.energy = 8
    }
    chooseCell(char1, char2) {
        super.getNewCoordinates()
        let found = []
        for (let i in this.directions) {
            let x = this.directions[i][0]
            let y = this.directions[i][1]
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[x][y] == char1 || matrix[x][y] == char2) {
                    found.push(this.directions[i])
                }
            }
        }
        return found
    }
    eat() {
        this.mul()
        let grassEaterCells = this.chooseCell(2)
        let grassEaterCell = rand(grassEaterCells)
        let tabletkaCells = this.chooseCell(5)
        let tabletkaCell = rand(tabletkaCells)
        if (grassEaterCell && this.energy > 0) {
            let newX = grassEaterCell[0]
            let newY = grassEaterCell[1]
            // if (matrix[newX][newY] == 2) {
            matrix[newX][newY] = 3
            matrix[this.x][this.y] = 0
            for (var i = 0; i < grassEaterArr.length; i++) {
                if (newX == grassEaterArr[i].x && newY == grassEaterArr[i].y) {
                    grassEaterArr.splice(i, 1)
                    break
                }

            }
            this.energy += 3
            this.x = newX
            this.y = newY
        } if (tabletkaCell && this.energy > 0) {
            this.energy += 25
            let newX = tabletkaCell[0]
            let newY = tabletkaCell[1]
            matrix[newX][newY] = 2
            matrix[this.x][this.y] = 0
            for (var i = 0; i < tabletkaCell.length; i++) {
                if (newX == tabletkaCell[i].x && newY == tabletkaCell[i].y) {
                    tabletkaCell.splice(i, 1)
                    break
                }
            }
            this.x = newX
            this.y = newY
        }
    }

    move() {
        let emptyCells = this.chooseCell(0, 1)
        let emptyCell = rand(emptyCells)
        if (emptyCell && this.energy > 0) {
            this.energy--
            let newX = emptyCell[0]
            let newY = emptyCell[1]
            matrix[newX][newY] = 2
            matrix[this.x][this.y] = 0
            this.x = newX
            this.y = newY
            return this.energy
        } if (this.energy <= 0) {
            this.die()

        }
    }

    mul() {
        if (this.energy >= 20) {
            let emptyCells = this.chooseCell(0)
            let emptyCell = rand(emptyCells)
            if (this.energy >= 12 && emptyCell) {
                let newX = emptyCell[0]
                let newY = emptyCell[1]
                matrix[newX][newY] = 3
                let great = new Predator(newX, newY)
                predatorArr.push(great)
                this.energy -= 8
            }

        }
    }
    die() {
        matrix[this.x][this.y] = 0
        for (let i = 0; i < predatorArr.length; i++) {
            if (this.x == predatorArr[i].x && this.y == predatorArr[i].y) {
                predatorArr.splice(i, 1)
            }
        }
    }


}