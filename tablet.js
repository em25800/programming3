var LivingCreature= require("./predator")
module.exports=class EnergyTablet extends LivingCreature {
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