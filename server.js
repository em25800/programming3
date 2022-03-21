//առաջին 10 տողը նույնությամբ գրիր, որպեսզի լոկալհոստ ունենաս
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var fs = require("fs");
const Predator = require('./predator');

app.use(express.static("."));

app.get('/', function (req, res) {
    res.redirect('index.html');
});
server.listen(3000);

//10

//քո սկրիպտ ֆայլից տպի մատրիցդ գեներացնոլու հատվածը և դատարկ զանգվածը
// ինձ մոտ այն չի գեներացվում,,,քեզ մոտ լաաաավ կլինի , որ գեներացվի

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

//այստեղ քո պատրաստի թվերով լցված զանգվածը ուղարկում ես կլիենտին:
//սոքեթի emit մեթոդը թույլ է տալիս առաջին արգումենտով ստեղծել իվենթի անունը, 
//2-րդ արգումենտով ուղղարկել տվյալը, այն ինչ ուզում ես ուղարկել

    io.sockets.emit('send matrix', matrix)
    
// հիմա գնա կլիենտի ֆայլ

//.........................................լոադինգ

//եթե գնացիր ու ամենինչ գրեցիր, արի էստեղ, դեռ անելիք ունենք

//էստեղ բեր քո գազանիկների դատարկ զանգվածները
let grassArr = []
let grassEaterArr = []
let predatorArr = []
let PosionedGrassArr = []
let vochxarArr = []
let tabletArr = []
let matrix = []
    //քանի որ քո կլասս-երը արդեն մոդուլներ են և ոչ մի կապ չունեն html ֆայլիդ հետ՝
    //այլ աշխատում են սերվերի վրա:
    //Դու պետք է նրանց իմպորտ անես: Ինձ մոտ նրանք երկուսն են, քեզ մոտ ավելի շատ
     Grass = require("./GrASS")
     GrassEater = require("./grASSeater")
     PosionedGrass = require("./poison")
     Predator = require("./predator")
     tabletka=require("./tablet")



    //Այժմ լցնենք մատրիցը օբյեկտներով
    //սարքի մի հատ ֆունկցիա օրինակ createObject անունով
    //և էստեղ բեր քո սկրիպտ ֆայլի օբյեկտներով լցնող հատվածը
    function createObject(matrix) {
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
        
        // և կրկին ուղարկի կլիենտիդ: 
        //չմոռանաս , որ emit-ը տվյալ ուղարկողն է, իսկ on-ը ստացողը և կատարողը
        //այս դեպքում 2-րդ արգումենտը տվյալն է
        io.sockets.emit('send matrix', matrix)


    }


    //հիմա անցնենք նրանց վայրենի գործունեությանը
    //որևէ անունով կոչիր ֆունկցիադ և մեջը դիր մեթոդների հատվածը:

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
        //այո, դու ճիշտ ես տեսնում, կրկին և կրկին
        io.sockets.emit("send matrix", matrix);
    }

    //մեր խաղի շարժը լինելու է 1 վարկյանը մեկ
    setInterval(game, 1000)
    


      // մինչև այժմ մենք ինքներս էինք դնում իվենթների անուննները, 
      //օրինակ send matrix կամ ըըը... էլ չկա :D
      // էստեղ connection պատրասի իվենթի անուն է, որը աշխատում է այն ժամանակ, 
      //երբ որևէ մեկը աշխատացնում է սերվերը՝ մտնում է սերվեր
      //և մենք դեռ չէինք կանչել createObject ֆունկցիան
      // էստեղ կկանչենք )))
io.on('connection', function (socket) {
    createObject(matrix)
})

//դե ինչ այսօր այսքանը:

//ինձ համար շատ կարևոր է , որ հենց դու շատ լավ հասկանաս էս 
//ամենը ու լինես լավագույնը քո ընտրած ոլորտում:



//Գիտեմ, որ լիիիիիքը սխալ կա մեջը: Դուք ճիշտը գրեք :PPPPP