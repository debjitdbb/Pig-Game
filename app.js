/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he wishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach the winning points on GLOBAL score wins the game

*/

var currentScore, totalScore, gameOn, activePlayer, winningScore, player1, player2;

init();

document.querySelector('.btn-new').addEventListener('click', init);


function hideDice()
{
	var x=document.getElementById("dice");
	x.style.visibility = 'hidden';
}

function showDice()
{
	var x=document.getElementById("dice");
	x.style.visibility = 'visible';
}

function getNumber()
{
	var x = Math.random();
	x = 1+x*6;
	return Math.floor(x);
}

document.querySelector('.btn-roll').addEventListener('click', function() {
	if(gameOn)
	{
		//get a random number
		var dice = getNumber();

		//display on UI
		var diceDOM = document.querySelector('.dice');
		diceDOM.style.display = 'block';
		diceDOM.src = 'dice-'+dice+'.png';

		//update score
		if(dice!==1)
		{
			//add the score
			currentScore+=dice;
			document.querySelector('#current-' + activePlayer).textContent = currentScore;
		}
		else
		{
			//if he rolls a 1, control moves to the next player
			nextPlayer();
		}
		
	}
});

document.querySelector('.btn-hold').addEventListener('click', function() {
	if(gameOn)
	{
		//add the global score
		totalScore[activePlayer] += currentScore;
		currentScore = 0;

		//update UI
		document.querySelector('#score-' + activePlayer).textContent = totalScore[activePlayer];

		//check if won
		if(totalScore[activePlayer]>=winningScore)
		{
			document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gameOn = false;
		}
		else //did not win, control passes to next player
		{
			nextPlayer();
		}
	}
});

document.querySelector('.btn-winning-score').addEventListener('click', function() {
	if(gameOn)
	{
		alert("The winning Score is: " + winningScore);
	}
});

function nextPlayer()
{
	document.getElementById('current-' + activePlayer).textContent = '0';
	activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
	currentScore = 0;

	document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    document.querySelector('.dice').style.display = 'none';
}

function takeNames()
{
	var p1;
	var p2;
	do
	{
		p1 = prompt("Please enter name of Player-1", "Player-1");
		if(p1!=null)
		{
			player1 = p1;
		}
	}while(player1==null);

	do
	{
		p2 = prompt("Please enter name of Player-2", "Player-2");
		if(p2!=null)
		{
			player2 = p2;
		}
	}while(player2==null);

	do
	{
		winningScore = prompt("Please enter winning score", "100");
	}while(winningScore==null);



}



function init()
{
	currentScore = 0;
	totalScore = [0,0];
	activePlayer = 0;
	gameOn = true;

	takeNames();

	document.querySelector('.dice').style.display = 'none';

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = player1;
    document.getElementById('name-1').textContent = player2;
    document.querySelector('.btn-winning-score').textContent = 'Win On ' + winningScore;
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}
