let inputUAH = document.getElementById('uah'),
    inputUSD = document.getElementById('usd'),
    currentRate = document.getElementById('currentRate');

function showCurrentRate () {
    let request = new XMLHttpRequest();
    request.open('GET', 'https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5', true);
    request.send();
    request.addEventListener('readystatechange', function () {
        if (request.readyState === 4 && request.status == 200) {
            let data = JSON.parse(request.response);
            let curUsd = data[0]['buy'];
            curUsd = +curUsd;
            currentRate.textContent = curUsd.toFixed(2);
        } else {
            currentRate.textContent = "Error";
        }
    });
};

showCurrentRate();

inputUAH.addEventListener('input', () => {
    let request = new XMLHttpRequest();
    request.open('GET', 'https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5', true);
    request.send();
    request.addEventListener('readystatechange', function () {
        if (request.readyState === 4 && request.status == 200) {
            let data = JSON.parse(request.response);
            let usdResult = inputUAH.value / data[0]['buy'];
            inputUSD.value = usdResult.toFixed(2);
        } else {
            inputUSD.value = "Error";
        }
    });
});

inputUSD.addEventListener('input', () => {
    let request = new XMLHttpRequest();
    request.open('GET', 'https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5', true);
    request.send();
    request.addEventListener('readystatechange', function () {
        if (request.readyState === 4 && request.status == 200) {
            let data = JSON.parse(request.response);
            let uahResult = inputUSD.value * data[0]['buy'];
            inputUAH.value = uahResult.toFixed(2);
        } else {
            inputUAH.value = "Error";
        }
    });
});

document.addEventListener('keydown', function(event) {
    if (event.code == 'Backspace') {
        inputUAH.value = "";
        inputUSD.value = "";
    }
});