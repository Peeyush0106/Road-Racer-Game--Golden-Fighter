// Initial Variable Declaration
var road, fuelLeft, fuelShow, startTimerShow, rightEdgeX, leftEdgeX, laneX,
    edges, rightEdge, leftEdge, startCounter, touchingCounter,
    gameState, distanceTravelled, finishLine, playerCar, otherCars, cancelAllCommands,
    fuelCars, collidedOtherCars, sec, nameInp, carShowFlag1, carShowFlag2,
    maxOtherCars, maxfuelCars, canvas, nameChecked, gameReadyToPlay, carShowFlags,
    otherCarVelocity, fuelCarVelocity, database, plrName, plrNameAlreadyTaken, nameText, pwdText, playerCount, playCliked, playerData, unloading, upArrow, downArrow, leftArrow, rightArrow,
    passwordStatus, loginAndPlay, gameStarted, waitingTxt, plrCountUpdated, giveUp,
    otherCarSpacing, fuelCarSpacing, img1, img2, img3, img4, plrIndex, cancelCheckingOtherPlayerLoosing, showedWinMessage, endTxt, crown, crownX, crownRotation, canvas, loggedIn, fuelAlert, gotOtherPlrName,
    crownY, img5, img6, img7, img8, img9, img10, img11, img12, bgIMG, yellowCarIMG, secondTimeDiff, goIMG, finalFlagPathShowIMG, finLineIMG, fuelCarIMG, fuelIMG, timerIMG, timer1IMG, timer2IMG, timer3IMG, gameLoaded, imgLoads, otherPlrIndex, otherPlrLost, myLoseSent, giveUpSet, cloud, loser, playInfoSet, animalsSong, paradiseSong, msgPositionsSet, cancelGameMovement, leavingGame, gameImg, logo, connected, playParadiseSong, fuelLeftPercentage, oppsFuelLeft, showedOhhYouLostAlert, playerCarOther;

function preload() {
    gameLoaded = false;
    imgLoads = [];
    // images loading
    img1 = loadImage("images/1.png", gameIsLoaded());
    img2 = loadImage("images/2.png", gameIsLoaded());
    img3 = loadImage("images/3.png", gameIsLoaded());
    img4 = loadImage("images/4.png", gameIsLoaded());
    img5 = loadImage("images/5.png", gameIsLoaded());
    img6 = loadImage("images/6.png", gameIsLoaded());
    img7 = loadImage("images/7.png", gameIsLoaded());
    img8 = loadImage("images/8.png", gameIsLoaded());
    img9 = loadImage("images/9.png", gameIsLoaded());
    img10 = loadImage("images/10.png", gameIsLoaded());
    img11 = loadImage("images/11.png", gameIsLoaded());
    img12 = loadImage("images/12.png", gameIsLoaded());
    bgIMG = loadImage("images/bgimage.png", gameIsLoaded());
    yellowCarIMG = loadImage("images/car.png", gameIsLoaded());
    finLineIMG = loadImage("images/finish_line.png", gameIsLoaded());
    finalFlagPathShowIMG = loadImage("images/finishflag.png", gameIsLoaded());
    fuelCarIMG = loadImage("images/symplusfuelcar.png", gameIsLoaded());
    fuelIMG = loadImage("images/symplusfuelcar.png", gameIsLoaded());
    timer3IMG = loadImage("images/3-timer.png", gameIsLoaded());
    timer2IMG = loadImage("images/2-timer.png", gameIsLoaded());
    timer1IMG = loadImage("images/1-timer.png", gameIsLoaded());
    goIMG = loadImage("images/go.png", gameIsLoaded());
    crown = loadImage("images/crown.webp", gameIsLoaded());
    cloud = loadImage("images/cloud.jpg", gameIsLoaded());
    gameImg = loadImage("images/Game-img.png", gameIsLoaded());
    logo = loadImage("images/logo.png", gameIsLoaded());

    // loading sounds
    alertSnd = loadSound("sounds/alert.wav");
    fuelReloadSnd = loadSound("sounds/fuel-reload.wav");
    paradiseSong = loadSound("sounds/Burnout-Paradise-Theme-Song.mp3");
    animalsSong = loadSound("sounds/Martin Garrix-Animals.mp3");
}

function setup() {
    alertSnd.setVolume(5);
    fuelReloadSnd.setVolume(5);
    paradiseSong.setVolume(0.3);
    animalsSong.setVolume(0.45);

    createCanvas(500, 400);
    // IMPORTANT: I had tried making a function named alertMsg which included 2 lines of code, one of the sound, and the other of the alert(<<massage>>);. The normal alert message displays a notification with a 'Ok' button, but with a 3rd party function, if showed the 'Cancel' otpion also, so I rempved that function and used the normal alert to avoid unnecessary buttons.
    alertSnd.play();
    // Alerting the player for the ways as to how to go further and get in the game.
    // IMPORTANT: The two arrows have not been indented because they were getting indented in the alert as well
    alert(`Hello! Welcome to Road Racing Game. Please read this message carefully to understand the game. 
---> If you want to create a new account, click on 'Create a new account'
---> If you want to resume an account, just enter the earlier details and 'Login and Start Playing'. :) Hope you will enjoy this game. Thanks for your attention.`);
    // Database setup
    database = firebase.database();
    // Initial Variable Declaration
    // road
    road = createSprite(200, 220);
    bgIMG.width = 400;
    bgIMG.height = 600;
    road.addImage("image", bgIMG);
    road.width = 400;
    road.height = 600;

    // map at the left
    carShowFlags = [];
    map1 = makeMap(10, 360, img9, 0.08, null,
        10, 20, finalFlagPathShowIMG, 0.08, 45);
    carShowFlag1 = carShowFlags[0];
    carShowFlag2 = carShowFlags[1];

    function makeMap(x1, y1, anim1, scale1, rotate1, x2, y2, anim2, scale2, rotate2) {
        carShowFlag = createSprite(x2, y2);
        carShowFlag.addImage("image", anim2);
        carShowFlag.scale = scale2;
        carShowFlag.rotation = rotate2;

        carShowFlags.push(carShowFlag);

        var carShowPath = createSprite(x1, y1);
        carShowPath.addImage("image", anim1);
        carShowPath.scale = scale1;
        carShowPath.rotation = rotate1;

        return carShowPath;
    }

    // fuel
    fuelLeft = 500000;
    fuelShow = 0;

    // other variables used to control
    gameStarted = false;
    plrCountUpdated = false;
    myLoseSent = false;
    giveUpSet = false;
    cancelCheckingOtherPlayerLoosing = false;
    showedWinMessage = false;
    playInfoSet = false;
    msgPositionsSet = false;
    cancelGameMovement = false;
    leavingGame = false;
    showedOhhYouLostAlert = false;
    loggedIn = false;
    gotOtherPlrName = false;
    playParadiseSong = Math.random() > 0.5 ? true : false;
    startCounter = 0;
    touchingCounter = 0;
    gameState = "gettingStarted";
    distanceTravelled = 0;

    // winning animation definitions
    {
        // crown
        {
            crownX = 130;
            crownY = 50;
            crownRotation = 0;
        }
        // cloud
        {
            cloudX1 = 50;
            cloudX2 = 450;
            cloudY = 180;
        }
    }

    // timer - 3, 2, 1
    startTimerShow = createSprite(225, 200);
    startTimerShow.visible = false;
    goIMG.width = 144;
    goIMG.height = 81.8;

    // Edges
    rightEdgeX = 306;
    leftEdgeX = 137;
    laneX = [leftEdgeX + 29, 196 + 28, 251 + 26];

    edges = createGroup();
    rightEdge = createSprite(rightEdgeX, 200, 5, 400);
    leftEdge = createSprite(leftEdgeX, 200, 5, 400);
    edges.add(rightEdge);
    edges.add(leftEdge);
    edges.setVisibleEach(false);

    // Finish line
    finishLine = createSprite(220, 100);
    finishLine.visible = false;

    // Player car
    createPlayerCar();

    // World Vehicles
    otherCars = createGroup();
    fuelCars = createGroup();
    collidedOtherCars = createGroup();

    // No of other cars in game
    maxOtherCars = 16;
    maxfuelCars = 5;

    // velocities of other cars
    otherCarVelocity = random(5, 7);
    fuelCarVelocity = random(4.5, 6.5);

    // Y Offset for the starting of cars
    otherCarSpacing = 300;
    fuelCarSpacing = 750;

    nameChecked = false;

    inputName = createInput("").attribute("type", "text").attribute("onkeydown", "return alphaOnly(event);").size(80).attribute("maxlength", 10).position(150, 30).style("background-color", "yellow");

    inputPassword = createInput().attribute("type", "password").size(80).position(150, 55).style("background-color", "yellow");

    nameText = createElement("h5").position(10, 10).html("Your gaming name: ");
    pwdText = createElement("h4").position(10, 35).html("Your password: ");

    info_text = createElement("h5").position(10, 70).html("");

    info_text2 = createElement("h6").position(10, 85).html("").style("font-size", "10px");

    waitingTxt = createElement("h5").position(10, 70).html("Waiting for another player...").hide();

    endTxt = createElement("h5").position(130, 120).style("color", "red").html("You win!!! Amazing driving..").hide();

    fuelAlert = createElement("h5").position(395, 210).style("color", "red").style("background-color", "yellow");

    endGameBtn = createButton("End Game").position(200, 250).style("background-color", "red").style("color", "white").style("font-size", "10px").mousePressed(function () {
        location.reload();
    }).hide();

    createAccount = createButton("Create a new account and Start Playing").position(245, 30).style("background-color", "gray").style("color", "white").mousePressed(function () {
        if (!cancelAllCommands) {
            plrNameAlreadyTaken = false;
            nameChecked = false;
            plrName = inputName.value();
            checkPasswordAndNameErr();
            checkNameExistence(plrName);
            putMeInWaitingRoom();
            loggedIn = true;
        }
    });
    createAccount.elt.disabled = true;
    loginAndPlay = createButton("Login and Start Playing").position(245, 55).style("background-color", "gray").style("color", "white").mousePressed(function () {
        if (!cancelAllCommands) {
            if (playerCount === 0) {
                database.ref("Playing").remove();
            }
            plrName = inputName.value();
            var pwd = inputPassword.value();
            if (checkPasswordAndNameErr() && checkPasswordCorrect(plrName, pwd)) {
                console.log(checkPasswordAndNameErr());
                console.log(checkPasswordCorrect(plrName, pwd));
                putMeInWaitingRoom();
                playCliked = true;
                plrIndex = playerCount;
                if (plrIndex === 1) {
                    otherPlrIndex = 2;
                }
                if (plrIndex === 2) {
                    otherPlrIndex = 1;
                }
            }
            loggedIn = true;
        }
    });
    loginAndPlay.elt.disabled = true;
    giveUp = createButton("Give Up").position(360, 350).style("background-color", "red").style("color", "white").mousePressed(function () {
        if (gameState !== "waiting") {
            if (confirm("Are you sure you want to give up?")) {
                database.ref("Playing/players/" + plrIndex).update({
                    lost: true
                }).then(() => {
                    location.reload();
                });
            }
        }
        else {
            location.reload();
        }
    }).hide();

    createVirtualArrowKeys();

    createWorldVehicles();
    if (imgLoads.length === 26 && gameReadyToPlay) {
        gameLoaded = true;
    }
    sec = 0;
    // Settng initial playerCount
    playerCount = 0;
}