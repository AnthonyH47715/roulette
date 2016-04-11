'use strict';

(function () {
    //2 default numbers are set. the amount of available shots (6) and  passes (2)

    var STARTING_SHOTS = 6;
    var shotsLeft = STARTING_SHOTS;
    var statusEl;
    var STARTING_PASSES = 2;
    var passesLeft = STARTING_PASSES;

    function onShootButtonClicked() {

        var rand = Math.random();
        var shotHitTargetChance = 1 / shotsLeft;

        //if a random numer is less than the chance to hit then it counts as a hit and the game ends
        //the other option is a 'miss'

        if (rand <= shotHitTargetChance) {
            shotsInfo.innerHTML = ' HIT';
            console.log('TARGET HIT');
            endTheGame();
            shotsLeft = STARTING_SHOTS;
        } else {
            shotsInfo.innerHTML +=(' MISSED');
        }
        //after a shot a attempt chance is taken away
        shotsLeft--;
        shotsList.innerHTML = shotsLeft;
        //if there are no attempts left the game ends
        if (shotsLeft === 0) {
            targetInfo.innerHTML = 'You live - Press reset';
        }
    }
      //a player has 2 chances to pass with no risk
    function onPassButtonClicked() {

        if (passesLeft > 0) {
           passesLeft--;
            shotsInfo.innerHTML += (' PASS');
            shotsLeft--;
            shotsList.innerHTML = shotsLeft;
            if (shotsLeft === 0) {
                targetInfo.innerHTML = 'You win so reset';
                myPic.width=250;
                myPic.height=125;
            }
        } else {};
    }

    function onResetButtonClicked() {
        resetAction();
    }
     //all variables and text are returned to default
    function resetAction() {
        console.log('Restarting the game...');
        shotsLeft = STARTING_SHOTS;
        passesLeft = STARTING_PASSES
        shotsList.innerHTML = STARTING_SHOTS;
        statusEl.innerHTML = 'New Game';
        shotsInfo.innerHTML = '';
        targetInfo.innerHTML = 'In Mortal Peril';
        myPic.width=200;
        myPic.height=100;


    }
    //when a shot hits the game ends in a loss. a sounds plays and text changes
    //this requires the player to press reset to play again and this is noted
    function endTheGame() {
        statusEl.innerHTML = ('GAME OVER');
        targetInfo.innerHTML = ('A Mortal Husk - Reset Required');
        myPic.width=100;
        myPic.height=50;
        playSound();
    }
     //a sound is played when the game ends (a simple beep)
    function playSound(){
        var thissound=document.getElementById("beeps")
        thissound.play();
    }

     //button handlers are set
    function initialize() {

        var picture = document.getElementById("myPic");
        var shootBtn = document.getElementById('shoot-button');
        var passBtn = document.getElementById('pass-button');
        var resetBtn = document.getElementById('reset-button');

        statusEl = document.getElementById('statusEl');

        shootBtn.onclick = onShootButtonClicked;
        passBtn.onclick = onPassButtonClicked;
        resetBtn.onclick = onResetButtonClicked;
        resetAction();
    }
      //this solved a problem with the program not initializing the button handlers properly
      //if the state of this document is 'loading' the program is forced to initialize
      //if the program is not loading its still forced to initialize
    if (document.readyState === 'loading') {
        window.onload = initialize;
    } else {
        initialize();
    }
})();