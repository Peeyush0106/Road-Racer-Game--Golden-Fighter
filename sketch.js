// Our main draw functin to control each and every part
function draw() {
    checkConnection();
    image(goIMG, 200, 200);

    collidedOtherCars.setLifetimeEach(2.2);
    if (gameLoaded && gameStarted) {
        if (!gotOtherPlrName) {
            getOtherPlrName();
        }
        if (gameState !== 'over' && gameState !== 'win' && playerCount < 2) {
            gameState = 'win';
        }
        // toggleHiddenArrows(true);
        startBgMusic = "no-not the right time";
        background("black");

        if (!cancelGameMovement) {
            updateMyFuelLeft();
            getOppsFuelLeft();
            updateMyGamingStatus();
            sec = World.seconds - secondTimeDiff;
            if (!playInfoSet) {
                document.getElementById("play-info").hidden = false;
                select("#play-info").position(405, 30);
                playInfoSet = true;
            }
            if (!giveUpSet) {
                giveUp.position(400, 350);
                giveUpSet = true;
                giveUp.hide();
            }
            if (!cancelCheckingOtherPlayerLoosing) {
                getOtherPlayerLosing();
            }
            // Set some continuous properties
            map1.setVelocity(0, -1 * (road.velocityY / 70));
            fuelShow = Math.round((fuelLeft / 10000));

            //  Control game with conditional programming

            // When the game is won
            if (playerCar.y < 0 - (playerCar.width / 2)) {
                otherCars.destroyEach();
                playerCar.destroy();
                gameState = "win";
            }
        }

        // Draw our sprites
        drawSprites();

        // When the game is lost
        if (gameState === "over") {
            showLoseMessage();
            graduallyDecreaseSpeed();
            database.ref("Playing/players/" + plrIndex).update({
                lost: true
            });
            if (!plrCountUpdated) {
                console.log("Decreasing PLR Count");
                playerCount -= 1;
                updatePlayerCount(playerCount);
                plrCountUpdated = true;
            }
        } else {
            checkIfOtherPlayerWonAndThenLoseMe();
        }

        if (otherPlrLost) {
            push();
            stroke("red");
            strokeWeight(3);
            line(playerCarOther.x - 5, playerCarOther.y - 5, playerCarOther.x + 5, playerCarOther.y + 5);
            line(playerCarOther.x + 5, playerCarOther.y - 5, playerCarOther.x - 5, playerCarOther.y + 5);
            pop();
            giveUp.hide();
            showedWinMessage = true;
            cancelCheckingOtherPlayerLoosing = true;
            database.ref("Playing/players/" + otherPlrIndex).remove();
            gameState = "win";
        }

        // When the game is won
        if (gameState === "win") {
            showWinMessage();
            loseOtherPlayer();
            if (!plrCountUpdated) {
                playerCount = 0;
                updatePlayerCount(playerCount);
                plrCountUpdated = true;
            }
        }

        if (!cancelGameMovement) {
            // set the other player car properties
            if (playerData !== undefined && playerData[otherPlrIndex] !== undefined) {
                playerCarOther.y = playerData[otherPlrIndex].y;
                push();
                textSize(10);
                fill("red");
                text("Fuel left in your", 400, 300)
                text("opponent's car: " + round(oppsFuelLeft) + "%", 400, 310);
                fill("lightblue");
                text("Fuel left in your", 400, 330)
                text(" car: " + fuelLeftPercentage + "%", 400, 340);
                pop();
            }

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
                push();
                textSize(10);
                text("Time Ellapsed: " + sec + " Sec", 75, 40);
                pop();
                text("Speed: " + Math.round(road.velocityY * 10) + " Km/Hr", 75, 60);
                text("Distance Travelled: " + distanceTravelled + "0 M", 185, 20);
                text("Time Left: " + (100 - sec) + " Sec", 185, 40);
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

            // When the playerCar wants to pick up fuel
            if (fuelCars.isTouching(playerCar)) {
                fuelReload();
            }

            // Set speeds of our cars
            controlWorldCarsVelocity();

            

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
                        startTimerShow.visible = true;
                    }
                    if (sec === 2) {
                        startTimerShow.addImage("image", timer2IMG);
                        startTimerShow.visible = true;
                    }
                    if (sec === 3) {
                        startTimerShow.addImage("image", timer1IMG);
                        startTimerShow.visible = true;
                    }
                    if (sec === 4) {
                        startTimerShow.addImage("image", goIMG);
                        startTimerShow.visible = true;
                    }
                    startCounter = startCounter + 0.5;
                }
                else {
                    startTimerShow.visible = false;
                }
            }
            if (sec > 4) {
                startTimerShow.visible = false;
                giveUp.elt.innerText = "Give Up";
                giveUp.show();
            }

            // Control of cars when the game has just started
            if (gameState != "car-hit"
                && gameState != "over"
                && gameState != "waiting"
                && sec >= 4
                && !playerCar.isTouching(edges)
                && !playerCar.isTouching(otherCars)) {
                gameState = "startedAndMoving";
                if (fuelShow > 0) {
                    gamingControlsUpDown();
                }

                // What all conditions make the game over
                if (fuelShow <= 0 || sec > 100) {
                    gameState = "over";
                }
            }

            // When the player car is touching the obstacles
            if (playerCar.isTouching(edges)
                || playerCar.isTouching(otherCars)
                || playerCar.isTouching(collidedOtherCars)) {
                gameState = "car-hit";
                playerCar.collide(edges);
                // playerCar.collide(otherCars);
                // playerCar.collide(collidedOtherCars);
                graduallyDecreaseSpeed();
                carHit();
            }

            // The road image to reset and the distance to increase
            if (road.y > 280) {
                road.y = 210;
                distanceTravelled = distanceTravelled + 1;
            }

            // WHat al coditions make the game win
            if (distanceTravelled > 299 && sec < 100) {
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

            // Other car with fuel car
            if (otherCars.isTouching(fuelCars)) {
                // Other car reloads its fuel capacity
                fuelReloadOtherCar();
            }

            //  An already collided car can also reload its fuel
            if (collidedOtherCars.isTouching(fuelCars)) {
                // When it touches fuel, its fuel reloads
                fuelReloadCollidedCar();
            }
            if (fuelShow <= 5 && fuelShow !== 0) {
                fuelAlert.html("Fuel Alert!! <br> You only have <br> " + fuelShow + "L of fuel");
            }
            else {
                fuelAlert.html("");
            }
        }
        checkIfOtherPlayerLeftAndThenLeaveMyGame();
    }
    else {
        background("green");
    }
    if (nameChecked) {
        if (plrNameAlreadyTaken) {
            alertSnd.play();
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
        alertSnd.play();
        alert("Incorrect password, please try again!!");
        passwordStatus = 0;
        location.reload();
        noLoop();
    }
    else if (passwordStatus === -2 && !cancelAllCommands) {
        cancelAllCommands = true;
        alertSnd.play();
        alert("Account does not exist, try creating a new one!!");
        location.reload();
        noLoop();
        passwordStatus = 0;
    }
    getPlayerCount();
    getAllPlayersGamingStatus();
    if (playerCount > 1 && !gameStarted && gameLoaded) {
        gameState = "startedAndMoving";
        gameStarted = true;
        secondTimeDiff = World.seconds - sec;
        waitingTxt.hide();
        for (var i = 0; i < playerCount - 1; i++) {
            playerCarOther = createSprite(25, 360);
            playerCarOther.addImage("image", img9);
            playerCarOther.scale = 0.04;
            playerCarOther.tint = rgb(random(100, 200), random(100, 200), random(100, 200));
        }
    }
    if (gameState === "waiting") {
        showLoadingAnim("white", rgb(64, 93, 196));
    }
    if (!gameStarted && !showContentForNotLoaded) {
        if (gameState === "waiting") {
            image(logo, 40, 145);
            waitingTxt.show();
            if (startBgMusic === "no-not the right time") {
                startBgMusic = "yes-waitingForPlr";
            }
        }
        else {
            image(gameImg, 40, 145, (624 / 1.5), (288 / 1.5));
            inputName.show();
            inputPassword.show();
            createAccount.show();
            loginAndPlay.show();
            nameText.show();
            pwdText.show();
        }
        cancelGameMovement = false;
    }
    if (showContentForNotLoaded) {
        // y: (400 - 250) / 2 to put it at the center.
        image(gameImg, 0, (400 - 250) / 2, 500, 250);
        inputName.hide();
        inputPassword.hide();
        createAccount.hide();
        loginAndPlay.hide();
        nameText.hide();
        pwdText.hide();
        waitingTxt.hide();
        showLoadingAnim("red", "red");
        cancelGameMovement = true;
        if (gameState === "waiting") {
            alert("Your network is unstable, and we couldn't connect you with the game. Please fix your network connection, and the game will autmatically resume.");
            gameState = "wasWaitingAndDisconnected";
        }
        if (gameState === "startedAndMoving") {
            alert("Sorry, but you will have to leave this game, as your network connection is not fine. Your car is getting disappointed, but no worries! you can win another race after your connection gets fixed and just make your car happy as before...");
            gameState = "connectionLostWhilePlaying";
        }
    }
    // Letting know the player so that he/she can join the game.
    if (connected && !loggedIn) {
        // Do not allow entering the game when others are playing
        if (playerCount === 2) {
            createAccount.elt.style["background-color"] = "gray";
            loginAndPlay.elt.style["background-color"] = "gray";
            createAccount.elt.disabled = true;
            loginAndPlay.elt.disabled = true;
            push();
            fill("red");
            stroke("blue");
            textSize(20);
            text("There are already 2 players playing this game, wait for them and check back after 1-2 minutes later.", 2, 90, 498);
            text("2 Players are playing already.", 2, 350, 498);
            pop();
        }
        else {
            createAccount.elt.style["background-color"] = "red";
            loginAndPlay.elt.style["background-color"] = "blue";
            createAccount.elt.disabled = false;
            loginAndPlay.elt.disabled = false;
        }

        // Let player know when somewhone is waiting to play.
        if (playerCount === 1 && gameState !== "waiting") {
            push();
            fill("yellow");
            stroke("black");
            strokeWeight(3);
            textSize(20);
            text("One player is waiting to play!! Join the game fast before anyone else reaches!!", 2, 90, 498);
            text("1 Player is ready to play.", 2, 350, 498);
            pop();
        }
        if (playerCount === 0) {
            push();
            fill("yellow");
            stroke("red");
            strokeWeight(2.7);
            textSize(20);
            text("No ones there to play, join the game fast before any other 2 players reach the game!", 2, 90, 498);
            text("None are playing currently.", 2, 350, 498);
            pop();
        }
    }
    if (startBgMusic === "yes-waitingForPlr") {
        bgMusic.loop();
        startBgMusic = "no-alreadyPlaying";
    }
    if (startBgMusic === "no-not the right time") {
        bgMusic.stop();
    }
}