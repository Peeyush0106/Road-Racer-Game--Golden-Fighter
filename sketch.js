// Initial Variable Declaration
var road, fuelLeft, fuelShow, carShowPath, carShowFlag,
    stars, timeElapsed, startTimerShow, rightEdgeX, leftEdgeX, laneX,
    edgesLev1, rightEdgeLev1, leftEdgeLev1, startCounter, touchingCounter,
    gameState, distanceTravelled, finishLine, playerCar, blueCars, redCars,
    fuelCars, collidedBlueCars, collidedRedCars,
    maxBlueCars, maxRedCarsmaxfuelCars, canvas,
    blueCarVelocity, redCarVelocity, fuelCarVelocity,
    blueCarSpacing, redCarSpacing, fuelCarSpacing, img1, img2, img3, img4,
    img5, img6, img7, img8, img9, img10, img11, img12, bgIMG, yellowCarIMG,
    finalFlagPathShowIMG, finLineIMG, fuelCarIMG, fuelIMG, timerIMG;

function preload() {
    img1 = loadImage("images/1.png");
    img2 = loadImage("images/2.png");
    img3 = loadImage("images/3.png");
    img4 = loadImage("images/4.png");
    img5 = loadImage("images/5.png");
    img6 = loadImage("images/6.png");
    img7 = loadImage("images/7.png");
    img8 = loadImage("images/8.png");
    img9 = loadImage("images/9.png");
    img10 = loadImage("images/10.png");
    img11 = loadImage("images/11.png");
    img12 = loadImage("images/12.png");
    bgIMG = loadImage("images/bgimage.png");
    yellowCarIMG = loadImage("images/car.png");
    finLineIMG = loadImage("images/finish_line.png");
    finalFlagPathShowIMG = loadImage("images/finishflag.png");
    fuelCarIMG = loadImage("images/symplusfuelcar.png");
    fuelIMG = loadImage("images/symplusfuelcar.png");
    timerIMG = loadImage("images/timer.png");
}

function setup() {
    // Initial Variable Declaration
    road = createSprite(200, 140);
    bgIMG.width = 400;
    bgIMG.height = 600;
    road.addImage("image", bgIMG);
    road.width = 400;
    road.height = 600;

    pathMap = showMap(15, 380, img9, 0.08, null,
        15, 10, finalFlagPathShowIMG, 0.08, 45);

    fuelLeft = 500000;
    fuelShow = 0;
    carShowPath, carShowFlag;

    stars = 12;

    timeElapsed = World.seconds;

    function showMap(x1, y1, anim1, scale1, rotate1, x2, y2, anim2, scale2, rotate2) {
        carShowPath = createSprite(x1, y1);
        carShowPath.addImage("image", anim1);
        carShowPath.scale = scale1;
        carShowPath.rotation = rotate1;

        carShowFlag = createSprite(x2, y2);
        carShowFlag.addImage("image", anim2);
        carShowFlag.scale = scale2;
        carShowFlag.rotation = rotate2;

        return (carShowPath, carShowFlag);
    }

    startTimerShow = createSprite(225, 200);
    startTimerShow.visible = false;

    rightEdgeX = 306;
    leftEdgeX = 137;
    laneX = [leftEdgeX + 29, 196 + 28, 251 + 26];

    edgesLev1 = createGroup();
    rightEdgeLev1 = createSprite(rightEdgeX, 200, 5, 400);
    leftEdgeLev1 = createSprite(leftEdgeX, 200, 5, 400);
    edgesLev1.add(rightEdgeLev1);
    edgesLev1.add(leftEdgeLev1);
    edgesLev1.setVisibleEach(false);

    startCounter = 0;
    touchingCounter = 0;
    gameState = "gettingStarted";

    distanceTravelled = 0;
    finishLine = createSprite(220, 100);
    finishLine.visible = false;

    // Player car
    createPlayerCar();

    // World Vehicles
    blueCars = createGroup();
    redCars = createGroup();
    fuelCars = createGroup();
    collidedBlueCars = createGroup();
    collidedRedCars = createGroup();

    maxBlueCars = 8;
    maxRedCars = 8;
    maxfuelCars = 5;

    blueCarVelocity = random(5, 7);
    console.log(blueCarVelocity);
    redCarVelocity = random(5, 7);
    fuelCarVelocity = random(4.5, 6.5);

    blueCarSpacing = 500;
    redCarSpacing = 500;
    fuelCarSpacing = 1150;

    createWorldVehicles();
}

// External Function declaration

// Create player car
function createPlayerCar() {
    playerCar = createSprite(laneX[1], 340);
    playerCar.addImage("image", yellowCarIMG);
    playerCar.scale = 0.125;
    playerCar.rotation = -90;
}

// Creating Intial Opponent Vehicles
function createWorldVehicles() {
    for (var i = 0; i < maxBlueCars; i++) {
        var blueCarLane = Math.round(Math.random(0, 2));
        var blueCarX = laneX[blueCarLane];
        var blueCar = createSprite(blueCarX, -1 * blueCarSpacing * (i + 1));
        var blueCarAnimations = [img1, img2, img3, img4, img5, img6, img7, img8, img9, img10, img11, img12];
        var blueCarAnimationNumber = Math.round(Math.random(0, 11));
        var blueCarChoseAnimation = blueCarAnimations[blueCarAnimationNumber];
        blueCar.addImage("image", blueCarChoseAnimation);

        if (blueCarAnimationNumber != 9
            && blueCarAnimationNumber != 10) {
            blueCar.scale = 0.14;
        }
        else {
            blueCar.scale = 0.5;
        }
        if (blueCarAnimationNumber === 0) {
            blueCar.scale = 0.2;
        }
        if (blueCarAnimationNumber === 7) {
            blueCar.scale = 0.2;
        }
        if (blueCarAnimationNumber === 4) {
            blueCar.scale = 0.3;
        }
        if (blueCarAnimationNumber === 1) {
            blueCar.scale = 0.12;
        }
        if (blueCarAnimationNumber === 2) {
            blueCar.scale = 0.15;
        }
        if (blueCarAnimationNumber === 6) {
            blueCar.scale = 0.1;
        }
        if (blueCarAnimationNumber === 5) {
            blueCar.scale = 0.1;
        }
        if (blueCarAnimationNumber === 8
            || blueCarAnimationNumber === 11
            || blueCarAnimationNumber === 3) {
            blueCar.scale = 0.1;
        }
        blueCars.add(blueCar);
    }

    for (var j = 0; j < maxRedCars; j++) {
        var redCarLane = Math.round(Math.random(0, 2));
        var redCarX = laneX[redCarLane];
        var redCar = createSprite(redCarX, -250 + (-1 * redCarSpacing * j));
        var redCarAnimations = [img1, img2, img3, img4, img5, img6, img7, img8, img9, img10, img11, img12];
        var redCarAnimationNumber = Math.round(Math.random(0, 11));
        var redCarChoseAnimation = redCarAnimations[redCarAnimationNumber];
        redCar.addImage("image", redCarChoseAnimation);

        if (redCarAnimationNumber != 9
            && redCarAnimationNumber != 10) {
            redCar.scale = 0.24;
        }
        else {
            redCar.scale = 0.7;
        }
        if (redCarAnimationNumber === 0) {
            redCar.scale = 0.2;
        }
        if (redCarAnimationNumber === 7) {
            redCar.scale = 0.2;
        }
        if (redCarAnimationNumber === 4) {
            redCar.scale = 0.3;
        }
        if (redCarAnimationNumber === 1) {
            redCar.scale = 0.12;
        }
        if (redCarAnimationNumber === 2) {
            redCar.scale = 0.15;
        }
        if (redCarAnimationNumber === 6) {
            redCar.scale = 0.1;
        }
        if (redCarAnimationNumber === 5) {
            redCar.scale = 0.1;
        }
        if (redCarAnimationNumber === 8
            || redCarAnimationNumber === 11
            || redCarAnimationNumber === 3) {
            redCar.scale = 0.1;
        }
        //  redCar.rotation = -90;
        redCars.add(redCar);
    }

    for (var k = 0; k < maxfuelCars; k++) {
        var fuelCarLane = Math.round(Math.random(0, 2));
        var fuelCarCarX = laneX[fuelCarLane];

        var fuelCar = createSprite(fuelCarCarX, -1 * fuelCarSpacing * (k + 1));
        fuelCar.addImage("image", fuelCarIMG);

        fuelCar.scale = 0.22;
        fuelCars.add(fuelCar);
    }
}

// Control the speed of our cars
function controlWorldCarsVelocity() {
    blueCars.setVelocityYEach(road.velocityY - blueCarVelocity);
    redCars.setVelocityYEach(road.velocityY - redCarVelocity);
    fuelCars.setVelocityYEach(road.velocityY - fuelCarVelocity);
    collidedBlueCars.setVelocityYEach(road.velocityY);
    collidedRedCars.setVelocityYEach(road.velocityY);
}

// When our car has been overtaken, reuse them ahead
function recreateOvertakenCars() {
    // For blue
    for (var i = 0; i < blueCars.length; i++) {
        var blueCar = blueCars.get(i);
        if (blueCar.y > 600) {
            blueCar.y = blueCar.y - maxBlueCars * blueCarSpacing;
        }
    }

    // FOr red
    for (var j = 0; j < redCars.length; j++) {
        var redCar = redCars.get(j);
        if (redCar.y > 600) {
            redCar.y = redCar.y - maxRedCars * redCarSpacing;
        }
    }

    // For Fuel
    for (var l = 0; l < maxfuelCars; l++) {
        var fuelCar = fuelCars.get(l);
        if (fuelCar.y > 600) {
            fuelCar.y = fuelCar.y - maxfuelCars * fuelCarSpacing;
        }
    }

    // Collided Blue Cars
    for (var m; m < collidedBlueCars.length; m++) {
        var collidedBlueCar = collidedBlueCars.get(m);
        if (collidedBlueCar.y > 600) {
            blueCars.add(collidedBlueCar);
            collidedBlueCars.remove(collidedBlueCar);
            collidedBlueCar.y = collidedBlueCar.y - maxBlueCars * blueCarSpacing;
        }
    }

    // Collided Red Cars
    for (var n; n < collidedRedCars.length; n++) {
        var collidedRedCar = collidedRedCars.get(n);
        if (collidedRedCar.y > 600) {
            redCars.add(collidedRedCar);
            collidedRedCars.remove(collidedRedCar);
            collidedRedCar.y = collidedRedCar.y - maxRedCars * redCarSpacing;
        }
    }
}

// Our main draw functin to control each and every part
function draw() {
    background("white");

    // Set some continuous properties
    carShowPath.setVelocity(0, -1 * (road.velocityY / 55));
    fuelShow = Math.round((fuelLeft / 10000));
    timeElapsed = World.seconds;

    //  Control game with conditional programming

    // When the game is won
    if (playerCar.y < 0 - (playerCar.width / 2)) {
        blueCars.destroyEach();
        redCars.destroyEach();
        playerCar.destroy();
        gameState = "win";
    }

    // Draw our sprites
    drawSprites();

    // When the game is running, not won, and even lost
    if (gameState != "win" && gameState != "over") {
        push();
        strokeWeight(4);
        stroke("lightgreen");
        line(carShowFlag.x, carShowFlag.y, carShowPath.x, carShowPath.y);
        line(carShowFlag.x, carShowFlag.y, carShowFlag.x - 10, carShowFlag.y + 10);
        line(carShowFlag.x, carShowFlag.y, carShowFlag.x + 10, carShowFlag.y + 10);
        strokeWeight(8);
        stroke("red");
        point(carShowPath.x, carShowPath.y);
        pop();

        fill("blue");
        rect(70, 5, 260, 60);
        stroke("red");
        strokeWeight(3);
        fill("yellow");

        text("Fuel: " + fuelShow + "L", 75, 20);
        text("Stars: " + stars, 75, 40);
        text("Speed: " + Math.round(road.velocityY * 10) + " Km/Hr", 75, 60);
        text("Distance Travelled: " + distanceTravelled + "0 M", 185, 20);
        text("Time Elapsed: " + timeElapsed + " Sec", 185, 40);
        text("To travel more: " + (200 - distanceTravelled + "0 M"), 185, 60);

        push();
        stroke("yellow");
        strokeWeight(2);
        line(180, 5, 180, 65);
        line(70, 25, 330, 25);
        line(70, 45, 330, 45);
        pop();

        recreateOvertakenCars();
    }

    // When to show the instructions
    if (timeElapsed < 10) {
        text("Try to reach the goal before 75 seconds, you have to travel 2 KM distance, "
            + "a star is the most helpful to buy fuel."
            + " Hit the fuel car to buy fuel!",
            135, 240, 205);
    }

    // When the playerCar wants to pick up fuel
    if (fuelCars.isTouching(playerCar)) {
        fuelReload();
    }

    // Set speeds of our cars
    controlWorldCarsVelocity();

    // WHen the game is lost
    if (gameState === "over") {
        fill("green");
        rect(2.5, 147.5, 400, 30);
        textSize(25);
        strokeWeight(2);
        stroke("yellow");
        fill("blue");
        text("Game Over! Refresh to Play Again..", 7.5, 170);
        graduallyDecreaseSpeed();
    }

    // When the game is won
    if (gameState === "win") {
        fill("green");
        rect(50, 147.5, 300, 60);
        textSize(25);
        strokeWeight(2);
        stroke("yellow");
        fill("red");
        text("Yeah! You Won the Game!", 55, 170);
        text("Refresh to play again!", 55, 200);
    }

    // If 60 frames have past after the playerCar touched any obstacle
    if (touchingCounter > 60) {
        gameState = "allReset";
        touchingCounter = 0;
        // Recreating playerCar
        playerCar.destroy();
        createPlayerCar();
    }

    // When the car hit an obstacle
    if (gameState == "car-hit") {
        touchingCounter = touchingCounter + 1;
    }

    // If the game didn't yet start, the timer's on
    if (gameState == "gettingStarted") {
        startTimerShow.visible = true;
        startTimerShow.addImage("image", timerIMG);
        startCounter = startCounter + 0.5;
    }

    // Control of cars when the game has just started
    if (gameState != "car-hit"
        && gameState != "over"
        && startCounter > 15
        && !playerCar.isTouching(edgesLev1)
        && !playerCar.isTouching(redCars)
        && !playerCar.isTouching(blueCars)) {
        gameState = "startedAndMoving";
        if (fuelShow > 0) {
            gamingControlsUpDown();
        }

        // What all conditions make the game over
        if (fuelShow <= 0 || timeElapsed > 75 || stars <= 0) {
            gameState = "over";
        }
    }

    // When the player car is touching the obstacles
    if (playerCar.isTouching(edgesLev1)
        || playerCar.isTouching(redCars)
        || playerCar.isTouching(blueCars)
        || playerCar.isTouching(collidedBlueCars)
        || playerCar.isTouching(collidedRedCars)) {
        gameState = "car-hit";
        playerCar.collide(edgesLev1);
        graduallyDecreaseSpeed();
        carHit();
    }

    // The road image to reset and the distance to increase
    if (road.y > 290) {
        road.y = 200;
        distanceTravelled = distanceTravelled + 1;
    }

    // WHat al coditions make the game win
    if (distanceTravelled > 199 && timeElapsed < 75 && stars > 0) {
        finishLine.visible = true;
        playerCar.depth = 100;
        finishLine.addImage("image", finLineIMG);
        finishLine.scale = 0.25;
        graduallyDecreaseSpeed();
        gameState = "win";
        if (background.velocityY == 0) {
            road.setVelocity(0, 0);
        }
        playerCar.setVelocity(0, -13);
    }

    // When the car is currently running
    if (gameState == "startedAndMoving" && road.velocityY > 0) {
        gamingControlsLR();
    }

    // When any obstacle touches any other obstacle

    // For blue and red.
    if (blueCars.isTouching(redCars) || redCars.isTouching(blueCars)) {
        // Handle blue and red collided cars
        handleCollidedCars();
        // The car that touched the other car from behind, will stop.
    }

    // Blue car with fuel car
    if (blueCars.isTouching(fuelCars)) {
        // Blue car reloads its fuel capacity
        fuelReloadBlueCar();
    }

    // Red car with fuel car
    if (redCars.isTouching(fuelCars)) {
        fuelReloadRedCar();
    }

    //  An already collided car can also reload its fuel
    if (collidedBlueCars.isTouching(fuelCars) || collidedRedCars.isTouching(fuelCars)) {
        // When it touches fuel, its fuel reloads
        fuelReloadCollidedCar();
    }
}

// Function for Fuel reloads

// Function for Fuel reload for Player Car
function fuelReload() {
    for (var i = 0; i < maxfuelCars; i++) {
        var fuelCar = fuelCars.get(i);
        if (playerCar.isTouching(fuelCar)) {
            fuelLeft = fuelLeft + 45000;
            stars = stars - 2;
            fuelCar.y = fuelCar.y - maxfuelCars * fuelCarSpacing;
        }
    }
}

// Function for Fuel Reload for Blue Car
function fuelReloadBlueCar() {
    for (var i = 0; i < maxfuelCars; i++) {
        var fuelCar = fuelCars.get(i);

        for (var j = 0; j < blueCars.length; j++) {
            var computerCar = blueCars.get(j);
            if (computerCar.isTouching(fuelCar)) {
                fuelCar.y = fuelCar.y - maxfuelCars * fuelCarSpacing;
            }
        }
    }
}

// Function for Fuel Reload for Red Car
function fuelReloadRedCar() {
    for (var i = 0; i < maxfuelCars; i++) {
        var fuelCar = fuelCars.get(i);
        for (var j = 0; j < redCars.length; j++) {
            var computerCar = redCars.get(j);
            if (computerCar.isTouching(fuelCar)) {
                fuelCar.y = fuelCar.y - maxfuelCars * fuelCarSpacing;
            }
        }
    }
}

// Function for Fuel Reload for a Collided Car
function fuelReloadCollidedCar() {
    for (var i = 0; i < maxfuelCars; i++) {
        var fuelCar = fuelCars.get(i);
        for (var j = 0; j < collidedBlueCars.length; j++) {
            var computerBlueCar = collidedBlueCars.get(j);
            if (computerBlueCar.isTouching(fuelCar)) {
                fuelCar.y = fuelCar.y - maxfuelCars * fuelCarSpacing;
            }
        }

        for (var k = 0; k < collidedRedCars.length; k++) {
            var computerRedCar = collidedRedCars.get(k);
            if (computerRedCar.isTouching(fuelCar)) {
                fuelCar.y = fuelCar.y - maxfuelCars * fuelCarSpacing;
            }
        }
    }
}

// Hnadling the collided cars
function handleCollidedCars() {
    // if the collided cars are in the screen, 
    // remove from the respective groups and add to the collided cars group
    // and stop the cars
    for (var i = 0; i < blueCars.length; i++) {
        for (var j = 0; j < redCars.length; j++) {
            var blueCar = blueCars.get(i);
            var redCar = redCars.get(j);
            if (blueCar.isTouching(redCar) || redCar.isTouching(blueCar)) {
                // if the collided cars are ahead and not in the display area,
                // change the lane of one of the cars
                if (blueCar.y < -200) {
                    // Change blue car lane
                    var laneNum = Math.round(Math.random(0, 2));
                    var carX = laneX[laneNum];
                    blueCar.x = carX;
                } else {
                    // check the car which is ahead
                    if (blueCar.y < redCar.y) {
                        // stop the red car
                        redCars.remove(redCar);
                        collidedRedCars.add(redCar);
                        var collidedRedCarTimer;
                        collidedRedCarTimer = collidedRedCarTimer + 1;
                        if (collidedRedCarTimer >= 60) {
                            redCar.setVelocity(0, redCarVelocity);
                            collidedRedCarTimer = 0;
                        }
                    } else {
                        // stop the blue car
                        blueCars.remove(blueCar);
                        collidedBlueCars.add(blueCar);
                        var collidedBlueCarTimer;
                        collidedBlueCarTimer = collidedBlueCarTimer + 1;
                        if (collidedBlueCarTimer >= 60) {
                            blueCar.setVelocity(0, blueCarVelocity);
                            collidedBlueCarTimer = 0;
                        }
                    }
                }
            }
        }
    }
}

// Controlling the background
function controlBackgroundSpeed() {
    if (road.velocityY < 11 && gameState != "over") {
        road.setVelocity(0, road.velocityY + 0.2);
    }
}

// Gradually Decreasing speed
function graduallyDecreaseSpeed() {
    road.velocityY = road.velocityY - 0.5;
    if (road.velocityY < 0) {
        road.velocityY = 0;
    }
}

// When the playerCar hit an obstacle
function carHit() {
    playerCar.rotationSpeed = 13;
    graduallyDecreaseSpeed();
}

// Function for Gaming Controls

// Left Right Gaming Controls
function gamingControlsLR() {
    // Right
    if (keyDown("right") && gameState != "over" && gameState != "win") {
        playerCar.x = playerCar.x + ((road.velocityY / 2));
    }
    if (keyDown("left") && gameState != "over" && gameState != "win") {
        playerCar.x = playerCar.x - ((road.velocityY / 2));
    }
}

// Up Down Gaming Controls
function gamingControlsUpDown() {
    // Gaming controls for up arrow key
    if (keyDown("up") && gameState != "over" && gameState != "win") {
        // Increasing speed
        controlBackgroundSpeed();
        if (fuelLeft > 0 && stars > 0) {
            fuelLeft = fuelLeft - 500;
        }
    }

    // When the up key is relased, decrease the very slowly, and fuel release become slower
    else if (gameState == "startedAndMoving" && road.velocityY > 0) {
        road.velocityY = road.velocityY - 0.1;
        if (road.velocityY < 0) {
            road.velocityY = 0;
        }
        fuelLeft = fuelLeft - 9;
    }

    // Gaming controls for down arrow key
    if (keyDown("down")) {
        graduallyDecreaseSpeed();
    }
}