class Grass {
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
        if (this.multiply >= 8 && emptyCell) {
            let newX = emptyCell[0]
            let newY = emptyCell[1]
            matrix[newX][newY] = 1
            let gr = new Grass(newX, newY)
            grassArr.push(gr)
            this.multiply = 0
        }
    }
}
class GrassEater {
    constructor(x, y) {
        this.x = x
        this.y = y
        this.energy = 8
        this.directions = []
    }
    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y - 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y - 1],
            [this.x + 1, this.y],
            [this.x + 1, this.y + 1]
        ]
    }

    chooseCell(char1) {
        this.getNewCoordinates()
        let found = []
        for (let i in this.directions) {
            let x = this.directions[i][0]
            let y = this.directions[i][1]
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length && matrix[x][y] == char1) {
                found.push(this.directions[i])
            }
        }
        return found
    }
    move() {
        let emptyCells = this.chooseCell(0)
        let emptyCell = rand(emptyCells)
        if (emptyCell && this.energy > 0) {
            this.energy--
            let newX = emptyCell[0]
            let newY = emptyCell[1]
            matrix[newX][newY] = 2
            matrix[this.x][this.y] = 0
            this.x = newX
            this.y = newY
        } else if (this.energy <= 0) {
            this.die()
        }
    }
    eat() {
        this.mul()
        let grassCells = this.chooseCell(1)
        let grassCell = rand(grassCells)
        let posionedGrassCells = this.chooseCell(4)
        let posionedGrassCell = rand(posionedGrassCells)
        let tabletkaCells = this.chooseCell(5)
        let tabletkaCell = rand(tabletkaCells)
        if (grassCell && this.energy > 0) {
            this.energy += 5
            let newX = grassCell[0]
            let newY = grassCell[1]
            matrix[newX][newY] = 2
            matrix[this.x][this.y] = 0
            for (var i = 0; i < grassArr.length; i++) {
                if (newX == grassArr[i].x && newY == grassArr[i].y) {
                    grassArr.splice(i, 1)
                }
            }
            this.x = newX
            this.y = newY
        } if (posionedGrassCell && this.energy > 0) {
            this.energy++
            let newX = posionedGrassCell[0]
            let newY = posionedGrassCell[1]
            matrix[newX][newY] = 3
            matrix[this.x][this.y] = 0
            for (var i = 0; i < PosionedGrassArr.length; i++) {
                if (newX == PosionedGrassArr[i].x && newY == PosionedGrassArr[i].y) {
                    PosionedGrassArr.splice(i, 1)
                }
            }
            this.energy++
            this.x = newX
            this.y = newY
            return this.energy
        } if (tabletkaCell && this.energy > 0) {
            this.energy += 25
            let newX = tabletkaCell[0]
            let newY = tabletkaCell[1]
            matrix[newX][newY] = 2
            matrix[this.x][this.y] = 0
            for (var i = 0; i < tabletkaCell.length; i++) {
                if (newX == tabletkaCell[i].x && newY == tabletkaCell[i].y) {
                    tabletkaCell.splice(i, 1)
                }
            }
            this.x = newX
            this.y = newY
        } else this.move()


    }

    mul() {
        let emptyCells = this.chooseCell(0)
        let emptyCell = rand(emptyCells)
        if (this.energy >= 12 && emptyCell) {
            let newX = emptyCell[0]
            let newY = emptyCell[1]
            matrix[newX][newY] = 2
            let great = new GrassEater(newX, newY)
            grassEaterArr.push(great)
            this.energy -= 8
        }
    }
    die() {
        matrix[this.x][this.y] = 0
        for (let i = 0; i < grassEaterArr.length; i++) {
            if (this.x == grassEaterArr[i].x && this.y == grassEaterArr[i].y) {
                grassEaterArr.splice(i, 1)
            }
        }
    }
}
class Predator {
    constructor(x, y) {
        this.x = x
        this.y = y
        this.energy = 15
        this.directions = []
    }

    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y - 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y - 1],
            [this.x + 1, this.y],
            [this.x + 1, this.y + 1]
        ]
    }

    chooseCell(char1, char2) {
        this.getNewCoordinates()
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
                }

            }
            this.energy += 3
            this.x = newX
            this.y = newY
        }if (tabletkaCell && this.energy > 0) {
            this.energy += 25
            let newX = tabletkaCell[0]
            let newY = tabletkaCell[1]
            matrix[newX][newY] = 2
            matrix[this.x][this.y] = 0
            for (var i = 0; i < tabletkaCell.length; i++) {
                if (newX == tabletkaCell[i].x && newY == tabletkaCell[i].y) {
                    tabletkaCell.splice(i, 1)
                }
            }
            this.x = newX
            this.y = newY
        } else this.move()


        // } 
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
// class Vochxar {
//     constructor(x, y) {
//         this.x = x
//         this.y = y
//         this.bomb = 8
//         this.directions = []
//     }

//     getNewCoordinates() {
//         this.directions = [
//             [this.x, this.y],
//             [this.x + 1, this.y],
//             [this.x + 1, this.y + 1],
//             [this.x, this.y + 1],
//             [this.x - 1, this.y + 1],
//             [this.x - 1, this.y],
//             [this.x - 1, this.y - 1],
//             [this.x, this.y - 1],
//             [this.x + 1, this.y - 1],
//             [this.x + 2, this.y],
//             [this.x + 2, this.y + 1],
//             [this.x + 2, this.y + 2],
//             [this.x + 1, this.y + 2],
//             [this.x, this.y + 2],
//             [this.x - 1, this.y + 2],
//             [this.x - 2, this.y + 2],
//             [this.x - 2, this.y + 1],
//             [this.x - 2, this.y],
//             [this.x - 2, this.y - 1],
//             [this.x - 2, this.y - 2],
//             [this.x - 1, this.y - 2],
//             [this.x, this.y - 2],
//             [this.x + 1, this.y - 2],
//             [this.x + 2, this.y - 2]
//         ]
//     }

//     chooseCell(char1, char2, char3, char4, char5) {
//         this.getNewCoordinates()
//         let found = []
//         for (let i in this.directions) {
//             let x = this.directions[i][0]
//             let y = this.directions[i][1]
//             if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
//                 if (matrix[x][y] == char1 || matrix[x][y] == char2 || matrix[x][y] == char3 || matrix[x][y] == char4 || matrix[x][y] == char5) {
//                     found.push(this.directions[i])
//                 }
//             }
//         }
//         return found
//     }
//     boom() {
//         let cells = this.chooseCell(1, 2, 3, 4, 5)
//         let cell = rand(cells)
//         if (cell) {
//             let newX = cell[0]
//             let newY = cell[1]
//             matrix[newX][newY] = 5
//             matrix[this.x][this.y] = 0
//             for (var i = 0; i < vochxarArr.length; i++) {
//                 if (newX == grassArr[i].x && newY == grassArr[i].y) {
//                     grassArr.splice(i, 1)
//                 }
//                 for (var i = 0; i < vochxarArr.length; i++) {
//                     if (newX == grassEaterArr[i].x && newY == grassEaterArr[i].y) {
//                         grassEaterArr.splice(i, 1)
//                     }
//                 } for (var i = 0; i < vochxarArr.length; i++) {
//                     if (newX == predatorArr[i].x && newY == predatorArr[i].y) {
//                         predatorArr.splice(i, 1)
//                     }
//                 }
//                 for (var i = 0; i < vochxarArr.length; i++) {
//                     if (newX == PosionedGrassArr[i].x && newY == PosionedGrassArr[i].y) {
//                         PosionedGrassArr.splice(i, 1)
//                     }
//                 }

//             }
//             this.x = newX
//             this.y = newY
//         }
//     }
// }
class PosionedGrass {
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
class EnergyTablet {
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
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[x][y] == char)
                    found.push(this.directions[i])
            }
        }
        return found
    }

    mul() {
        this.multiply++
        let cellllls = this.chooseCell(0)
        let celllll = rand(cellllls)
        if (this.multiply >= 25 && celllll) {
            let newX = celllll[0]
            let newY = celllll[1]
            matrix[newX][newY] = 5
            let aaa = new EnergyTablet(newX, newY)
            tabletArr.push(aaa)
            this.multiply = 0
        }
    }
}