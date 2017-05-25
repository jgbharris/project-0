/* global responsiveVoice */

// CONSTANTS ETC //

var cfour = cfour || {};


cfour.askPlayerName1 = prompt('Player 1 please enter your name?');
cfour.askPlayerName2 = prompt('Player 2 please enter your name?');
cfour.turnCounter = null;
cfour.vWin = 'vertical win';
cfour.winSound = 'win';
cfour.vWinBackground = 'taco.gif';
cfour.hWin = 'horizontal win';
cfour.hWinBackground = 'mandance.gif';
cfour.dWin = 'diagonal win';
cfour.dWinBackground = 'celebration.gif';
cfour.sunBgFile = 'sunbackground.gif';
cfour.tronBgFile = 'tronwallpaper.png';
cfour.triangleBgFile = 'lasertriangle.gif';



cfour.victory = function victory (A,B,C) {
  console.log(`${A}`);
  responsiveVoice.speak(`${A}`);
  this.$audio2.src = `sounds/${B}.wav`;
  this.$audio2.play();
  this.$audio.pause();
  this.$playerDisplay.html(`${A}`);
  this.$body.css('background-image', `url(public/css/${C})`);
};

cfour.changeBackground = function changeBackground (D) {
  console.log('change background!');
  this.$body.css('background-image', `url(public/css/${D})`);
};

cfour.setupGame = function setupGame() {
  this.$startgame.slideDown(200);
  this.$stopMusic.slideDown(200);
  this.$resetButton.slideDown(200);
};

cfour.backgroundOptions = function backgroundOptions() {
  this.$sunBackground.slideDown(200);
  this.$tronBackground.slideDown(200);
  this.$triangleBackground.slideDown(200);
};

cfour.startGame = function startGame () {
  console.log('clicked');
  this.$audio.src = 'sounds/arcadefunk.mp3';
  this.$audio.play();
  responsiveVoice.speak(`Hello ${cfour.askPlayerName1} and ${cfour.askPlayerName2}, welcome to funky laser connect 4, I am the game master, begin!`);
};

cfour.stopMusic = function stopMusic () {
  console.log('stop music!');
  this.$audio.pause();
};

cfour.resetButton = function resetButton () {
  this.$cells.html('');
  this.$playerDisplay.html('win display');
  this.$cells.removeClass('pink blue playable');
  this.$cells.addClass('notplayable');
  const indices = [35,36,37,38,39,40,41];
  indices.forEach((index)=>{
    this.$cells.eq(index).removeClass('notplayable').addClass('playable');
  });
  this.changeBackground(this.triangleBgFile);
};

cfour.sunBackground = function sunBackground () {
  this.changeBackground(this.sunBgFile);
};

cfour.tronBackground = function tronBackground   () {
  this.changeBackground(this.tronBgFile);
};

cfour.triangleBackground = function triangleBackground () {
  this.changeBackground(this.triangleBgFile);
};

// CLICK ON SQUARE: PUTS X OR O IN SQUARE, CHANGES COLOR,  ADDS 1 TO TURN COUNTER, MAKES SQUARE UNPLAYABLE (CAN'T PLACE ANOTHER PIECE ON SQUARE) AND MAKES SQUARE ABOVE PLAYABLE

cfour.squareClick = function squareClick (e) {
  console.log('clikety click');
  const color = this.turnCounter % 2 === 0 ? 'blue' : 'pink';
  const counter = this.turnCounter % 2 === 0 ? 'X' : 'O';
  if ($(e.target).hasClass('playable')) {
    const index = $(e.target).index();
    $(e.target).html(counter);
    $(e.target).addClass(color);
    $(e.target).removeClass('playable');
    $(e.target).addClass('notplayable');
    this.$cells.eq(index -7).removeClass('notplayable').addClass('playable');
    this.turnCounter++;
    this.checkForWin(index);
    this.$audio1.src = 'sounds/boing1.wav';
    this.$audio1.play();
  }
};

  // WIN CONDITIONS //


cfour.checkForWin = function checkForWin(index) {
  // VERTICAL WIN CHECK - AS YOU CLICK TO PLACE YOUR COLOUR, CHECKS FOR MATCHING COLOURS IN THE SQUARES BELOW, ACHIEVED BY ADDING THE WIDTH OFG THE BOARD (7) TO THE INDEX NUMBER OF THE SQUARE YOU CLICKED ON//

  console.log('index', index, cfour.$cells.eq(index+7));

  // const currentIndex = $(e.target).index();
  // console.log($cells.eq(index+7).html());
  if (this.$cells.eq(index).html() === this.$cells.eq(index+7).html() &&
  this.$cells.eq(index+7).html() === this.$cells.eq(index+14).html() &&
  this.$cells.eq(index+14).html() === this.$cells.eq(index+21).html()) {
    this.victory(this.vWin,this.winSound,this.vWinBackground);
  }


  // DIAGONAL WIN CHECK- DIAGONAL SQUARES ARE ON THE WIDTH OF THE BOARD (7) PLUS OR MINUS ONE. AS YOU GO VERTICALLY UP THE BOARD WHILE PLAYING, THE INDEX OF THE SQUARE YOU CLICK ON WILL BE LOWER, THEREFORE WE NEED TO CHECK THE SQUARES FURTHER UP THE INDEX, HENCE THE CHECKS ARE POSITIVE IN EITHER MULTIPLES OF 6(7-1) OR 8(7+1).

  if (this.$cells.eq(index).html() === this.$cells.eq(index+6).html() &&
  this.$cells.eq(index+6).html() === this.$cells.eq(index+12).html() &&
  this.$cells.eq(index+12).html() === this.$cells.eq(index+18).html()
  ||
  this.$cells.eq(index).html() === this.$cells.eq(index+8).html() &&
  this.$cells.eq(index+8).html() === this.$cells.eq(index+16).html() &&
  this.$cells.eq(index+16).html() === this.$cells.eq(index+24).html()) {
    this.victory(this.dWin,this.winSound,this.dWinBackground);
  }

  // HORIZONTAL WIN CHECK - CHECKS TO SEE WHETHER CELLS ARE IN THE SAME ROW BY TAKING THE MATH.FLOOR OF THE INDEX NUMBER OVER THE WIDTH OF THE BOARD (7). FINDS TOP OF THE RELEVANT ROW BY ADDING 6 TO THE MATH.FLOOR OF THE CELL INDEX / 7. STARTS LOOP AT TOP OF ROW LOOKING FOR SEQUENTIAL MATCHES IN THE CELLS, IF IT FINDS ONE, THE STREAK COUNTER ADDS 1. HORIZONTAL WIN ANNOUNCES WHEN STREAK HITS 4.

  console.log(Math.floor(index/7), Math.floor((index-3)/7), Math.floor((index+3)/7));

  if (Math.floor(index/7) === Math.floor((index-3)/7) || Math.floor(index/7) === Math.floor((index+3)/7)){
    console.log('checking horizontal win');
    // find top of ROW
    let topOfRow = Math.floor(index/7) * 7 + 6;
    let streak  = 0;

    while(topOfRow >= Math.floor(index/7) * 7 + 3) {
      // check 4 from start of ROW
      [0,-1,-2,-3].forEach((i) => {
        console.log((this.turnCounter % 2 === 0 ? 'O' : 'X'));
        if(this.$cells.eq(topOfRow + i).html() === (this.turnCounter % 2 === 0 ? 'O' : 'X')) {
          streak++;
        }
      });

      if(streak === 4) {
        this.victory(this.hWin,this.winSound,this.hWinBackground);
        break;
      }

      topOfRow--;
      streak = 0;

    }

  }

};

cfour.setup = function setup() {
  // all variables from the DOM
  // all event handlers
  this.$startgame = $('#startgame');
  this.$audio = $('#audiobackground')[0];
  this.$audio1 = $('#audioclick')[0];
  this.$audio2 = $('#audiowin')[0];
  this.$resetButton = $('#reset');
  this.$stopMusic = $('#stopmusic');
  this.$sunBackground = $('#sunbackground');
  this.$tronBackground = $('#tronbackground');
  this.$triangleBackground = $('#trianglebackground');
  this.$body = $('body');
  this.$playerDisplay = $('.playerdisplay');
  this.$cells = $('.cell');
  this.$gameSetupButton = $('#game_setup_button');
  this.$backgroundOptionsButton = $('#background_options_button');

  // GAME SETUP DROPDOWN //
  this.$gameSetupButton.on('click', this.setupGame.bind(this));
  // BACKGROUND OPTIONS DROPDOWN //
  this.$backgroundOptionsButton.on('click', this.backgroundOptions.bind(this));
  // START GAME BUTTON //
  this.$startgame.on('click', this.startGame.bind(this));
  //STOP MUSIC BUTTON//
  this.$stopMusic.on('click', this.stopMusic.bind(this));
  // RESET BUTTON - SETS ALL HTML IN CELLS TO NOTHING AND CHANGES ALL BACKGROUND TO TRANSPARENT //
  this.$resetButton.on('click', this.resetButton.bind(this));
  //SUN BACKGROUND BUTTON//
  this.$sunBackground.on('click', this.sunBackground.bind(this));
  //TRON BACKGROUND BUTTON//
  this.$tronBackground.on('click', this.tronBackground.bind(this));
  //TRIANGLE BACKGROUND BUTTON//
  this.$triangleBackground.on('click', this.triangleBackground.bind(this));
  //SQUARE CLICK//
  this.$cells.on('click', this.squareClick.bind(this));

};


$(cfour.setup.bind(cfour));
