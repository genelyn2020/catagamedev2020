GameState.Game = function(){
    this.playerMinAngle = -20; //minimum player rotation
    this.playerMaxAngle = 20; //maximum player rotation

    this.enemyRate = 900; //this will spawn enemy every 500ms
    this.enemyTimer = 0; //create an enemy every game loop
    this.bulletTime=0;// create a bullet every game loop     
    this.kill=0;

    this.score = 0;

    this.timer = 0;
    this.sec = 0;
    this.min = 0;
    this.Rate = 500;
    this.liv = 3;
    this.zero = 0;
    this.impostorRate = 2000;
    this.nextImpostorTime =0;

};
GameState.Game.prototype = {
    create: function(){
         //show the same animation when user tap the screen
    this.background = this.game.add.tileSprite(0, 0, this.game.width, 4170 , 'background');
    // this.background.autoScroll(-100, 0);

    this.ground = this.game.add.tileSprite(0, 619, this.game.width, 37, 'ground');
    // this.ground.autoScroll(-100, 0);

    this.player = this.add.sprite(200, this.game.height/1.3, 'player');
    // this.player = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'player');
    this.player.anchor.setTo(.5);
    this.player.scale.setTo(1.2);


    this.player.animations.add('jump', [8,4,5,6], 4, true);
    this.player.animations.add('walk', [1,2,3], 4, true);
    this.player.animations.add('slide', [11], true);
    this.player.animations.play('jump');
    //this will enable physics to our game
    this.game.physics.startSystem(Phaser.Physics.ARCADE);

     //Using the arcade physics system,we are setting the gravity in the horizontal direction of 400, the higher the value the more gravity
    this.game.physics.arcade.gravity.y = 400;
    this.game.physics.arcade.gravity.X = 400;

    this.game.physics.arcade.enableBody(this.ground); //add gravity to our ground (remember the ground key value we set in preload.js)
    this.ground.body.allowGravity = false; // we don't want our ground affected by gravity
    this.ground.body.immovable = true; // this will keep the ground stay in place
    this.ground = game.add.group();

    this.game.physics.arcade.enableBody(this.player); //apply physics to our player
    this.player.body.collideWorldBounds = true; // mahulog ang playeer(mawala sa screen) kung dili i-enable
    this.player.body.bounce.set(0.25); // we want our player to bounce when it runs

    // this.coins = this.game.add.group();
    this.enemies = this.game.add.group();
    this.impostors = game.add.group();

    this.bullets = game.add.group(); //add bullet
    this.bullets.enableBody = true; //enable ang physics sa bullet along with the player    
    this.lives = this.game.add.group();

    this.livesText = this.game.add.text(this.game.world.width - 100, 10, 'Lives: ' , {font: '34px Arial', fill: '#fff'});

        //enable physics sa bullet
    this.bullets.physicsBodyType = Phaser.Physics.ARCADE; 

    this.bullets.createMultiple(1, 'bullet');// how many bullet mugawas every press sa key
    this.bullets.callAll('events.onOutOfBounds.add', 'events.onOutOfBounds', this.resetBullet, this); //mg generate ug bullet kada press e call ang function na(resetBullet)
    this.bullets.setAll('checkWorldBounds', true); //extending sprite object
    //  Register the key.
    this.spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    this.upKey = game.input.keyboard.addKey(Phaser.Keyboard.UP)
    this.downKey = game.input.keyboard.addKey(Phaser.Keyboard.DOWN)
    this.leftKey = game.input.keyboard.addKey(Phaser.Keyboard.LEFT)
    this.rightKey = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT)

    
    this.scoreText = this.game.add.bitmapText(0,0, 'minecraftia', 'Score: 0', 32);
    this.killText = this.game.add.bitmapText(10,50, 'minecraftia', 'Kill: 0', 32); //add killtext same with sa scoretext position below Scoretext
    this.scoreText1=this.game.add.bitmapText(10,90,'minecraftia', 'time'+this.sec, 32);
  
    this.gameoverSound = this.game.add.audio('gameover');
    this.shotSound = this.game.add.audio('shot'); //add audio
    this.gameMusic = this.game.add.audio('gameMusic');
    this.deathSound = this.game.add.audio('death');
    this.gameMusic.play('', 0, true);
        
    },
    update: function(){
          this.cursors = this.input.keyboard.createCursorKeys();

           if(this.cursors.up.isDown) { 
              this.player.body.velocity.y -=20; // this will move our player to the upward motion
              this.player.play("jump");
              
          }else if(this.cursors.down.isDown) {      
            this.player.body.velocity.y +=15;
            this.player.play("slide");

          }
          if(this.cursors.left.isDown) { 
            this.player.body.velocity.x -=15; // this will move our player to the pward motion
            this.player.scale.x = -1.2;
            this.player.play("walk");

          }else if(this.cursors.right.isDown) {
            this.player.body.velocity.x +=15;
            this.player.scale.x = +1.2;
            this.player.play("walk");
          }

        if (this.enemyTimer < this.game.time.now) {
            this.createEnemy(); //create an enemy
            this.enemyTimer = this.game.time.now + this.enemyRate; //increment the enemy
        }
         if(this.timer < this.game.time.now){
            this.show();
             this.timer = this.game.time.now + this.Rate;
        }
        if (this.spaceKey.isDown){
            this.fireBullet(); //fire bullet when key is press(isDown) call function(fireBullet)
        }
         for (this.zero; this.zero <3; this.zero++){
            this.life = this.lives.create(this.game.world.width - 100+(30*this.zero), 60, 'lives')
        }
        if (this.nextImpostorTime < this.game.time.now) {
            this.generateEnemy(); //create an enemy
            this.nextImpostorTime = this.game.time.now + this.impostorRate; //increment the enemy
        }
        //we are tellin to the arcade physics to check for collision and apply appropriate physics
        this.game.physics.arcade.overlap(this.player, this.enemies, this.enemyHit, null, this);
        this.game.physics.arcade.overlap(this.enemies, this.bullets, this.enemyShot, null, this);
        this.game.physics.arcade.overlap(this.player, this.lives, this.lifeHit, null, this);
        this.game.physics.arcade.overlap(this.player, this.impostors, this.impostorHit, null, this);

    },

    generateEnemy: function(){
        var x = this.game.width; // x position

        var y = this.game.rnd.integerInRange(game.rnd.integerInRange(0, 2000 ), game.rnd.integerInRange(0, 700));

        var impostor = this.impostors.getFirstExists(false);
        if (!impostor) {
            impostor = new Impostor(this.game, 0, 0); //x,y
            this.impostors.add(impostor); 
        }
        impostor.reset(x, y); 
        impostor.revive();
    },
    shutdown: function(){
        // this.coins.destroy();
        this.enemies.destroy();
        this.bullets.destroy();
        this.lives.destroy();
        // this.coinTimer = 0;
        this.enemyTimer = 0;
        this.impostors.destroy();
        this.nextImpostorTime = 0;

        this.sec=0;
        this.min=0;
        this.timer = 0;
        this.kill = 0;
        this.zero = 0;
        this.liv =3;

        this.score = 0;
    },
    show:function(){
    this.sec++;
    if(this.sec==60){
      this.sec=0;
      this.min++;
    };
    this.scoreText1.text= +this.min+':'+this.sec;
    },
    impostorHit: function(player, impostor){
     
        var shake = new Phaser.Plugin.screen(game);
        game.plugins.add(shake);

        shake.shake(); 
        shake.shake(40); 

    },
       
    createEnemy: function(){
        var x = this.game.width; // x position
        //random enemy y position, relative to the height of the ground
        var y = this.game.rnd.integerInRange(50, this.game.world.height - 10);

        var enemy = this.enemies.getFirstExists(false);
        if (!enemy) {
            enemy = new Enemy(this.game, 0, 0); //x,y
            this.enemies.add(enemy); //add enemy if not exist
        }
        enemy.reset(x, y); //set sprite
        enemy.revive();
    },
      fireBullet:function(){ //recycle bullet and add to bullet group
        if (this.game.time.now > this.bulletTime){
        bullet = this.bullets.getFirstExists(false);

            if (bullet){
                 if(this.rightKey.isDown) {
                bullet.reset(this.player.x +6, this.player.y - 8); // position sa bullet from player
                bullet.body.velocity.x =50000; //position of bullet ug ang velocity sa ground
            }
             else if (this.leftKey.isDown) {
                bullet.reset(this.player.x -2000, this.player.y -8);
                bullet.body.velocity.x = +50000;
              }  
          }
      }
    },
    enemyHit: function(player, enemy){

        this.deathSound.play(); //play the hit sound when the player hit the enemy
        this.gameMusic.stop();  //end the game music

        life = this.lives.getFirstAlive();
        if(life)
        {
            life.kill();
        }
        this.liv --;
        enemy.kill();
        if (this.liv ==0){
            player.kill()
        
        this.enemies.setAll('body.velocity.x', 0);// we stop enemies from moving forward

        this.enemyTimer = Number.MAX_VALUE; //stop generating enemies
        this.timer=Number.MAX_VALUE;
        var scoreboard = new Scoreboard(this.game);
        scoreboard.show(this.score, this.kill, this.scoreText1.text, this.gameoverSound.play()); //new

        }
    },
    resetBullet: function(bullet){
        bullet.kill();
        this.shotSound.play();
    },
    enemyShot: function(bullet, enemy){
        this.score+=2; // add 2points to the scoree
        this.kill++; //increase our kill
        bullet.kill(); //will hide the bullet
        enemy.kill(); //will hide the enemy
        this.scoreText.text = 'Score: ' + this.score; //add the score to the board
        this.killText.text='Kill: '+ this.kill; // add the kill to the board

    }
    
};




