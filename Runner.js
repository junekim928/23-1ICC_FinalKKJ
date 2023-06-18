class Runner{
    constructor(){
        this.a = 100;
        this.x = 50;
        this.y = height-this.a;
        this.vel = 0; // 속도
        this.gra = 2; // 중력
    }

    jump(){
        if (this.y == height - this.a){
            this.vel = -25;
        }
        JumpingSound.play();
    }

    move(){
        this.y += this.vel;
        this.vel += this.gra;
        this.y = constrain(this.y, 0, height-this.a); 
        //this.y 값을 0과 천장-상자 높이 사이로 제한. 
    }

    hits(enemy){
        let x1 = this.x + this.a*0.25;
        let y1 = this.y + this.a*0.5;
        let x2= enemy.x + enemy.a*0.25;
        let y2= enemy.y + enemy.a*0.5;
        return collideCircleCircle(x1, y1, this.a/2, x2, y2, enemy.a/2);
    }

    hits(flyingcat){
        let x1 = this.x + this.a*0.5;
        let y1 = this.y + this.a*0.25;
        let x2= flyingcat.x + flyingcat.a*0.5;
        let y2= flyingcat.y + flyingcat.a*0.25;
        return collideCircleCircle(x1, y1, this.a/2, x2, y2, flyingcat.a/2);
    }

    show(){
        image(RCharacter,this.x, this.y, this.a/2, this.a);
        if (score > 150 && score < 201) {
            RCharacter = Rimg2;
            if (score > 150 && score <155){
                levupSound.play();
                levupSound.setVolume(0.5);
            }
            
        }

        else if (score >= 251){
            RCharacter = Rimg3;
            if (score > 250 && score <255){
                levupSound.play();
                levupSound.setVolume(0.5);
            }
        }
        //fill(255,50);
        //ellipseMode(CORNER);
        //ellipse(this.x, this.y, this.a/2, this.a);
    }
} 