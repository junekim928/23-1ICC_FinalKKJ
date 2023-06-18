class Enemy {

    constructor(){
        this.a = 100;
        this.x = width;
        this.y = height-this.a;
    }

    move(){
        this.x-=scroll;
    }

    show(){
        image(ENCharacter, this.x, this.y, this.a*0.5, this.a);
        if (score > 150 && score < 201) {
            ENCharacter = EN1_2img;
        }

        else if (score >= 251){
            ENCharacter = EN1_3img;
            }
        //fill(255,50);
        //ellipseMode(CORNER);
        //ellipse(this.x, this.y, this.a/2, this.a);
    }
}