//Նայիր, եթե ուզում ես օգտվել որևէ մոդուլից, չպետք է մոռանաս require անել այն
// Այստեղ մենք պետք է օգտվենք LivingCreature մոդուլից , այդ պատճառով գրում ենք ներքևի տողը:
let LivingCreature = require('./LivingCreature')

// Grass մոդուլը էքսպորտ ենք անում
module.exports = class Grass extends LivingCreature{
   
    mul() {
        this.multiply++;
        if (this.multiply >= 5) {
            let emptyCells = super.chooseCell(0)
            //չմոռանաս , որ P5 գրադարանի random ֆունկցիան սերվերը չի հասկանում
            //դա ուղղելու համար կգրենք Math.floor(Math.random() * ինչՈրԶանգված.length)
            let newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]
            if (this.multiply >= 5 && newCell) {
                let x = newCell[0]
                let y = newCell[1]
                var gr = new Grass(x, y, 1)
                grassArr.push(gr)
                this.multiply = 0;
            }
        }
    }
}