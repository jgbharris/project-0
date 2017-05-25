$(() => {
  console.log('Woohoo!!!!!!');

  // CONSTANTS ETC //

  var cfour = cfour || {};

  cfour.$startgame = $('#startgame');
  cfour.$audio = $('#audiobackground')[0];
  cfour.$audio1 = $('#audioclick')[0];
  cfour.$audio2 = $('#audiowin')[0];
  cfour.askPlayerName1 = prompt('Player 1 please enter your name?');
  cfour.askPlayerName2 = prompt('Player 2 please enter your name?');
  cfour.$cells = $('.cell');
  cfour.turnCounter = null;
  cfour.$resetButton = $('#reset');
  cfour.$stopMusic = $('#stopmusic');
  cfour.$sunBackground = $('#sunbackground');
  cfour.$tronBackground = $('#tronbackground');
  cfour.$triangleBackground = $('#trianglebackground');
  cfour.$body = $('body');
  cfour.$playerDisplay = $('.playerdisplay');
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
  cfour.$gameSetupButton = $('#game_setup_button');
  cfour.$backgroundOptionsButton = $('#background_options_button');


  cfour.victory = function victory (A,B,C) {
    console.log(`${A}`);
    responsiveVoice.speak(`${A}`);
    cfour.$audio2.src = `sounds/${B}.wav`;
    cfour.$audio2.play();
    cfour.$audio.pause();
    cfour.$playerDisplay.html(`${A}`);
    cfour.$body.css('background-image', `url(public/css/${C})`);
  };

  cfour. changeBackground = function changeBackground (D) {
    console.log('change background!');
    cfour.$body.css('background-image', `url(public/css/${D})`);
  };

  // GAME SETUP DROPDOWN //
  cfour.$gameSetupButton.on('click', (e) => {
    cfour.$startgame.slideDown(200);
    cfour.$stopMusic.slideDown(200);
    cfour.$resetButton.slideDown(200);

  });

  // BACKGROUND OPTIONS DROPDOWN //
  cfour.$backgroundOptionsButton.on('click', (e) => {
    cfour.$sunBackground.slideDown(200);
    cfour.$tronBackground.slideDown(200);
    cfour.$triangleBackground.slideDown(200);

  });



  // START GAME BUTTON //
  cfour.$startgame.on('click', (e) => {
    console.log('clicked');
    cfour.$audio.src = 'sounds/arcadefunk.mp3';
    cfour.$audio.play();
    responsiveVoice.speak(`Hello ${cfour.askPlayerName1} and ${cfour.askPlayerName2}, welcome to funky laser connect 4, I am the game master, begin!`);
  });

  //STOP MUSIC BUTTON//
  cfour.$stopMusic.on('click', (e) => {
    console.log('stop music!');
    cfour.$audio.pause();
  });


  // RESET BUTTON - SETS ALL HTML IN CELLS TO NOTHING AND CHANGES ALL BACKGROUND TO TRANSPARENT //
  cfour.$resetButton.on('click', (e) => {
    cfour.$cells.html('');
    cfour.$playerDisplay.html('win display');
    cfour.$cells.removeClass('pink blue playable');
    cfour.$cells.addClass('notplayable');
    const indices = [35,36,37,38,39,40,41];
    indices.forEach((index)=>{
      cfour.$cells.eq(index).removeClass('notplayable').addClass('playable');
    });
    cfour.changeBackground(cfour.triangleBgFile);

  });


  //SUN BACKGROUND BUTTON//
  cfour.$sunBackground.on('click', () => {
    cfour.changeBackground(cfour.sunBgFile);
  });

//TRON BACKGROUND BUTTON//
  cfour.$tronBackground.on('click', () => {
    cfour.changeBackground(cfour.tronBgFile);
  });

//TRIANGLE BACKGROUND BUTTON//
  cfour.$triangleBackground.on('click', () => {
    cfour.changeBackground(cfour.triangleBgFile);
  });


  // CLICK ON SQUARE: PUTS X OR O IN SQUARE, CHANGES COLOR,  ADDS 1 TO TURN COUNTER, MAKES SQUARE UNPLAYABLE (CAN'T PLACE ANOTHER PIECE ON SQUARE) AND MAKES SQUARE ABOVE PLAYABLE


  cfour.$cells.on('click', (e) => {
    const color = cfour.turnCounter % 2 === 0 ? 'blue' : 'pink';
    const counter = cfour.turnCounter % 2 === 0 ? 'X' : 'O';
    if ($(e.target).hasClass('playable')) {
      const index = $(e.target).index();
      $(e.target).html(counter);
      $(e.target).addClass(color);
      $(e.target).removeClass('playable');
      $(e.target).addClass('notplayable');
      cfour.$cells.eq(index -7).removeClass('notplayable').addClass('playable');
      cfour.turnCounter++;
      cfour.checkForWin(index);
      cfour.$audio1.src = 'sounds/boing1.wav';
      cfour.$audio1.play();
    }
  });


    // WIN CONDITIONS //


    cfour.checkForWin = function checkForWin(index) {
      // VERTICAL WIN CHECK - AS YOU CLICK TO PLACE YOUR COLOUR, CHECKS FOR MATCHING COLOURS IN THE SQUARES BELOW, ACHIEVED BY ADDING THE WIDTH OFG THE BOARD (7) TO THE INDEX NUMBER OF THE SQUARE YOU CLICKED ON//

      console.log('index', index, cfour.$cells.eq(index+7));

      // const currentIndex = $(e.target).index();
      // console.log($cells.eq(index+7).html());
      if (cfour.$cells.eq(index).html() === cfour.$cells.eq(index+7).html() &&
      cfour.$cells.eq(index+7).html() === cfour.$cells.eq(index+14).html() &&
      cfour.$cells.eq(index+14).html() === cfour.$cells.eq(index+21).html()) {
        cfour.victory(cfour.vWin,cfour.winSound,cfour.vWinBackground);
      }


      // DIAGONAL WIN CHECK- DIAGONAL SQUARES ARE ON THE WIDTH OF THE BOARD (7) PLUS OR MINUS ONE. AS YOU GO VERTICALLY UP THE BOARD WHILE PLAYING, THE INDEX OF THE SQUARE YOU CLICK ON WILL BE LOWER, THEREFORE WE NEED TO CHECK THE SQUARES FURTHER UP THE INDEX, HENCE THE CHECKS ARE POSITIVE IN EITHER MULTIPLES OF 6(7-1) OR 8(7+1).

      if (cfour.$cells.eq(index).html() === cfour.$cells.eq(index+6).html() &&
      cfour.$cells.eq(index+6).html() === cfour.$cells.eq(index+12).html() &&
      cfour.$cells.eq(index+12).html() === cfour.$cells.eq(index+18).html()
      ||
      cfour.$cells.eq(index).html() === cfour.$cells.eq(index+8).html() &&
      cfour.$cells.eq(index+8).html() === cfour.$cells.eq(index+16).html() &&
      cfour.$cells.eq(index+16).html() === cfour.$cells.eq(index+24).html()) {
        cfour.victory(cfour.dWin,cfour.winSound,cfour.dWinBackground);
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
            console.log((cfour.turnCounter % 2 === 0 ? 'O' : 'X'));
            if(cfour.$cells.eq(topOfRow + i).html() === (cfour.turnCounter % 2 === 0 ? 'O' : 'X')) {
              streak++;
            }
          });

          if(streak === 4) {
            cfour.victory(cfour.hWin,cfour.winSound,cfour.hWinBackground);
            break;
          }

          topOfRow--;
          streak = 0;

        }

      }

    };


});
