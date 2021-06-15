// Initial Variable Declaration
var road, fuelLeft, fuelShow, carShowPath, carShowFlag,
    stars, timeElapsed, startTimerShow, rightEdgeX, leftEdgeX, laneX,
    edgesLev1, rightEdgeLev1, leftEdgeLev1, startCounter, touchingCounter,
    gameState, distanceTravelled, finishLine, playerCar, blueCars, redCars, cancelAllCommands,
    fuelCars, collidedBlueCars, collidedRedCars, sec, nameInp,
    maxBlueCars, maxRedCars, maxfuelCars, canvas, nameChecked, gameReadyToPlay,
    blueCarVelocity, redCarVelocity, fuelCarVelocity, database, plrName, plrNameAlreadyTaken, nameText, pwdText, playersEntered, playerCount,
    passwordStatus, login,
    blueCarSpacing, redCarSpacing, fuelCarSpacing, img1, img2, img3, img4,
    img5, img6, img7, img8, img9, img10, img11, img12, bgIMG, yellowCarIMG, secondTimeDiff, goIMG,
    finalFlagPathShowIMG, finLineIMG, fuelCarIMG, fuelIMG, timerIMG, timer1IMG, timer2IMG, timer3IMG, gameLoaded, imgLoads;

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

    pathMap = showMap(15, 360, img9, 0.08, null,
        15, 20, finalFlagPathShowIMG, 0.08, 45);

    fuelLeft = 500000;
    fuelShow = 0;
    carShowPath, carShowFlag;

    stars = 12;

    timeElapsed = sec;

    function showMap(x1, y1, anim1, scale1, rotate1, x2, y2, anim2, scale2, rotate2) {
        carShowFlag = createSprite(x2, y2);
        carShowFlag.addImage("image", anim2);
        carShowFlag.scale = scale2;
        carShowFlag.rotation = rotate2;

        carShowPath = createSprite(x1, y1);
        carShowPath.addImage("image", anim1);
        carShowPath.scale = scale1;
        carShowPath.rotation = rotate1;

        return (carShowPath + carShowFlag);
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

    nameText = createElement().position(10, 30).html("Your gaming name: ");
    pwdText = createElement().position(10, 55).html("Your password: ");

    info_text = createElement('h5').position(10, 70).html("If you want to create a new account, click on 'Create a new account'");

    info_text2 = createElement('h6').position(10, 85).html("If you want to resume an account, just enter the earlier details and press 'Login'. :)");

    createAccount = createButton("Create a new account").position(250, 30).style("background-color", "red").style("color", "white").mousePressed(function () {
        plrNameAlreadyTaken = false;
        nameChecked = false;
        plrName = inputName.value();
        checkPasswordAndNameErr();
        if (!cancelAllCommands) {
            checkNameExistence(plrName);
        }
        putMeInWaitingRoom();
    });
    login = createButton("Login").position(250, 55).style("background-color", "blue").style("color", "white").mousePressed(function () {
        plrName = inputName.value();
        var pwd = inputPassword.value();
        checkPasswordAndNameErr();
        if (!cancelAllCommands) {
            checkPasswordCorrect(plrName, pwd);
        }
        putMeInWaitingRoom();
    });

    createWorldVehicles();
    if (imgLoads.length === 21 && gameReadyToPlay) {
        gameLoaded = true;
    }
    sec = 0;
    // Settng initial playerCount
    playerCount = 0;
}