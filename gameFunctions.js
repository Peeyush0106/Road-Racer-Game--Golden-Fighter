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
        var blueCarLane = Math.round(random(0, 2));
        var blueCarX = laneX[blueCarLane];
        var blueCar = createSprite(blueCarX, -1 * blueCarSpacing * (i + 1));
        var blueCarAnimations = [img1, img2, img3, img4, img5, img6, img7, img8, img9, img10, img11, img12];
        var blueCarAnimationNumber = Math.round(random(0, 11));
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
        var redCarLane = Math.round(random(0, 2));
        var redCarX = laneX[redCarLane];
        var redCar = createSprite(redCarX, -250 + (-1 * redCarSpacing * j));
        var redCarAnimations = [img1, img2, img3, img4, img5, img6, img7, img8, img9, img10, img11, img12];
        var redCarAnimationNumber = Math.round(random(0, 11));
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
        var fuelCarLane = Math.round(random(0, 2));
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
    collidedBlueCars.setLifetimeEach(2);
    collidedRedCars.setVelocityYEach(road.velocityY);
    collidedRedCars.setLifetimeEach(2);
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

    // For red
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

// When the game images and data is loaded
function gameIsLoaded() {
    imgLoads.push(imgLoads.length + 1);
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
                    var laneNum = Math.round(random(0, 2));
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
    if (road.velocityY < 10.8 && gameState != "over") {
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
    else if (gameState === "startedAndMoving" && road.velocityY > 0) {
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

async function updatePassword(name) {
    await database.ref(("Accounts/" + name)).update({
        password: inputPassword.value(),
    });
}

async function checkPasswordCorrect(name, password) {
    await database.ref("Accounts/" + name + "/password").get().then(function (data) {
        if (data.exists() && !cancelAllCommands) {
            var masterPwd = data.val();
            if (masterPwd === password) {
                passwordStatus = 1; // Validated and correct
            }
            else {
                passwordStatus = -1; // Validated and incorrect
            }
        }
        else {
            passwordStatus = -2; // Validated and does not exist
        }
    }).catch(function (error) {
        console.error(error);
    });
}

async function checkPasswordAndNameErr() {
    var pwd = inputPassword.value();
    var name = inputName.value();
    if (pwd === "" && !cancelAllCommands) {
        cancelAllCommands = true;
        console.log("yes");
        alert("Please enter a valid password");
    }
    if (name === "" && !cancelAllCommands) {
        cancelAllCommands = true;
        console.log("yes");
        alert("Please enter a valid name");
    }
    else {
        cancelAllCommands = false;
    }
}

// name existence
async function checkNameExistence(playerName) {
    await database.ref("Accounts/" + playerName).get().then(function (data) {
        if (data.exists() && !cancelAllCommands) {
            //location.reload();
            plrNameAlreadyTaken = true;
        }
        nameChecked = true;
    }).catch(function (error) {
        console.error(error);
    });
}

// Allow only alphabets in the name
function alphaOnly(event) {
    var key;
    if (window.event) {
        key = window.event.key;
    }
    else if (e) {
        key = e.which;
    }
    var key = event.keyCode;
    return ((key >= 65 && key <= 90) || (key >= 95 && key <= 122) || key === 8 || key === 46 || (key >= 37 && key <= 40) || (key >= 35 && key <= 36));
}

function startGame() {
    gameLoaded = true;
    inputName.hide();
    inputPassword.hide();
    nameText.hide();
    pwdText.hide();
    info_text.hide();
    info_text2.hide();
    createAccount.hide();
    loginAndPlay.hide();
    giveUp.elt.innerText = "Cancel Play Request";
    giveUp.show();
    waitingTxt.show();
}

function putMeInWaitingRoom() {
    gameState = "waiting";
    playerCount += 1;
    updatePlayerCount(playerCount);
}

async function updatePlayerCount(count) {
    await database.ref("/").update({
        playerCount: count
    });
}

async function getPlayerCount() {
    if (!leavingGame) {
        await database.ref("/playerCount").get().then(function (data) {
            if (data.exists()) {
                playerCount = data.val();
            }
            else {

            }
        }).catch(function (error) {
            console.error(error);
        });
    }
}

window.onbeforeunload = function () {
    if (gameState !== "gettingStarted"
        && gameState !== "over"
        && gameState !== "win") {
        if (playerCount === 1) {
            database.ref("Playing").remove();
        }
        playerCount = 0;
        updatePlayerCount(playerCount);
        plrCntDecreased = true;
        unloading = true;
    }

    if (gameStarted || gameState === "waiting") {
        leavingGame = true;
    }
}

async function updateMyGamingStatus() {
    if (!unloading) {
        await database.ref("Playing/players/" + plrIndex).update({
            name: plrName,
            distance: distanceTravelled,
            y: map1.y
        });
    }
}

async function getAllPlayersGamingStatus() {
    await database.ref("/Playing/players").get().then(function (data) {
        if (data.exists()) {
            playerData = data.val();
        }
        else {

        }
    }).catch(function (error) {
        console.error(error);
    });
}

async function getOtherPlayerLoosing() {
    await database.ref("/Playing/players/" + otherPlrIndex + "/lost").get().then(function (data) {
        if (data.exists()) {
            otherPlrLost = data.val();
        }
        else {
            otherPlrLost = false;
        }
    }).catch(function (error) {
        console.error(error);
    });
}

function showWinMessage() {
    stopAllSprites();
    endGameBtn.show();
    cancelGameMovement = true;
    var maxCrownY = 160;
    var maxCloudX1 = 250;
    var maxCloudX2 = 280;
    push();
    // Message box
    {
        push();
        rectMode(CENTER);
        fill("black");
        rect(250, 200, 250, 130);
        pop();
    }
    // Show the encouragement text
    // Show player tags
    {
        textSize(15);
        fill("darkblue");
        push();
        stroke("white");
        strokeWeight(1.5);
        text("You", 130, 260);
        text("Opponent", 280, 260);
        pop();
    }
    // Define the values of formatting and show text
    {
        {
            fill("lightgreen");
            // To-do: remove below line on finalization
            plrName = "OOOOOOOO";
            croppedPlrname = plrName.slice(0, 3);
            if (plrName.length >= 3) {
                crownX = 160;
            }
            if (plrName.length > 3) {
                croppedPlrname = plrName.slice(0, 3) + "..";
                textSize(50);
            }
            else {
                textSize(70)
            }
            text(croppedPlrname, 125, 240);
        }
        {
            fill("magenta");
            // To-do: remove below line on finalization
            otherPlrName = "PPPPPPPPPPPP";
            croppedOtherPlrName = otherPlrName.slice(0, 3);
            if (otherPlrName.length >= 3) {
                cloudX = 160;
            }
            if (otherPlrName.length > 3) {
                croppedOtherPlrName = otherPlrName.slice(0, 3) + "..";
                textSize(22.5);
            }
            else {
                textSize(42.5);
            }
            text(croppedOtherPlrName, 290, 240);
        }
    }
    // Movement of the crown
    {
        push();
        translate(crownX, crownY);
        if (crownY < maxCrownY) {
            crownY += 6;
            crownRotation += 0.39;
        }
        rotate(crownRotation);
        image(crown, 0, 0, (1329 / 10 / 2.2), (980 / 10 / 2.2));
        pop();
    }
    // Movement of the cloud
    {
        if (cloudX1 < maxCloudX1) {
            cloudX1 += 6;
        }
        if (cloudX2 > maxCloudX2) {
            cloudX2 -= 5;
        }
        image(cloud, cloudX1, cloudY, (5277 / 80), (3745 / 80));
        image(cloud, cloudX2, cloudY, (5277 / 80), (3745 / 80));
    }
    pop();
    endTxt.show();
}

function showLoseMessage() {
    stopAllSprites();
    endGameBtn.show();
    cancelGameMovement = true;
    var maxCrownY = 160;
    var maxCloudX1 = 125;
    var maxCloudX2 = 165;
    endTxt.html("You lose! No problem, try again <br> to beat your opponents and by practising more").style("font-size", "11px").position(130, 130);
    push();
    // Message box
    {
        push();
        rectMode(CENTER);
        fill("black");
        rect(250, 200, 250, 130);
        pop();
    }
    // Show the encouragement text
    // Show player tags
    {
        textSize(15);
        fill("darkblue");
        push();
        stroke("white");
        strokeWeight(1.5);
        text("You", 130, 260);
        text("Opponent", 280, 260);
        pop();
    }
    // Define the values of formatting and show text
    {
        {
            fill("lightgreen");
            // To-do: remove below line on finalization
            plrName = "OOOOOOOO";
            croppedPlrname = plrName.slice(0, 3);
            if (plrName.length >= 3) {
                crownX = 300;
            }
            if (plrName.length > 3) {
                croppedPlrname = plrName.slice(0, 3) + "..";
                textSize(22.5);
            }
            else {
                textSize(42.5)
            }
            text(croppedPlrname, 135, 240);
        }
        {
            fill("magenta");
            // To-do: remove below line on finalization
            otherPlrName = "PPPPPPPPPPPP";
            croppedOtherPlrName = otherPlrName.slice(0, 3);
            if (otherPlrName.length >= 3) {
                cloudX = 160;
            }
            if (otherPlrName.length > 3) {
                croppedOtherPlrName = otherPlrName.slice(0, 3) + "..";
                textSize(50);
            }
            else {
                textSize(70);
            }
            text(croppedOtherPlrName, 250, 240);
        }
    }
    // Movement of the crown
    {
        push();
        translate(crownX, crownY);
        if (crownY < maxCrownY) {
            crownY += 6;
            crownRotation += 0.41;
        }
        rotate(crownRotation);
        image(crown, 0, 0, (1329 / 10 / 2.2), (980 / 10 / 2.2));
        pop();
    }
    // Movement of the cloud
    {
        if (cloudX1 < maxCloudX1) {
            cloudX1 += 6;
        }
        if (cloudX2 > maxCloudX2) {
            cloudX2 -= 5;
        }
        image(cloud, cloudX1, cloudY, (5277 / 80), (3745 / 80));
        image(cloud, cloudX2, cloudY, (5277 / 80), (3745 / 80));
    }
    pop();
    endTxt.show();
}

function stopAllSprites() {
    for (var i in allSprites) {
        allSprites[i].velocityX = 0;
        allSprites[i].velocityY = 0;
    }
}