let scroll=10;
let scrollBG=0;
let runner;
let enemies = [];
let flyingcats = [];
let restart = false;

//counters
let score = 0;
var stagenum = 0; //어떤 function이 지금 작동해야 하는가?
//stage 0 = intro, stage 1 = game, stage 2 = ending

let Rimg;
let Rimg2;
let Rimg3;
let RCharacter;
let Rrun1;
let Rrun2;
let Rrun3;
let EN1img;
let EN2img;
let EN1_2img;
let EN2_2img;
let ENCharacter;
let ENCharacter2;
let BG_img;
let BGIMG;
let BGM_Sound;
let JumpingSound;
let failSound;
let levupSound;
let scoreSound=[];
let scoreName;

function preload(){
    Rimg = loadImage('running/Rab1.png');
    Rimg2 = loadImage('running/Rab2.png');
    Rimg3 = loadImage('running/Rab3.png');
    //Rrun1 = loadAnimation("running/Rab1.png","running/Rab1_2.png","running/Rab1_3.png" )
    EN1img = loadImage('Obstacle objects/rabbit.png');
    EN2img = loadImage('Obstacle objects/arrow.png');
    EN1_2img = loadImage('Obstacle objects/nordic.png');
    EN2_2img = loadImage('Obstacle objects/bird.png');
    EN1_3img = loadImage('Obstacle objects/MadHatter.png');
    EN2_3img = loadImage('Obstacle objects/Cat.png');
    BG_img = loadImage('Stages/BG_sky.jpg');
    BG_img2 = loadImage('Stages/BG_misty.jpg');
    BG_img3 = loadImage('Stages/BG_evening.jpg');
    BG_img4 = loadImage('Stages/BG_rainbow.jpg');
    BGM_Sound = loadSound('Stages/AcrossThePier_VYEN.mp3');
    JumpingSound = loadSound('Stages/cartoonjump.mp3');
    failSound = loadSound('Stages/Fail.mp3');
    levupSound = loadSound('Stages/levup.mp3');
    scoreSound = loadSound('Stages/Yes1.mp3');
    
    //for (let i = 0; i < 3; i++) {
    //}
}

function setup(){
    createCanvas(800,450);
    runner= new Runner();
    BGM_Sound.playMode('restart');
    BGM_Sound.setLoop(true);
    BGM_Sound.play();
    BGIMG = BG_img;
    RCharacter = Rimg;
    ENCharacter = EN1img
    ENCharacter2 = EN2img
}

// 초기화 (restart) 
function keyPressed(){
    if (restart){
        restart=false;
        score=0;
        BGIMG = BG_img
        RCharacter = Rimg;
        ENCharacter = EN1img;
        ENCharacter2 = EN2img;
        scrollBG=0;
        scroll=10;
        enemies=[];
        flyingcats=[];
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
        Tuto();
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
    fill(20);
    noStroke();
    rect(0,0,width,height);
    
    textAlign(CENTER);
    //fill(255, 192, 0);
    
    fill(random(250),random(250),random(250));
    textSize(60);
    textFont('Broadway');
    text('KARMA RUNNER:',width/2, height/2-70);
    textSize(35);
    text('TO THE END OF THE RAINBOW', width/2, height/2-30);
    
    //fill(255, 192, 0);
    fill(245,245,245);
    textSize(18);
    textFont('helvetica')
    text('Designed by Kijune', width/2, height/2+50);
    text('Press ENTER to PLAY', width/2, height/2+80);
    text('Press SHIFT to see TUTORIAL', width/2, height/2+110);
    

    if (keyCode === SHIFT){
        stagenum = 1;
    }

    if (keyCode === ENTER){
        stagenum = 2;
    }
}


function Tuto(){
    fill(20);
    noStroke();
    rect(0,0,width,height);
    
    // 제목: 튜토리얼
    textAlign(CENTER);
    fill(245,245,245);
    textSize(60);
    textFont('Broadway');
    text('Tutorial',width/2, height/2-150);
    
    // 스토리 설명, 조작법 설명
    fill(245,245,245);
    textSize(18);
    textFont('helvetica');
    textLeading(30);
    text('In the land of faeries there is a myth about hidden treasure that lies \n at the end of the rainbow. Our foolish but courageous little hero is planning to \n face the terrifying unknown and reach the rainbows end. Are you willing to help?',
     width/2, height/2-90);

    text('[HOW TO PLAY]', width/2, height/2+30);
    text('Press SPACE to JUMP', width/2, height/2+60);
    text('GAMEOVER if you COLLIDE with OBSTACLES', width/2, height/2+90);

    // 스테이지 넘어가기  
    fill(245,245,245);
    textSize(18);
    textFont('helvetica')
    text('[READY TO RUN?]', width/2, height-60);
    text('Press ENTER to PLAY /// ESC to MENU', width/2, height-30);

    if (keyCode === ESCAPE){
        stagenum = 0;
    }

    if (keyCode === ENTER){
        stagenum = 2;
    }
}


function GameOver(){
    fill(20);
    noStroke();
    rect(0,0,width,height);

    // 제목: 게임오버
    fill(242);
    textAlign(CENTER);
    textSize(60);
    textFont('Broadway');
    text('GAME OVER', width/2, height/2-80);

    textSize(18);
    textFont('helvetica');
    text('The attempt failed, but the Rabbit comforted you \n that the journey itself was the reward. \n Was it?', 
    width/2, height/2-30);
    
    // 다른 스테이지로 넘어가기
    text('press ESC to go back to the MAIN MENU', 
    width/2, height/2+150);

    if (keyCode === ESCAPE){
        stagenum = 0;
    };
}


function Ending(){
    noLoop();
    restart = true;
    fill(20);
    noStroke();
    //background(BG_img4);
    //fill(0,170);
    //rect(250,80,300,290);
    rect(0,0,width,height);
    
    textAlign(CENTER);
    //fill(255, 192, 0);
    fill(245,245,245);
    textSize(60);
    textFont('Broadway');
    text('The End',width/2, height/2-80);

    textSize(18);
    fill(245,245,245);
    textFont('helvetica');
    text('You helped the Rabbit reach the end of the Rainbow. \n There was a box, but nothing was inside except \n a memo saying "the journey is the reward. \n The scenery was beautiful, dont you agree?"', width/2, height/2-30);
    text('Did you enjoy your run?', width/2, height/2+150);
    text('Press ESC twice to PLAY AGAIN', width/2, height/2+180);

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

    if (random(1)<0.4 && frameCount % 90 ==0){
        flyingcats.push(new Flyingcat());
    }
   
    // 점수가 100, 200, 300...일 때 (0은 제외) 소리 Yes, yes! 재생. 
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
            restart = true;
        }
    }

    for (let f of flyingcats){
        f.move();
        f.show();
        if (runner.hits(f)){
            stagenum = 3;
            noLoop()
            BGM_Sound.stop();
            failSound.play();
            restart = true;
        }
    }


    runner.show();
    runner.move();

    scroll += 0.0005;
    scrollBG += scroll/5;

} //game end