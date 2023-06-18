class Flyingcat {

    constructor(){
        this.a = 100;
        this.x = width;
        this.y = height-this.a*2;
    }

    move(){
        this.x-=scroll;
    }

    show(){
        image(ENCharacter2, this.x, this.y, this.a, this.a*0.5);
        if (score > 150 && score < 201) {
            ENCharacter2 = EN2_2img;
        }

        else if (score >= 251){
            ENCharacter2 = EN2_3img;
            }
        //fill(255,50);
        //rect(this.x, this.y, this.a*0.5, this.a);
        //ellipseMode(CORNER);
        //ellipse(this.x, this.y, this.a, this.a/2);
    }
}