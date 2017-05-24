$(() => {
  console.log('Woohoo!!!!!!');

  // CONSTANTS ETC //

  const $startgame = $('#startgame');
  const $audio = $('#audiobackground')[0];
  const $audio1 = $('#audioclick')[0];
  const $audio2 = $('#audiowin')[0];
  const askPlayerName1 = prompt('Player 1 please enter your name?');
  const askPlayerName2 = prompt('Player 2 please enter your name?');
  const $cells = $('.cell');
  let turnCounter = null;
  const $resetButton = $('#reset');
  const $stopMusic = $('#stopmusic');
  const $sunBackground = $('#sunbackground');
  const $tronBackground = $('#tronbackground');
  const $triangleBackground = $('#trianglebackground');
  const $body = $('body');
  const $playerDisplay = $('.playerdisplay');
  const vWin = 'vertical win';
  const winSound = 'win';
  const vWinBackground = 'taco.gif';
  const hWin = 'horizontal win';
  const hWinBackground = 'mandance.gif';
  const dWin = 'diagonal win';
  const dWinBackground = 'celebration.gif';
  const sunBgFile = 'sunbackground.gif';
  const tronBgFile = 'tronwallpaper.png';
  const triangleBgFile = 'lasertriangle.gif';
  const $gameSetupButton = $('#game_setup_button');
  const $backgroundOptionsButton = $('#background_options_button');


  function victory (A,B,C) {
    console.log(`${A}`);
    responsiveVoice.speak(`${A}`);
    $audio2.src = `sounds/${B}.wav`;
    $audio2.play();
    $audio.pause();
    $playerDisplay.html(`${A}`);
    $body.css('background-image', `url(public/css/${C})`);
  }

  function changeBackground (D) {
    console.log('change background!');
    $body.css('background-image', `url(public/css/${D})`);
  }

  // GAME SETUP DROPDOWN //
  $gameSetupButton.on('click', (e) => {
    $startgame.slideDown(200);
    $stopMusic.slideDown(200);
    $resetButton.slideDown(200);

  });

  // BACKGROUND OPTIONS DROPDOWN //
  $backgroundOptionsButton.on('click', (e) => {
    $sunBackground.slideDown(200);
    $tronBackground.slideDown(200);
    $triangleBackground.slideDown(200);

  });



  // START GAME BUTTON //

  $startgame.on('click', (e) => {
    console.log('clicked');
    $audio.src = 'sounds/arcadefunk.mp3';
    $audio.play();
    responsiveVoice.speak(`Hello ${askPlayerName1} and ${askPlayerName2}  and welcome to funky laser connect 4`);
  });

  //STOP MUSIC BUTTON//

  $stopMusic.on('click', (e) => {
    console.log('stop music!');
    $audio.pause();
  });

  //SUN BACKGROUND BUTTON//

  $sunBackground.on('click', () => {
    changeBackground(sunBgFile);
  });

//TRON BACKGROUND BUTTON//

  $tronBackground.on('click', () => {
    changeBackground(tronBgFile);
  });

//TRIANGLE BACKGROUND BUTTON//

  $triangleBackground.on('click', () => {
    changeBackground(triangleBgFile);
  });


  // CLICK ON SQUARE: PUTS X OR O IN SQUARE, CHANGES COLOR,  ADDS 1 TO TURN COUNTER, MAKES SQUARE UNPLAYABLE (CAN'T PLACE ANOTHER PIECE ON SQUARE) AND MAKES SQUARE ABOVE PLAYABLE


  $cells.on('click', (e) => {
    const color = turnCounter % 2 === 0 ? '#00FFFF' : '#FF00CC';
    const counter = turnCounter % 2 === 0 ? 'X' : 'O';
    if ($(e.target).hasClass('playable')) {
      const index = $(e.target).index();
      $(e.target).html(counter);
      $(e.target).css('background-color', color);
      $(e.target).removeClass('playable');
      $(e.target).addClass('notplayable');
      $cells.eq(index -7).removeClass('notplayable').addClass('playable');
      turnCounter++;
      checkForWin(index);
      $audio1.src = 'sounds/boing1.wav';
      $audio1.play();
    }

    // RESET BUTTON - SETS ALL HTML IN CELLS TO NOTHING AND CHANGES ALL BACKGROUND TO TRANSPARENT //

    $resetButton.on('click', (e) => {
      $cells.html(' ');
      $cells.css('background', 'transparent');
    });


    // WIN CONDITIONS //


    function checkForWin(index) {
      // VERTICAL WIN CHECK - AS YOU CLICK TO PLACE YOUR COLOUR, CHECKS FOR MATCHING COLOURS IN THE SQUARES BELOW, ACHIEVED BY ADDING THE WIDTH OFG THE BOARD (7) TO THE INDEX NUMBER OF THE SQUARE YOU CLICKED ON//

      console.log('index', index, $cells.eq(index+7));

      // const currentIndex = $(e.target).index();
      // console.log($cells.eq(index+7).html());
      if ($cells.eq(index).html() === $cells.eq(index+7).html() &&
      $cells.eq(index+7).html() === $cells.eq(index+14).html() &&
      $cells.eq(index+14).html() === $cells.eq(index+21).html()) {
        victory(vWin,winSound,vWinBackground);
      }


      // DIAGONAL WIN CHECK- DIAGONAL SQUARES ARE ON THE WIDTH OF THE BOARD (7) PLUS OR MINUS ONE. AS YOU GO VERTICALLY UP THE BOARD WHILE PLAYING, THE INDEX OF THE SQUARE YOU CLICK ON WILL BE LOWER, THEREFORE WE NEED TO CHECK THE SQUARES FURTHER UP THE INDEX, HENCE THE CHECKS ARE POSITIVE IN EITHER MULTIPLES OF 6(7-1) OR 8(7+1).

      if ($cells.eq(index).html() === $cells.eq(index+6).html() &&
      $cells.eq(index+6).html() === $cells.eq(index+12).html() &&
      $cells.eq(index+12).html() === $cells.eq(index+18).html()
      ||
      $cells.eq(index).html() === $cells.eq(index+8).html() &&
      $cells.eq(index+8).html() === $cells.eq(index+16).html() &&
      $cells.eq(index+16).html() === $cells.eq(index+24).html()) {
        victory(dWin,winSound,dWinBackground);
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
            console.log((turnCounter % 2 === 0 ? 'O' : 'X'));
            if($cells.eq(topOfRow + i).html() === (turnCounter % 2 === 0 ? 'O' : 'X')) {
              streak++;
            }
          });

          if(streak === 4) {
            victory(hWin,winSound,hWinBackground);
            break;
          }

          topOfRow--;
          streak = 0;

        }

      }

    }
  });










































});
