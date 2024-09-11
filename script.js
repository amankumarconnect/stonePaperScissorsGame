//Score object
let Score = JSON.parse(localStorage.getItem('Score')) || {wins: 0,loses: 0,ties:0};

//Set Score paragraph to zero scores
updateScoreElement();


//Pick computer move function
function pickComputerMove(){
    let computerMove;
    const randomNo = Math.random();
    if(randomNo<1/3){
        computerMove = 'Stone';
    }
    else if(randomNo>=2/3){
        computerMove = 'Scissors';
    }
    else{
        computerMove = 'Paper';
    }
    return computerMove;
}

//Update score function
function updateScoreElement(){
    document.querySelector('.js-score')
        .innerHTML = `Wins:${Score.wins} Loses:${Score.loses} Ties:${Score.ties}`;
}

let isAutoPlaying = false;
let intervalId;

// auto play function
function autoPlay(){
    if(!isAutoPlaying){
        intervalId = setInterval(() => {
            const playerMove = pickComputerMove();
            playGame(playerMove);
        },1000);
        isAutoPlaying = true;
    }else{
        clearInterval(intervalId);
        isAutoPlaying = false;
    }script.js
}

//eventlistener stone
document.querySelector('.js-stone-button')
    .addEventListener('click', () => {
        playGame('Stone');
    });

// eventlistener paper
document.querySelector('.js-paper-button')
    .addEventListener('click', () => {
        playGame('Paper');
    });

// eventlistener scissors
document.querySelector('.js-scissors-button')
    .addEventListener('click', () => {
        playGame('Scissors');
    });

//keydown a, b, c
document.body.addEventListener('keydown', (event) => {
    if(event.key === 'a'){
        playGame('Stone');
    } else if(event.key === 'b'){
        playGame('Paper');
    }else if(event.key === 'c'){
        playGame('Scissors')
    }
})

//Play game function
function playGame(playerMove){
    const computerMove = pickComputerMove();
    if(playerMove === 'Stone'){
        if(computerMove === 'Stone'){
            result = 'It\'s a Tie!';
        }
        else if(computerMove==='Paper'){
            result = 'Computer won :<';
        }
        else{
            result = 'You won :>';
        }
    } 
    else if(playerMove === 'Paper'){
        if(computerMove === 'Stone'){
            result = 'You won :>';
        }
        else if(computerMove==='Paper'){
            result = 'It\'s a Tie!';
        }
        else{
            result = 'Computer won :<';
        }
    }
    else{
        if(computerMove === 'Stone'){
            result = 'Computer won :<';
        }
        else if(computerMove==='Paper'){
            result = 'You won :>';
        }
        else{
            result = 'It\'s a Tie!';
        }
    }

    if(result === 'You won :>') {
        Score.wins++;
    }
    else if(result === 'Computer won :<') {
        Score.loses++;
    }
    else{
        Score.ties++;
    }

    localStorage.setItem('Score',JSON.stringify(Score))

    updateScoreElement();

    document.querySelector('.js-result').innerHTML = result;
    document.querySelector('.js-moves').innerHTML = `(You) <img src="/images/${playerMove}.png" alt="${playerMove}" class="move-icon"> (Computer) <img src="/images/${computerMove}.png" alt="${computerMove}" class="move-icon">`;
}
