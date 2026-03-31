let gameSequence=[];
let userSequence=[];
let started=false;
let level=0;
let h2=document.querySelector('h2');
let btns=["apple","grapes","banana","orange"];
let counter=-1;
let acceptingInput=false;
let popSound=new Audio("pop.mp3");
let winSound=new Audio("win.mp3");
let wrongSound=new Audio("wrong.mp3");
function playPop(){
    popSound.currentTime=0;
    popSound.play();
}
function playWin(){
    winSound.currentTime=0;
    winSound.play();
}
function playWrong(){
    wrongSound.currentTime=0;
    wrongSound.play();
}
let startBtn = document.querySelector("#startBtn");
let resetBtn = document.querySelector("#resetBtn");

startBtn.addEventListener("click", function () {
    if (!started) {
        started = true;
        level = 0;
        gameSequence = [];
        userSequence = [];
        counter = -1;
        levelUp();
    }
});

resetBtn.addEventListener("click", function () {
    resetGame();
});

function resetGame() {
    started = false;
    gameSequence = [];
    userSequence = [];
    level = 0;
    counter = -1;
    acceptingInput = false;

    h2.innerText = "Press Start to Play"; // clean UI
}
function gameFlash(btn){
    playPop();
    btn.classList.add("flash");
    setTimeout(()=>{
        btn.classList.remove("flash");
    },250);
}
function userFlash(btn){
    btn.classList.add("userflash");
    setTimeout(()=>{
        btn.classList.remove("userflash");
    },250);
}
function levelUp(){
    acceptingInput=false;
    level++;
    h2.innerText=`Level ${level}`;
    let randidx= random();
    let fruit=btns[randidx];
    let randbtn=document.querySelector(`#${fruit}`);
    gameSequence.push(randbtn);
    //console.log(randidx);
    gameFlash(randbtn);
    setTimeout(()=>{
        acceptingInput=true;
    },300);

}
function gameEnd(){
    playWrong();
   h2.innerText = `Game Over! Score: ${level-1}`;
    document.querySelector("body").style.backgroundColor="red";
    setTimeout(()=>{
        document.querySelector("body").style.backgroundColor="white";
    },1000
    );
    started=false;
    gameSequence=[];
    userSequence=[];
    level=0;
    counter=-1;
    acceptingInput=false;
}
function btnPress(){
    if(!started || !acceptingInput){
        return;
    }
    if(started==true){
        counter++;
    let btn=this;
    userFlash(btn);
    if(gameSequence[counter]===btn){
        playWin();
        userSequence.push(btn);
        if(userSequence.length==gameSequence.length){
            acceptingInput=false;
            counter=-1;
            userSequence=[];
            setTimeout(levelUp,1000);
        }
        
    }    
    else{
        
        gameEnd();
    }
    }
    
    
}
let allBtns=document.querySelectorAll(".btn");

    for(btn of allBtns){
    btn.addEventListener("click",btnPress);

}

function random(){
    return Math.floor(Math.random()*4);
}
