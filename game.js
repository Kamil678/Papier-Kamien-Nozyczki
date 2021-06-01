const gameSummary={
    numbers: 0,
    wins: 0,
    losses: 0,
    draws: 0
}

const game= {
    playerHand:"",
    aiHand:"",
}

const hands=[...document.querySelectorAll('.select img')];

function handSelection() {
    game.playerHand=this.dataset.option;
    hands.forEach(hand => hand.style.boxShadow="");
    this.style.boxShadow="0 0 0 4px red"

}

hands.forEach(hand => {
    hand.addEventListener('click',handSelection);
})

//dataset- przechowuje nadane przez nas datay w HTMLu

function aiChoice () {
    return hands[Math.floor(Math.random()*hands.length)].dataset.option;
}

function checkResult (player, ai) {
    if(player===ai){
        return "Remis"
    } else if((player=="papier" && ai=="kamień") ||(player=="nożyczki" && ai=="papier") || (player=="kamień" && ai=="nożyczki") ){
        return "Wygrałeś"
    } else{
        return "Przegrałeś"
    }    
}

//Publikacja wyniku
function publishResult(player, ai , result) {
    document.querySelector('[data-summary="your-choice"]').textContent=player;
    document.querySelector('[data-summary="ai-choice"]').textContent=ai;
   
    gameSummary.numbers++;
    document.querySelector(".numbers span").textContent=gameSummary.numbers;

    if(result==="Wygrałeś"){
        gameSummary.wins++;
        document.querySelector(".wins span").textContent=gameSummary.wins;
        document.querySelector('[data-summary="who-win"]').textContent="Ty, brawo!!!";
    } else if(result==="Przegrałeś"){
        gameSummary.losses++;
        document.querySelector(".losses span").textContent=gameSummary.losses;
        document.querySelector('[data-summary="who-win"]').textContent="Niestety komputer";
    } else if(result==="Remis"){
        gameSummary.draws++;
        document.querySelector(".draws span").textContent=gameSummary.draws;
        document.querySelector('[data-summary="who-win"]').textContent="Remis!!!";
    }
    
}

function endGame () {
    document.querySelector(`[data-option= ${game.playerHand}]`).style.boxShadow="";

    game.playerHand="";
    game.aiHand="";
}

function startGame() {
    if(!game.playerHand){
       return  alert("Wybierz broń!");
    }

    game.aiHand=aiChoice();

    const gameResult= checkResult(game.playerHand,game.aiHand);

    publishResult(game.playerHand,game.aiHand,gameResult);

    endGame();
}

document.querySelector('.start').addEventListener('click',startGame);



