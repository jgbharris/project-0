# Funky Laser Connect 4 by JimBo Harris

## Installation and setup

* Download or clone the repo.
* `npm i` to install dependencies.
* `gulp` to compile the source code and open in browser.

## Description

Two player game - aim is to achieve four in a row on a board of 7 x 6. The game was designed to have a 1980's arcade game look and feel.

![Imgur](http://i.imgur.com/vctMCEq.jpg)
![Imgur](http://i.imgur.com/2Btrt1K.png)
![Imgur](http://i.imgur.com/QQ41LLq.jpg)

## Technologies used

* HTML 5
* SCSS
* JavaScript ES6
* jQuery 3.10
* Gulp
* NPM
* Git & github

## Challenges faced

The logic to create the win conditions for a horizontal win were more complicated than first envisaged. Initially the code would check for a match in sequential cells but this created the issue of the match being made over different rows. The problem was overcome by adding a row match function and a loop which searched for matches within the matching row.

## Potential additional features

* Ability to play against the computer
