# Heroku Tetris

A web-browser based tetris game built in ReactJS and served with NodeJS.

## Learning Outcomes

* Use of custom React hooks: useState, useCallback, useEffect, useInterval to set up the player and stage.
* Use of callbacks to prevent infinite loops from occuring.
* Retro themed application styling.
* Heroku Continuous Integration deployment.

## Input

* Use the start button to launch the game.<br />
* Use the left and right arrow keys to move the tetrimino from side to side.<br />
* Use the down arrow key to push the tetrimino to the floor quicker.<br />
* Use the up arrow key to rotate the tetrimino.

# Installation 

## Prerequisites

The application is served to the user with [NodeJS](https://npmjs.com).

## Setting up

The following commands will make a local copy of the git repository and then runs the application in development mode.<br/>

```
git clone https://github.com/LadCoder/Tetris.git
cd Tetris
npm start
```
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Usage

```
import Tetris from './components/Tetris';

const App = () => (
  <div className="App">
    <Tetris />
  </div>
);
```"# RJS-Tetris" 
