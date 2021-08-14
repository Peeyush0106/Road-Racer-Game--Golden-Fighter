// Initial Variable Declaration
var road, fuelLeft, fuelShow,
    stars, startTimerShow, rightEdgeX, leftEdgeX, laneX,
    edgesLev1, rightEdgeLev1, leftEdgeLev1, startCounter, touchingCounter,
    gameState, distanceTravelled, finishLine, playerCar, blueCars, redCars, cancelAllCommands,
    fuelCars, collidedBlueCars, collidedRedCars, sec, nameInp, carShowFlag1, carShowFlag2,
    maxBlueCars, maxRedCars, maxfuelCars, canvas, nameChecked, gameReadyToPlay, carShowFlags,
    blueCarVelocity, redCarVelocity, fuelCarVelocity, database, plrName, plrNameAlreadyTaken, nameText, pwdText, playersEntered, playerCount, playCliked, playerData, unloading,
    passwordStatus, loginAndPlay, gameStarted, waitingTxt, plrCntDecreased, giveUp,
    blueCarSpacing, redCarSpacing, fuelCarSpacing, img1, img2, img3, img4, plrIndex, cancelCheckingOtherPlayerLoosing, showedWinMessage, winTxt, crown, crownX, crownRotation,
    crownY, img5, img6, img7, img8, img9, img10, img11, img12, bgIMG, yellowCarIMG, secondTimeDiff, goIMG, finalFlagPathShowIMG, finLineIMG, fuelCarIMG, fuelIMG, timerIMG, timer1IMG, timer2IMG, timer3IMG, gameLoaded, imgLoads, otherPlrIndex, otherPlrLost, myLooseSent, giveUpSet, cloud, looser, playInfoSet;

function preload() {
    gameLoaded = false;
    imgLoads = [];
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
    goIMG = loadImage("images/go.png");
    crown = loadImage("images/crown.webp");
    cloud = loadImage("images/cloud.jpg");
}

function setup() {
    createCanvas(500, 400);
    // Database setup
    database = firebase.database();
    // Initial Variable Declaration
    road = createSprite(200, 220);
    bgIMG.width = 400;
    bgIMG.height = 600;
    road.addImage("image", bgIMG);
    road.width = 400;
    road.height = 600;

    carShowFlags = [];
    map1 = makeMap(10, 360, img9, 0.08, null,
        10, 20, finalFlagPathShowIMG, 0.08, 45);
    carShowFlag1 = carShowFlags[0];
    carShowFlag2 = carShowFlags[1];

    fuelLeft = 500000;
    fuelShow = 0;

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

    stars = 12;
    gameStarted = false;
    plrCntDecreased = false;
    myLooseSent = false;
    giveUpSet = false;
    cancelCheckingOtherPlayerLoosing = false;
    showedWinMessage = false;
    playInfoSet = false;

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

    startTimerShow = createSprite(225, 200);
    startTimerShow.visible = false;
    goIMG.width = 144;
    goIMG.height = 81.8;

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
    redCarVelocity = random(5, 7);
    fuelCarVelocity = random(4.5, 6.5);

    blueCarSpacing = 500;
    redCarSpacing = 500;
    fuelCarSpacing = 1150;

    nameChecked = false;

    inputName = createInput("").attribute("type", "text").attribute("onkeydown", "return alphaOnly(event);").size(80).attribute("maxlength", 10).position(150, 30).style("background-color", "yellow");

    inputPassword = createInput().attribute("type", "password").size(80).position(150, 55).style("background-color", "yellow");

    nameText = createElement("h5").position(10, 10).html("Your gaming name: ");
    pwdText = createElement("h4").position(10, 35).html("Your password: ");

    info_text = createElement('h5').position(10, 70).html("If you want to create a new account, click on 'Create a new account'");

    info_text2 = createElement('h6').position(10, 85).html("If you want to resume an account, just enter the earlier details and 'Login and Start Playing'. :)").style("font-size", "10px");

    waitingTxt = createElement('h5').position(10, 70).html("Waiting for another player...").hide();

    winTxt = createElement('h5').position(145, 120).style("color", "red").html("You win!!! Amazing drving.. <br> You can continue playing if you want.").hide();

    createAccount = createButton("Create a new account").position(250, 30).style("background-color", "red").style("color", "white").mousePressed(function () {
        if (!cancelAllCommands) {
            plrNameAlreadyTaken = false;
            nameChecked = false;
            plrName = inputName.value();
            checkPasswordAndNameErr();
            checkNameExistence(plrName);
            putMeInWaitingRoom();
        }
    });
    loginAndPlay = createButton("Login and Start Playing").position(250, 55).style("background-color", "blue").style("color", "white").mousePressed(function () {
        if (!cancelAllCommands) {
            if (playerCount === 0) {
                database.ref("Playing").remove();
            }
            plrName = inputName.value();
            var pwd = inputPassword.value();
            checkPasswordAndNameErr();
            checkPasswordCorrect(plrName, pwd);
            putMeInWaitingRoom();
            playCliked = true;
            plrIndex = playerCount;
            if (plrIndex === 1) {
                otherPlrIndex = 2;
            }
            if (plrIndex === 2) {
                otherPlrIndex = 1;
            }
            alert(plrIndex, otherPlrIndex);
        }
    });
    giveUp = createButton("Give Up").position(360, 350).style("background-color", "red").style("color", "white").mousePressed(function () {
        if (gameState !== "waiting") {
            if (confirm("Are you sure you want to give up?")) {
                console.log("Give up");
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

    createWorldVehicles();
    if (imgLoads.length === 24 && gameReadyToPlay) {
        gameLoaded = true;
    }
    sec = 0;
    // Settng initial playerCount
    playerCount = 0;
}