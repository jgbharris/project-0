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
  const $body = $('body');
  const $playerDisplay = $('.playerdisplay');


  // GAME SET UP BUTTON //



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
    console.log('change background!');
    $body.css('background-image', 'url(public/css/sunbackground.gif)');
  });

//TRON BACKGROUND BUTTON//

  $tronBackground.on('click', () => {
    console.log('change background!');
    $body.css('background-image', 'url(public/css/tronwallpaper.png)');
  });


  // CLICK ON SQUARE: PUTS X OR O IN SQUARE, CHANGES COLOR,  ADDS 1 TO TURN COUNTER, MAKES SQUARE UNPLAYABLE (CAN'T PLACE ANOTHER PIECE ON SQUARE) AND MAKES SQUARE ABOVE PLAYABLE


  $cells.on('click', (e) => {
    const color = turnCounter % 2 === 0 ? '#50BFE6' : '#FF00CC';
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
        console.log('vertical win');
        responsiveVoice.speak('vertical win');
        $audio.src = 'sounds/win.wav';
        $audio2.play();
        $playerDisplay.html('vertical win');
        $body.css('background-image', 'url(public/css/taco.gif)');


      }


      // DIAGONAL WIN CHECK- DIAGONAL SQUARES ARE ON THE WIDTH OF THE BOARD (7) PLUS OR MINUS ONE. AS YOU GO VERTICALLY UP THE BOARD WHILE PLAYING, THE INDEX OF THE SQUARE YOU CLICK ON WILL BE LOWER, THEREFORE WE NEED TO CHECK THE SQUARES FURTHER UP THE INDEX, HENCE THE CHECKS ARE POSITIVE IN EITHER MULTIPLES OF 6(7-1) OR 8(7+1).

      if ($cells.eq(index).html() === $cells.eq(index+6).html() &&
      $cells.eq(index+6).html() === $cells.eq(index+12).html() &&
      $cells.eq(index+12).html() === $cells.eq(index+18).html()
      ||
      $cells.eq(index).html() === $cells.eq(index+8).html() &&
      $cells.eq(index+8).html() === $cells.eq(index+16).html() &&
      $cells.eq(index+16).html() === $cells.eq(index+24).html()) {
        console.log('diagonal win');
        responsiveVoice.speak('diagonal win');
        $audio.src = 'sounds/win.wav';
        $audio.play();
        $playerDisplay.html('diagonal win');
        $body.css('background-image', 'url(public/css/celebration.gif)');
      }

      // HORIZONTAL WIN CHECK - CHECKS TO SEE WHETHER THE THE CELLS MATCH SEQUENTIALLY. THIS IS EITHER INFORNT OR BEHIND THE CELL YOU CLICKED. ACHIEVED BY SUBTRACTING OR ADDING THE 1,2 AND 3 TO THE INDEX OF THE CELL. ALSO NEED TO CHECK THAT THE CELLS ARE ON THE SAME ROW, THIS IS ACHIEVED USING MODULUS, IF THE REMAINDER OF THE CELL INDEX OVER THE WIDTH OF THE BOARD (7) IS THE SAME FOR BOTH THE FIRST AND THE LAST SQUARE, THEY ARE ON THE SAME ROW //

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
            console.log('horizontal win');
            responsiveVoice.speak('horizontal win');
            $audio2.src = 'sounds/win.wav';
            $audio2.play();
            $audio.pause();
            $playerDisplay.html('horizontal win');
            $body.css('background-image', 'url(public/css/mandance.gif)');
            break;
          }

          topOfRow--;
          streak = 0;

        }

      }

    }
  });










































});
