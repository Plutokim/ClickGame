const start = document.getElementById('start');
const clickBtn = document.getElementById('clickBtn');
const currentResult = document.getElementById('currentResult');
const allTimeResult = document.getElementById('allTimeResult');
const currentClear = document.getElementById('currentClear');
const allTimeClear = document.getElementById('allTimeClear');

if(!localStorage.getItem('allTimeBest')){
    localStorage.setItem('allTimeBest', JSON.stringify({name: null, best:0}));
}
if(!sessionStorage.getItem('bestResult')){
    sessionStorage.setItem('bestResult', 0);
}



let addResult = (result,nick) => {
    let sessionResult = sessionStorage.bestResult;
    let localResult = JSON.parse(localStorage.allTimeBest);
    if(sessionResult<result){
        sessionStorage.bestResult=result;
    }
    if(localResult.best<result){
        localStorage.allTimeBest = JSON.stringify({name: nick, best:result});
    }
}


start.addEventListener('click', () => {
    const nickname = document.getElementById('nickname').value;
    try {
        if (!nickname){
            throw new SyntaxError('Empty nickname');
        }
    } catch (e){
        alert('Empty nickname');
    }
    if(nickname){
        let time = 5000;
        let counter = 0;
        setTimeout(() => {
            alert(`You clicked ${counter} times`);
            addResult(counter,nickname)
        },time);
        clickBtn.addEventListener('click', () => {
            counter+=1
        });
    }
});
currentResult.addEventListener('click', () => {
    let result = sessionStorage.getItem('bestResult');
    alert(`Best result is: ${result}`);
});
allTimeResult.addEventListener('click',() => {
    let bestUser = JSON.parse(localStorage.allTimeBest);
    alert(`Best result for the whole time is: ${bestUser.best} by ${bestUser.name}`);
});
currentClear.addEventListener('click',() => {
    sessionStorage.bestResult=0;
    alert('Best result is cleared');
});
allTimeClear.addEventListener('click',() => {
    localStorage.allTimeBest=JSON.stringify({name: null, best:0});
    alert('Best result for the whole time is cleared');
});
