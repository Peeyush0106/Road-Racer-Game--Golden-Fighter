// Our main draw functin to control each and every part
function draw() {
    image(goIMG, 200, 200)
    collidedBlueCars.setLifetimeEach(40);
    collidedRedCars.setLifetimeEach(40);
    if (gameLoaded && gameStarted) {
        background("black");
        sec = World.seconds - secondTimeDiff;
        playersEntered = playerCount;

        // Set some continuous properties
        map1.setVelocity(0, -1 * (road.velocityY / 53));
        if (playerData !== undefined) {
            for (let j = 1; j <= playerCount; j++) {
                console.log(playerData, "----", playerData[j], "----", playerData[j].name);
                if (plrName === playerData[j].name) {
                    continue;
                }
                console.log(j, "-----", otherPlayerCars[j - 1].y, "-----", playerData[j].y);
                otherPlayerCars[j - 1].y = playerData[j].y;
            }
        }
        fuelShow = Math.round((fuelLeft / 10000));
        timeElapsed = sec;
        updateMyGamingStatus();

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

        // When the game is running, not won or lost
        if (gameState != "win" && gameState != "over") {
            push();
            strokeWeight(4);

            stroke("lightgreen");
            fill("lightgreen");
            line(carShowFlag1.x, carShowFlag1.y, map1.x, map1.y);
            triangle(carShowFlag1.x, carShowFlag1.y, carShowFlag1.x - 6, carShowFlag1.y + 9, carShowFlag1.x + 6, carShowFlag1.y + 9);
            point(map1.x, map1.y);

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
            if (!plrCntDecreased) {
                playerCount -= 1;
                updatePlayerCount(playerCount);
                plrCntDecreased = true;
            }
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
            if (!plrCntDecreased) {
                playerCount -= 1;
                updatePlayerCount(playerCount);
                plrCntDecreased = true;
            }
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
        if (gameState === "car-hit") {
            touchingCounter = touchingCounter + 1;
        }

        // If the game didn't yet start, the timer's on
        if (gameState === "startedAndMoving") {
            startTimerShow.visible = true;
            if (sec) {
                if (sec === 1) {
                    startTimerShow.addImage("image", timer3IMG);
                    startTimerShow.visible = true
                }
                if (sec === 2) {
                    startTimerShow.addImage("image", timer2IMG);
                    startTimerShow.visible = true
                }
                if (sec === 3) {
                    startTimerShow.addImage("image", timer1IMG);
                    startTimerShow.visible = true
                }
                if (sec === 4) {
                    startTimerShow.addImage("image", goIMG);
                    startTimerShow.visible = true
                }
                startCounter = startCounter + 0.5;
            }
            else {
                startTimerShow.visible = false;
            }
        }
        if (sec > 4) startTimerShow.visible = false;

        // Control of cars when the game has just started
        if (gameState != "car-hit"
            && gameState != "over"
            && gameState != "waiting"
            && sec >= 4
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
            // playerCar.collide(redCars);
            // playerCar.collide(blueCars);
            // playerCar.collide(collidedBlueCars);
            // playerCar.collide(collidedRedCars);
            graduallyDecreaseSpeed();
            carHit();
        }

        // The road image to reset and the distance to increase
        if (road.y > 280) {
            road.y = 210;
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
            if (background.velocityY === 0) {
                road.setVelocity(0, 0);
            }
            playerCar.setVelocity(0, -3);
            playerCar.rotationSpeed = 0;
        }

        // When the car is currently running
        if (gameState === "startedAndMoving" && road.velocityY > 0) {
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
    else {
        background("green");
    }
    if (nameChecked) {
        if (plrNameAlreadyTaken) {
            alert("Name already taken, choose another one");
            location.reload();
        } else {
            // Create new account and start playing
            startGame();
            updatePassword(plrName);
        }
        nameChecked = false;
    }
    // Check the password status
    if (passwordStatus === 1) {
        startGame();
        passwordStatus = 0;
    }
    else if (passwordStatus === -1 && !cancelAllCommands) {
        cancelAllCommands = true;
        console.log("yes");
        alert("Incorrect password, please try again!!");
        passwordStatus = 0;
        location.reload();
    }
    else if (passwordStatus === -2 && !cancelAllCommands) {
        cancelAllCommands = true;
        console.log("yes");
        alert("Account does not exist, try creating a new one!!");
        passwordStatus = 0;
        location.reload();
    }
    getPlayerCount();
    getAllPlayersGamingStatus();
    if (playerCount > 1 && !gameStarted && gameLoaded) {
        gameState = "startedAndMoving";
        gameStarted = true;
        secondTimeDiff = World.seconds - sec;
        waitingTxt.hide();
        for (var i = 0; i < playerCount - 1; i++) {
            var playerCarOther = createSprite(25, 360);
            playerCarOther.addImage("image", img9);
            playerCarOther.scale = 0.04;
            playerCarOther.tint = rgb(random(100, 200), random(100, 200), random(100, 200));
            otherPlayerCars.push(playerCarOther);
        }
    }
}