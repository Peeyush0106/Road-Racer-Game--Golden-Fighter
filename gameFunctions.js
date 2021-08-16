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
    for (var i = 0; i < maxOtherCars; i++) {
        var otherCarLane = Math.round(random(0, 2));
        var otherCarX = laneX[otherCarLane];
        var otherCar = createSprite(otherCarX, -1 * otherCarSpacing * (i + 1));
        var otherCarAnimations = [img1, img2, img3, img4, img5, img6, img7, img8, img9, img10, img11, img12];
        var otherCarAnimationNumber = Math.round(random(0, 11));
        var otherCarChoseAnimation = otherCarAnimations[otherCarAnimationNumber];
        otherCar.addImage("image", otherCarChoseAnimation);

        if (otherCarAnimationNumber != 9
            && otherCarAnimationNumber != 10) {
            otherCar.scale = 0.14;
        }
        else {
            otherCar.scale = 0.5;
        }
        if (otherCarAnimationNumber === 0) {
            otherCar.scale = 0.2;
        }
        if (otherCarAnimationNumber === 7) {
            otherCar.scale = 0.2;
        }
        if (otherCarAnimationNumber === 4) {
            otherCar.scale = 0.3;
        }
        if (otherCarAnimationNumber === 1) {
            otherCar.scale = 0.12;
        }
        if (otherCarAnimationNumber === 2) {
            otherCar.scale = 0.15;
        }
        if (otherCarAnimationNumber === 6) {
            otherCar.scale = 0.1;
        }
        if (otherCarAnimationNumber === 5) {
            otherCar.scale = 0.1;
        }
        if (otherCarAnimationNumber === 8
            || otherCarAnimationNumber === 11
            || otherCarAnimationNumber === 3) {
            otherCar.scale = 0.1;
        }
        otherCars.add(otherCar);
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
    otherCars.setVelocityYEach(road.velocityY - otherCarVelocity);
    otherCarVelocity = random(5, 7);
    fuelCars.setVelocityYEach(road.velocityY - fuelCarVelocity);
    collidedOtherCars.destroyEach();
}

// When our car has been overtaken, reuse them ahead
function recreateOvertakenCars() {
    // For other
    for (var i = 0; i < otherCars.length; i++) {
        var otherCar = otherCars.get(i);
        if (otherCar.y > 600) {
            otherCar.y = otherCar.y - maxOtherCars * otherCarSpacing;
        }
    }

    // For Fuel
    for (var l = 0; l < maxfuelCars; l++) {
        var fuelCar = fuelCars.get(l);
        if (fuelCar.y > 600) {
            fuelCar.y = fuelCar.y - maxfuelCars * fuelCarSpacing;
        }
    }

    // Collided Other Cars
    for (var m; m < collidedOtherCars.length; m++) {
        var collidedOtherCar = collidedOtherCars.get(m);
        if (collidedOtherCar.y > 600) {
            otherCars.add(collidedOtherCar);
            collidedOtherCars.remove(collidedOtherCar);
            collidedOtherCar.y = collidedOtherCar.y - maxOtherCars * otherCarSpacing;
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
            fuelLeft = fuelLeft + 165000;
            fuelCar.y = fuelCar.y - maxfuelCars * fuelCarSpacing;
            fuelReloadSnd.play();
        }
    }
}

// Function for Fuel Reload for Other Car
function fuelReloadOtherCar() {
    for (var i = 0; i < maxfuelCars; i++) {
        var fuelCar = fuelCars.get(i);

        for (var j = 0; j < otherCars.length; j++) {
            var computerCar = otherCars.get(j);
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
        for (var j = 0; j < collidedOtherCars.length; j++) {
            var computerOtherCar = collidedOtherCars.get(j);
            if (computerOtherCar.isTouching(fuelCar)) {
                fuelCar.y = fuelCar.y - maxfuelCars * fuelCarSpacing;
            }
        }

        for (var k = 0; k < collidedOtherCars.length; k++) {
            var computerOtherCar = collidedOtherCars.get(k);
            if (computerOtherCar.isTouching(fuelCar)) {
                fuelCar.y = fuelCar.y - maxfuelCars * fuelCarSpacing;
            }
        }
    }
}

// Controlling the background
function controlBackgroundSpeed() {
    if (road.velocityY < 14.8 && gameState != "over") {
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
        if (fuelLeft > 0) {
            fuelLeft = fuelLeft - 1200;
        }
    }

    // When the up key is relased, decrease the very slowly, and fuel release become slower
    else if (gameState === "startedAndMoving" && road.velocityY > 0) {
        road.velocityY = road.velocityY - 0.1;
        if (road.velocityY < 0) {
            road.velocityY = 0;
        }
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
            return (masterPwd === password);
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
        alertMsg("Please enter a valid password");
        location.reload();
        noLoop();
    }
    if (name === "" && !cancelAllCommands) {
        cancelAllCommands = true;
        alertMsg("Please enter a valid name");
        location.reload();
        noLoop();
    }
    else {
        cancelAllCommands = false;
    }
    return (pwd === "" && !cancelAllCommands && name === "");
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
    if (gameState !== "over"
        && gameState !== "win") {
        playerCount = 0;
        database.ref("/").update({
            playerCount: playerCount
        });
        database.ref("Playing/players").remove();
        plrCntDecreased = true;
        unloading = true;
        // confirmMsg("Are you sure you want to resign?");
        // database.ref("Alerts/" + otherPlrIndex).update({
        //     otherPlrLeft: true
        // });
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
        fill("darkother");
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
            text(croppedOtherPlrName, 300, 240);
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
    crownX = 320;
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
        fill("darkother");
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
            croppedPlrname = plrName.slice(0, 3);
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
            text(croppedOtherPlrName, 300, 240);
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
    if (!showedOhhYouLostAlert) {
        alertMsg("Ohhh..  you lost, you might have lost because your fuel must have reached to 0, or the time of 100 seconds has passed. You also loose when the other player reaches to the finish line before you. Don't worry, practice more and get better and faster in tackling the cars.");
        showedOhhYouLostAlert = true;
    }
}

function stopAllSprites() {
    for (var i in allSprites) {
        allSprites[i].velocityX = 0;
        allSprites[i].velocityY = 0;
    }
}

function loseOtherPlayer() {
    database.ref("Playing/players/" + otherPlrIndex).update({
        otherPlrWon: true
    });
}

function checkIfOtherPlayerWonAndThenLoseMe() {
    database.ref("Playing/players/" + plrIndex + "/otherPlrWon").get().then((data) => {
        if (data.exists()) {
            showLoseMessage();
        }
    });
}

function checkIfOtherPlayerLeftAndThenLeaveMyGame() {
    database.ref("Alerts/" + plrIndex + "/otherPlrLeft").get().then((data) => {
        if (data.exists()) {
            alertMsg("You win!! The other player has resigned, even you will have to end this game.");
            location.reload();
        }
    });
}

function getOtherPlrName() {
    database.ref("Playing/players/" + otherPlrIndex).get().then((data) => {
        if (data.exists()) {
            otherPlrName = data.val().name;
            gotOtherPlrName = true;
        }
    });
}

function alertMsg(message) {
    alertSnd.play();
    alert(message);
}

function alertMsg(message) {
    alertSnd.play();
    confirm(message);
}

function updateMyFuelLeft() {
    fuelLeftPercentage = ((fuelLeft * 100) / 500000);
    database.ref("Playing/players/" + plrIndex).update({
        fuelLeftPercentage: fuelLeftPercentage
    });
}

function getOppsFuelLeft() {
    database.ref("Playing/players/" + otherPlrIndex).get().then(function (data) {
        if (data.exists()) {
            oppsFuelLeft = data.val().fuelLeftPercentage;
        }
    });
}

function checkConnection() {
    // Check if we are connected to the internet or not.
    var connectedRef = firebase.database().ref(".info/connected");
    connectedRef.on("value", function (snap) {
        connected = snap.val();
        if (connected) {
            showContentForNotLoaded = false;
            if (gameState === "wasWaitingAndDisconnected") {
                gameState = "waiting";
                // Show some text of motivation to player who wanted to play but couldn't because of his/her network and has recovered his internet condition.
                alert("Success! You have now back to the game and our little car is very happy to get a driver like you that wins every time! Let's make her more happy by winning one more challengin' race!");
            }
        }
        else {
            showContentForNotLoaded = true;
        }
    });
}

function isUserOnTouchScreenDevice() {
    return (window.matchMedia("(pointer: coarse)").matches)
}

function createVirtualArrowKeys() {
    upArrow = createButton("🠕").position(250, 400).style("background-color", "black").style("color", "white").style("font-size", "35px").mousePressed(function () {
        if (gameState != "over" && gameState != "win") {
            controlBackgroundSpeed();
            if (fuelLeft > 0) {
                fuelLeft = fuelLeft - 1200;
            }
        }
    });
    downArrow = createButton("🠗").position(250, 451.5).style("background-color", "black").style("color", "white").style("font-size", "35px").mousePressed(function () {
        graduallyDecreaseSpeed();
    });
    leftArrow = createButton("🠔").position(202, 452).style("background-color", "black").style("color", "white").style("font-size", "35px").mousePressed(function () {
        if (gameState != "over" && gameState != "win") {
            playerCar.x -= ((road.velocityY / 2));
        }
    });
    rightArrow = createButton("🠖").position(283, 452).style("background-color", "black").style("color", "white").style("font-size", "35px").mousePressed(function () {
        if (gameState != "over" && gameState != "win") {
            playerCar.x += ((road.velocityY / 2));
        }
    });
    toggleHiddenArrows(true);
}

function toggleHiddenArrows(show) {
    if (show && isUserOnTouchScreenDevice()) {
        upArrow.hide();
        downArrow.hide();
        leftArrow.hide();
        rightArrow.hide();
    }
    else if (!show) {
        upArrow.hide();
        downArrow.hide();
        leftArrow.hide();
        rightArrow.hide();
    }
}