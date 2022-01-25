var score = 0;
var fortunerGroup, carGroup, busGroup, truckGroup
var gamestate = 1
var winScreen


function preload() {
    backgroundImg = loadImage("images/road img.jpg")

    backgroundImg2 = loadImage("images/gameover.png")

    duckImg = loadImage("images/duck.png")

    fortunerImg = loadImage("images/fortuner.png")

    carImg = loadImage("images/car.png")

    truckImg = loadImage("images/truck.png")

    busImg = loadImage("images/schoolbus.png")

    coinImg = loadImage("images/coin.png")

    winScreenImg = loadImage("images/winScreen.jpg")
 }

function setup() {
    createCanvas(displayWidth, displayHeight);

    bg = createSprite(displayWidth / 2, displayHeight / 2 - 170)
    bg.addImage(backgroundImg)
    bg.scale = 2.34

    duck = createSprite(displayWidth / 2, displayHeight / 2 - 110)
    duck.addImage(duckImg)
    duck.scale = 0.08
    duck.setCollider("circle",  0 , 0 , 420 )


    carGroup = createGroup()
    truckGroup = createGroup();
    busGroup = createGroup()
    fortunerGroup = createGroup();
    coinGroup = createGroup();
}

function draw() {

    background(0);

    
    if (gamestate === 1) {

        ran = round(random(1, 4))

        createCoin()

        if (ran == 1) {
            createBus();
        }
        if (ran == 2) {
            createFortuner();
        }
        if (ran == 3) {
            createCar()
        }
        if (ran == 4) {
            createTruck();
        }


        if (carGroup.isTouching(busGroup)) {
            for (var i = 0; i < carGroup.length; i++) {

                if (carGroup[i].isTouching(busGroup)) {
                    carGroup[i].destroy()
                    busGroup[i].destroy()

                }
            }
        }
        if (carGroup.isTouching(truckGroup)) {
            for (var i = 0; i < carGroup.length; i++) {

                if (carGroup[i].isTouching(truckGroup)) {
                    carGroup[i].destroy()

                }
            }
        }

        if (carGroup.isTouching(fortunerGroup)) {
            for (var i = 0; i < carGroup.length; i++) {

                if (carGroup[i].isTouching(fortunerGroup)) {
                    carGroup[i].destroy()

                }
            }
        }

        if (fortunerGroup.isTouching(busGroup)) {
            for (var i = 0; i < fortunerGroup.length; i++) {

                if (fortunerGroup[i].isTouching(busGroup)) {
                    fortunerGroup[i].destroy()

                }
            }
        }
        if (fortunerGroup.isTouching(truckGroup)) {
            for (var i = 0; i < fortunerGroup.length; i++) {

                if (fortunerGroup[i].isTouching(truckGroup)) {
                    fortunerGroup[i].destroy()


                }
            }
        }
        if (busGroup.isTouching(truckGroup)) {
            for (var i = 0; i < busGroup.length; i++) {
                if (busGroup[i].isTouching(truckGroup)) {
                    busGroup[i].destroy()
                }
            }
        }

        if (keyDown("up")) {
            duck.y = duck.y - 5
        }

        if (keyDown("down")) {
            duck.y = duck.y + 5
        }

        if (keyDown("left")) {
            duck.x = duck.x - 5
        }

        if (keyDown("right")) {
            duck.x = duck.x + 5
        }

        
        if (coinGroup.isTouching(duck)) {
            for (var i = 0; i < coinGroup.length; i++) {
                if (coinGroup[i].isTouching(duck)) {
                    coinGroup[i].destroy()
                    score++
                }
            }
        }
        
        if(score == 15){
            bg.addImage(winScreenImg)
            bg.scale = 0.7
            
            carGroup.destroyEach()
            busGroup.destroyEach()
            truckGroup.destroyEach()
            fortunerGroup.destroyEach();
            coinGroup.destroyEach();

            duck.destroy();
        }
 
        if (busGroup.isTouching(duck) || carGroup.isTouching(duck) || truckGroup.isTouching(duck) || fortunerGroup.isTouching(duck)) {
            gamestate = 2
        }
    
    }

    else if (gamestate === 2) {

        carGroup.destroyEach()
        busGroup.destroyEach()
        truckGroup.destroyEach()
        fortunerGroup.destroyEach();
        coinGroup.destroyEach();

        duck.destroy();
        
        bg.addImage(backgroundImg2)
    }

    drawSprites()
    
    noStroke();
    textSize(35)
    fill("white")
    text("Score  " + score, width - 300, 50)


}

function createCoin() {
    if (frameCount % 80 == 0) {
        coin = createSprite(-120, round(random(height / 2 - 100, height / 2 + 250)))
        coin.addImage(coinImg)
        coin.velocityX = 9
        coin.scale = 0.2
        coin.lifetime = windowWidth / 9
        coinGroup.add(coin)
    }
}

function createBus() {
    if (frameCount % 80 == 0) {
        bus = createSprite(-120, round(random(height / 2 - 100, height / 2 + 250)))
        bus.addImage(busImg)
        bus.velocityX = 11
                bus.scale = 0.6
        bus.lifetime = windowWidth / 11
        busGroup.add(bus)
    }
}

function createFortuner() {

    if (frameCount % 80 == 0) {

        fortuner = createSprite(width + 120, round(random(height / 2 - 100, height / 2 + 250)))
        fortuner.addImage(fortunerImg)
        fortuner.velocityX = -15
        fortuner.scale = 0.5
        fortuner.lifetime = windowWidth / 15
        fortuner.setCollider("rectangle" , 0 , 0 , 530 , 200)
        fortunerGroup.add(fortuner)
        

    }
}

function createCar() {

    if (frameCount % 80 == 0) {

        car = createSprite(-120, round(random(height / 2 - 100, height / 2 + 250)))
        car.addImage(carImg)
        car.velocityX = 14
        car.scale = 0.6
        car.lifetime = windowWidth / 6
        carGroup.add(car)

    }
}

function createTruck() {

    if (frameCount % 80 == 0) {

        truck = createSprite(width + 120, round(random(height / 2 - 100, height / 2 + 250)))
        truck.addImage(truckImg)
        truck.velocityX = -25
        truck.scale = 1
        truck.lifetime = windowWidth / 25
        truckGroup.add(truck)

    }
}
