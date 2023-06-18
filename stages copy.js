let scroll=10;
let scrollBG=0;
let runner;
let enemies = [];
let restart = false;

//counters
let score = 0;
var stagenum = 0; //어떤 function이 지금 작동해야 하는가?
//stage 0 = intro
//stage 1 = game
//stage 2 = ending

let Rimg;
let Rimg2;
let Rimg3;
let RCharacter;
let EN1img;
let BG_img;
let BGIMG;
let BGM_Sound;
let JumpingSound;
let failSound;
let scoreSound=[];
let scoreName;

function preload(){
    Rimg = loadImage('running/Alice.png');
    Rimg2 = loadImage('running/alice runner.png');
    Rimg3 = loadImage('running/Alice3.png');
    EN1img = loadImage('Obstacle objects/rabbit.png');
    BG_img = loadImage('Stages/BG_Christmas.png');
    BG_img2 = loadImage('Stages/BG_Grin.png');
    BG_img3 = loadImage('Stages/teapots.jpg');
    BGM_Sound = loadSound('Stages/AcrossThePier_VYEN.mp3');
    JumpingSound = loadSound('Stages/cartoonjump.mp3');
    failSound = loadSound('Stages/Fail.mp3');
    
    for (let i = 0; i < 3; i++) {
        scoreSound = loadSound('Stages/Yes1.mp3');
    }
}

function setup(){
    createCanvas(800,450);
    runner= new Runner();
    BGM_Sound.playMode('restart');
    BGM_Sound.setLoop(true);
    BGM_Sound.play();
    BGIMG = BG_img;
    RCharacter = Rimg;
}

// 초기화 (restart) 
function keyPressed(){
    if (restart){
        restart=false;
        score=0;
        BGIMG = BG_img
        RCharacter = Rimg;
        scrollBG=0;
        scroll=10;
        enemies=[];
        BGM_Sound.play();
        loop();
    }

    if (key ==' '){
       runner.jump();
       return false;
    }
}

// 화면 변경
function draw(){

    if (stagenum == 0){
        Intro();
    }
    
    if (stagenum == 1){
        Tutorial();
    }

    if (stagenum == 2){
        Game();
    }

    if (stagenum == 3){
        GameOver();
    }

    if (stagenum == 4){
        Ending();
    }

}


function Intro(){
    fill(250);
    noStroke();
    rect(0,0,width,height);
    
    textAlign(CENTER);
    fill(255, 192, 0);
    textSize(50);
    textFont('Broadway');
    text('Karma Runner',width/2, height/2-80);
    
    textSize(20);
    textFont('helvetica')
    text('Are you ready to run?', 
    width/2, height/2);
    text('Press Enter to start', width/2, height/2+25);
    text('by KKJ', width/2, height/2+50);

    if (keyCode === SPACE){
        stagenum = 1;
    }
}


function Tutorial(){
    fill(250);
    noStroke();
    rect(0,0,width,height);
    
    textAlign(CENTER);
    fill(255, 192, 0);
    textSize(50);
    textFont('Broadway');
    text('Tutorial',width/2, height/2-80);
    
    textSize(20);
    textFont('helvetica')
    text('Are you ready to run?', 
    width/2, height/2);
    text('Press Enter to start', width/2, height/2+25);
    text('by KKJ', width/2, height/2+50);

    if (keyCode === ENTER){
        stagenum = 2;
    }
}


function GameOver(){
    //restart = true;
    fill(250);
    noStroke();
    rect(0,0,width,height);

    fill(0);
    textAlign(CENTER);
    textSize(50);
    textFont('Broadway');
    text('GAME OVER', width/2, height/2-20);

    textSize(20);
    textFont('helvetica');
    text('press esc to go back to main menu', 
    width/2, height/2+30);

    if (keyCode === ESCAPE){
        stagenum = 0;
    };
}


function Ending(){
    noLoop();
    restart = true;
    fill(250);
    noStroke();
    rect(0,0,width,height);
    
    textAlign(CENTER);
    fill(255, 192, 0);
    textSize(50);
    textFont('Broadway');
    text('The End',width/2, height/2-80);
    
    textSize(20);
    textFont('helvetica')
    text('Did you enjoy your run?', 
    width/2, height/2);
    text('Press ESC twice to go again', width/2, height/2+25);
    text('by KKJ', width/2, height/2+50);

    if (keyCode === ESCAPE){
        stagenum = 0;
    }
}


function Game(){
    image(BGIMG,-scrollBG,0,width,height);
    image(BGIMG,-scrollBG + width, 0, width, height);
    
    if (scrollBG > width){
        scrollBG =0;
    }

    if (random(1)<0.75 && frameCount % 60 ==0){
        enemies.push(new Enemy());
    }

    if (score % 100 == 0 && score != 0){
        scoreSound.play();
        scoreSound.setVolume(0.5)
    }
  
    if (frameCount % 5 == 0){
        score++;
        // frameCount --> 지나간 프레임수, 60 = 1초
        // % --> Modulo operator, 숫자를 나누고 나머지를 내놓는다.
        // frameCount를 5로 나눈 나머지가 0이면 점수를 1씩 올린다
    } 
    // 왼쪽 상단 점수표기
    fill(0);
    textAlign(LEFT);
    textSize(20);
    textFont('helvetica');
    text('STEPS: '+ score, 20, 30);

    if (score > 100 && score < 201){ 
        BGIMG = BG_img2;
    }
    else if (score >= 201 && score <= 301){
        BGIMG = BG_img3;
    }
    else if (score > 301){
        stagenum = 4;
    }

    // 충돌시 게임 오버
    for (let e of enemies){
        e.move();
        e.show();
        if (runner.hits(e)){
            stagenum = 3;
            noLoop()
            BGM_Sound.stop();
            failSound.play();
            //fill(0);
            //text('Game Over, Press Space to Retry', width/2, height/2);
            restart = true;
        }
    }
    
    runner.show();
    runner.move();

    scroll += 0.0005;
    scrollBG += scroll/5;

} //game end