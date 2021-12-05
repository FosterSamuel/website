---
title: "Santorini"
date: 2020-12-14 12:00:00 -0800
hasLastMod: false
draft: false
summary: Falling into the board game.
---

In 2019 my friend showed me the board game Santorini. He put the grassy five-by-five board on the cliffed base, explaining how each player fights for a spot on a tall building. We played a dozen rounds that night. I lost most of them, and I was hooked.

<figure>
	<img loading="lazy" alt="Real Santorini board in middle of game" width="auto" height="200px" src="../../images/santorini/santorini_board_example.jpg">
</figure>


Over ramen the next week we talked about chess variants. He wanted to make shrink chess, a variant that loses rows and columns, as a proof-of-concept for his own free game platform. I said I'd make Santorini.

### Down to basics

By namesake and design, Santorini is Greek themed. Mythological cards alter the game by imbuing each player with bonus powers. Those are fine, but I was more interested in the basic rules.

Each turn a player moves only one of their two workers and then, if not on a winning position, builds adjacent to that worker. Workers can move one space in any direction and "climb" one level of building height. They can also drop from any height. 

A third-level building, the winning height for a worker, can be blocked by building a dome. A player can also win by blocking both of the opponent's workers, leaving them no legal moves.

### Building my version

My first goal was to minimize my time managing board state. Thankfully, every action in Santorini can be reduced to two numbers: the row and column where a move or build happened. I wanted to throw only row-column pairs at something to play the game. `playPosition` does just that:

```js
function playPosition(row, column) {
		// ...
		if(isOutsideBoard(row, column)) {
			return false;
		} 
		switch(this.state) {
			case this.SETTING_FIRST_WORKER:
				// ...
			case this.SETTING_SECOND_WORKER:
				// ...
			case this.CHOOSING_WORKER:
				// ...
			case this.MOVING_WORKER:
				// ...
			case this.BUILDING:
				// ...
		}

		return true;
}
```

I wrapped `playPosition` in a function returning a game object with helpful data and methods:

```js
function startGame() {
	const GAME = {
		board: newBoard(),
		listLegalMoves: listLegalMoves,
		listLegalBuilds: listLegalBuilds,
		playPosition: playPosition,
		legal: {},
		legalMovesForNextTurn: [],
		legalBuildsForNextTurn: [],
		lastBuild: null,
		lastMove: null,
		moves: [],		// List of all moves played in the current game
		playerTurn: 0, 	// Whose turn it is (0 = player one, 1 = player two)
		selectedWorker: -1,  // Which of the two workers the current player has selected
		winningPlayer: -1, // 0 = player one wins, 1 = player two wins
		playerOneFirstWorker: [-1, -1], // Negative positions mean workers not placed on the board yet
		playerOneSecondWorker: [-1, -1],
		playerTwoFirstWorker: [-1, -1],
		playerTwoSecondWorker: [-1, -1],
		GROUND: 0,
	  	FIRST_LEVEL: 1,
	  	SECOND_LEVEL: 2,
	  	THIRD_LEVEL: 3,
		DOME: 4,
	  	SETTING_FIRST_WORKER: 0,
		SETTING_SECOND_WORKER: 1,
		CHOOSING_WORKER: 2,
		MOVING_WORKER: 3,
		BUILDING: 4,
		WON: 5,
		state: 0
	};

	function listLegalBuilds() {}
	function listLegalMoves() {}
	function determineLegalMoves(moveIsBuild, worker) {}
	function isMoveLegal(worker, level, row, column) {}
	function isBuildLegal(worker, level, row, column) {}
	function isSamePosition(row, column, rowColumnSet) {}
	function isOutsideBoard(row, column) {}
	function isReachableByWorker(worker, row, column) {}
	function getNotation(row, column) {}
	function getLevelNotation(level) {}
	function getBuildNotation(piece, row, column) {}
	function workersHaveNoLegalMoves(firstWorker, secondWorker) {}
	function workersHaveNoLegalBuilds(firstWorker, secondWorker) {}

	function playPosition(row, column) {}

	return GAME;
}

function newBoard() {
	return [[0, 0, 0, 0, 0],  // Row 0
			[0, 0, 0, 0, 0],  // Row 1
			[0, 0, 0, 0, 0],  // Row 2
			[0, 0, 0, 0, 0],  // Row 3
			[0, 0, 0, 0, 0]]; // Row 4
		  // Col 0
		  //    Col 1
		  //       Col 2
		  //          Col 3
		  //    	     Col 4
}
```

I tied the game object to a thin Vue page, listening for row-column pairs, to get a rough demo going:

<figure>
	<img loading="lazy" alt="Graphic-less example of 2D Santorini" width="auto" height="200px" src="../../images/santorini/santorini_early_progress.jpg">
</figure>

It worked, but I needed a UI to play the game with others.

### Cheap multiplayer

My second goal was spending $0. I could setup Firebase for free but then my credit card would be on the hook if we play too much. My friend's game platform was also not ready yet. While I'd love to store matches and automate lobbies in the future, I thought it would be neat if two people could play without a server lording over the match.

WebRTC was the answer, allowing realtime peer-to-peer connections to send data and messages. If a Santorini game is "just" row-column pairs, a 1v1 match is "just" a chatroom where two people take turns sending pairs. Michel Wrzosek's project [p2p-chat](https://github.com/michal-wrzosek/p2p-chat) was the right wrapper to setup such a chatroom.

p2p-chat features a clean invite system. The host can send an invite link, paste in a response code from the second player, and get to playing. With a free signalling server kickstarting the connection, and it being peer-to-peer during the match, I lose no sleep wondering if someone can play.



### Good enough graphics

Inspired by Lichess, my third goal was snappy gameplay and limited graphics. I resorted to simple shapes moved with the pleasant [svg.js library](https://svgjs.com/docs/3.0/). By the end of 2019, having added p2p-chat and svg.js to the same Vue page from earlier, I had the game running:

<figure>
	<img loading="lazy" alt="Gameplay example of 2D Santorini" width="auto" height="200px" src="../../images/santorini/santorini_2d_gameplay.gif">
</figure>

As quarantine began, we played remotely to continue enjoying Santorini. I wanted to take it a little further. 

### Third dimension

Santorini is all about moving up. Placing the buildings in real life is satisfying, and though it can't be matched online, I wanted my version to capture at least part of that feeling.

In September of this year I turned to the helpful [Three.js Fundamentals](https://threejsfundamentals.org/) to learn about creating and moving 3D assets. The tutorials are fantastic, so I won't even attempt to paraphrase them here.

I stuck to the same game and multiplayer logic mentioned earlier. Moving to 3D, however, offered new challenges:
 - Theme/colors for the game?
 - What surroundings will be around the board?
 - What models will be used for the buildings and workers?

### Friendly inspiration

The friend who introduced me to the game has familial roots in Sardinia, the island off the coast of Italy. Bosa is a town there dotted with colorful buildings sporting red roofs:

<figure>
	<img loading="lazy" alt="Screenshot of TheMerchantM.com" width="auto" height="200px" src="https://upload.wikimedia.org/wikipedia/commons/1/1c/Bosa_Sardaigne.jpg">
	<figcaption><i>Bosa, Sardinia.</i> <a href="https://commons.wikimedia.org/wiki/File:Bosa_Sardaigne.jpg">Gzzz</a>, <a href="https://creativecommons.org/licenses/by-sa/3.0">CC BY-SA 3.0</a>, via Wikimedia Commons</figcaption>
</figure>

In his honor I named the project **Sardinia**, and with it, had a theme for my version.

### Surrounding the board

I dug around for a free skybox and found one that was island-esque in theme, made by [Matthew "[Soul]Sub-Z0|TO"](http://quadropolis.us/node/2107).

<figure>
	<img loading="lazy" alt="Skybox in Sardinia" width="auto" height="200px" src="../../images/santorini/santorini_skybox.PNG">
</figure>

### Fellow fan

Learning Blender is on my personal backlog.  In the meantime, I turned to the communities of open source 3D models. Many people offer free resources for games, vfx, and 3D printing.

Samuel Flodeby, of Sweden, made their own mini ["Samtoroni"](https://www.thingiverse.com/thing:3988576) models and released them under the generous CC BY 4.0 license. I threw the models into the Three.js I was learning.

Clean models and a great name. No bias.


### Off to the red domes

After fiddling with the skybox, the models, and some free sound effects, it worked.

Sardinia is now [available to play](https://fostersamuel.github.io/sardinia).

<figure>
	<img loading="lazy" alt="Skybox in Sardinia" width="auto" height="200px" src="../../images/santorini/sardinia_3d_2.gif">
</figure>


All code is available in [the repository](https://www.github.com/FosterSamuel/sardinia). Future plans can be found in the issues tab.