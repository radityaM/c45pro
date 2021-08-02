var player,playerStandShoot,playerWalk,playerDie;
var gameState=1;
var bolt,boltAnim,boltImg;
var boltShoot=0;
var dir=-1;
var blasterSound;
var droidWalk,droidStand,droidDie;
var playerDeadAnimationSprite;
var droidG;
var droidCount=0;
var enemyBolt,enemyShoot=0;
var rand;
var droid;
var enemiesKilled=0;

function preload(){
  playerStandShoot=loadImage("PCImg/shoot1_stand1.png");
  playerWalk=loadAnimation("PCImg/walk2.png","PCImg/walk3.png","PCImg/walk4.png","PCImg/walk5.png","PCImg/walk6.png","PCImg/walk7.png","PCImg/walk8.png","PCImg/walk1.png");
  boltImg=loadImage("bolt/blaster_bolt.png");
  //blasterSound=loadSound("blaster.wav");
  playerDie=loadAnimation("PCImg/hurt1_die1.png","PCImg/hurt2_die2.png","PCImg/hurt3_die3.png","PCImg/hurt4_die4.png","PCImg/hurt5_die5.png","PCImg/hurt6_die6.png","PCImg/hurt7_die7.png","PCImg/hurt8_die8.png","PCImg/hurt9_die9.png");
  droidStand=loadImage("DroidImg/stand_Droid.png");
  droidWalk=loadAnimation("DroidImg/walk1_Droid.png","DroidImg/walk2_Droid.png","DroidImg/walk3_Droid.png","DroidImg/walk4_Droid.png","DroidImg/walk5_Droid.png","DroidImg/walk6_Droid.png","DroidImg/walk7_Droid.png","DroidImg/walk8_Droid.png");
  droidDie=loadAnimation("DroidImg/die1_Droid.png","DroidImg/die2_Droid.png","DroidImg/die3_Droid.png","DroidImg/die4_Droid.png","DroidImg/die5_Droid.png","DroidImg/die6_Droid.png","DroidImg/die7_Droid.png","DroidImg/die8_Droid.png","DroidImg/die9_Droid.png","DroidImg/die10_Droid.png","DroidImg/die11_Droid.png","DroidImg/die12_Droid.png","DroidImg/die13_Droid.png","DroidImg/die14_Droid.png","DroidImg/die15_Droid.png");
}


//     SSSSSSSSSSSS  EEEEEEEEEEEEEEE  TTTTTTTTTTTTTTTTTTTTTT  UU             UU   PPPPPPPPPPPPPP
//    SS             EE                         TT            UU             UU   PP           PP
//   SS              EE                         TT            UU             UU   PP            PP
//  SS               EE                         TT            UU             UU   PP             PP
//   SS              EE                         TT            UU             UU   PP             PP
//    SS             EE                         TT            UU             UU   PP            PP
//     SSSSSSSS      EEEEEEEEEEE                TT            UU             UU   PP           PP
//            SS     EE                         TT            UU             UU   PPPPPPPPPPPPPP
//             SS    EE                         TT            UU             UU   PP
//              SS   EE                         TT            UU             UU   PP
//             SS    EE                         TT            UU             UU   PP
//            SS     EE                         TT             UU           UU    PP
//  SSSSSSSSSSS      EEEEEEEEEEEEEE             TT              UUUUUUUUUUUUU     PP


function setup() {
  createCanvas(800,400);
  player=createSprite(700,200);
  player.addImage("standing",playerStandShoot);
  player.scale=0.65;
  player.mirrorX(-1);

  bolt=createSprite(player.x,player.y);
  bolt.addImage(boltImg);
  bolt.visible=false;
  bolt.scale=0.7;

  enemyBolt=createSprite(-20,0);
  enemyBolt.addImage(boltImg);
  enemyBolt.visible=false;
  enemyBolt.scale=0.7;

  droid=createSprite(-20,Math.round(random(70,330)));
  droid.addAnimation("walkingEnemy",droidWalk);
  droid.scale=0.72;

  droidG=new Group();
}

function draw(){
  background(247,181,93);

  if(gameState===0){
    player.visible=false;

  }else if(gameState===1){

    if(player.y>370){
      player.y=player.y-1;
    }

    textSize(25);
    stroke(0,0,0);
    strokeWeight(1);
    fill(0,0,0);
    text("Enemies Defeated: "+enemiesKilled,40,50);

    if(keyDown("w")||keyDown("s")||keyDown("a")||keyDown("d")){
      player.addImage(playerStandShoot);
      player.changeImage(playerStandShoot);

    }else{
      player.addAnimation("walking",playerWalk);
      player.changeAnimation("walking",playerWalk);

    }

    //if(frameCount%100===0){
    //  enemyBolt.visible=false;
    //  enemyBolt.x=droid.x;
    //  enemyBolt.y=droid.y;
    //  enemyShoot=1;
    //}
//
    //if(enemyShoot===1){
    //  enemyBolt.visible=true;
    //  if((enemyBolt.x>800)===false){
    //    enemyBolt.x=enemyBolt.x+20;
    //    enemyBolt.visible=false;
    //    enemyShoot=0;
    //  }
    //}

    if(keyDown("w")&&(player.y<20===false)){
      player.y=player.y-1.5;
    }else if(keyDown("s")&&(player.y>370===false)){
      player.y=player.y+1.5;
    }

    if(keyDown("a")&&(player.x<10===false)){
      player.x=player.x-1.5;
      if(boltShoot===0){
        dir=-1; 
      }
      player.mirrorX(-1);
    }else if(keyDown("d")&&(player.x>780===false)){
      player.x=player.x+1.5;
    }

    if(keyDown("space")){
      //Add Animation/Image of the Bolt for the Clone Trooper
      if(boltShoot===0){
        //blasterSound.play();
        bolt.y=player.y-12;
        bolt.visible=true;
        bolt.x=player.x;
        boltShoot=1;
      }
      
    }

    if(boltShoot===1){

      if(dir===-1){
        bolt.x=bolt.x-50;
      }

      if(bolt.x<-10||bolt.x>810){
        boltShoot=0;
      }
    }

    if(boltShoot===0){
      bolt.visible=false;
      bolt.x=800;
      bolt.y=500;
    }

    //ENEMY BOLT CODE

    if(frameCount%100===0){
      //Add Animation/Image of the Bolt for the DR0ID
      if(enemyShoot===0){
        //blasterSound.play();
        enemyBolt.y=droid.y-8;
        enemyBolt.visible=true;
        enemyBolt.x=droid.x;
        enemyShoot=1;
      }
      
    }

    if(enemyShoot===1){

      if(dir===-1){
        enemyBolt.x=enemyBolt.x+50;
      }

      if(enemyBolt.x<-10||enemyBolt.x>810){
        enemyShoot=0;
      }
    }

    if(enemyShoot===0){
      enemyBolt.visible=false;
      enemyBolt.x=800;
      enemyBolt.y=500;
    }

    if(droid.isTouching(bolt)){
      droid.visible=false;
      bolt.visible=false;
      boltShoot=0;
      enemiesKilled=enemiesKilled+1;
      bolt.x=player.x;
      bolt.visible=true;
      droid.x=-20;
      droid.y=Math.round(random(70,330));
      droid.visible=true;
    }

    if((droid.x>770)===false){
      droid.x=droid.x+2;
    }

  }else if(gameState===2){

  }

  drawSprites();

  bolt.depth=player.depth;
  bolt.depth=bolt.depth-1;
}

function spawnDroid(){
    rand=Math.round(random(30,370));
    droid=createSprite(-20,rand);
    droid.addAnimation("walkingEnemy",droidWalk);
    droid.scale=0.72;
    droidG.add(droid);
    droidCount=droidCount+1;
}

  //           \\  //\\//\\//\\//  //              //                \\//\\//\\//
  //           \\  //              //              //              //            //
  //           \\  //              //              //              //            //
  //           \\  //              //              //              //            //
  //           \\  //              //              //              //            //
  //           \\  //              //              //              //            //
  //\\//\\//\\//\  //\\//\\//      //              //              //            //
  //           \\  //              //              //              //            //
  //           \\  //              //              //              //            //
  //           \\  //              //              //              //            //
  //           \\  //              //              //              //            //
  //           \\  //\\//\\//\\//  //\\//\\//\\//  //\\//\\//\\//    \\//\\//\\//