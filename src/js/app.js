$(() => {
  console.log('Woohoo!!!!!!');

  // CONSTANTS ETC //

  const $startgame = $('#startgame');
  const $audio = $('#audiobackground')[0];
  const $audio1 = $('#audioclick')[0];
  const $audio2 = $('#audiowin')[0];
  const $askPlayerName1 = prompt('Player 1 what is your name?');
  const $askPlayerName2 = prompt('Player 2 what is your name?');
  const $gameboard = $('.gameboard');
  const $cells = $('.cell');
  let turnCounter = null;
  const $resetButton = $('#reset');
  const $stopMusic = $('#stopmusic');


  // GAME SET UP BUTTON //

  responsiveVoice.speak(`Hello and welcome to funky laser connect 4`);

  $startgame.on('click', (e) => {
    console.log('clicked');
    $audio.src = 'sounds/arcadefunk.mp3';
    $audio.play();
    $askPlayerName1();
    $askPlayerName2();
  });

  $stopMusic.on('click', (e) => {
    console.log('stop music!');
    $audio.pause();


  });



  // CLICK ON SQUARE: PUTS X OR O IN SQUARE, ADDS 1 TO TURN COUNTER, MAKES SQUARE UNPLAYABLE (CAN'T PLACE ANOTHER PIECE ON SQUARE) AND MAKES SQUARE ABOVE PLAYABLE


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
      }

      // HORIZONTAL WIN CHECK - CHECKS TO SEE WHETHER THE THE CELLS MATCH SEQUENTIALLY //

      if (
      (Math.floor($cells.eq(index)) % 7) === (Math.floor($cells.eq(index-3)) % 7) &&
      $cells.eq(index).html() === $cells.eq(index-1).html() &&
      $cells.eq(index-1).html() === $cells.eq(index-2).html() &&
      $cells.eq(index-2).html() === $cells.eq(index-3).html() || $cells.eq(index).html() === $cells.eq(index+1).html() &&
      $cells.eq(index+1).html() === $cells.eq(index+2).html() &&
      $cells.eq(index+2).html() === $cells.eq(index+3).html()) {
        console.log('horizontal win');
        responsiveVoice.speak('horizontal win');
        $audio2.src = 'sounds/win.wav';
        $audio2.play();
      }

      if ($cells.eq(index).html() === $cells.eq(index+6).html() &&
      $cells.eq(index+6).html() === $cells.eq(index+12).html() &&
      $cells.eq(index+12).html() === $cells.eq(index+18).html()
      ||
      $cells.eq(index).html() === $cells.eq(index+8).html() &&
      $cells.eq(index+8).html() === $cells.eq(index+16).html() &&
      $cells.eq(index+16).html() === $cells.eq(index+24).html()) { console.log('diagonal win');
        responsiveVoice.speak('diagonal win');
        $audio.src = 'sounds/win.wav';
        $audio.play();
      }




    }









  });










































});
