let messageInput = document.querySelector('#content');
let response = document.querySelector('#response');
let connectingElement = document.querySelector('#connecting');
let arrayResponse = document.querySelector('#arrayResponse');
let stompClient = null;

function connect() {
    let socket = new SockJS('/sequence');
    stompClient = Stomp.over(socket);
    stompClient.connect({}, onConnected, onError);
}

connect();

function onConnected() {
    stompClient.subscribe('/topic/array', onArrayReceived);
    stompClient.subscribe('/topic/autoNumbers', onMessageAutoGenerationReceived);
    stompClient.subscribe('/topic/numbers', onMessageGenerationReceived);
    connectingElement.classList.add('hidden');
}

function onError() {
    connectingElement.textContent = 'Could not connect to WebSocket server. Please refresh this page to try again!';
    connectingElement.style.color = 'red';
}

function arrayGeneration() {
    let messageContent = messageInput.value.trim();
    if (messageContent && stompClient) {
        let sequence = {
            content: messageContent
        };
        console.log(sequence);
        stompClient.send("/app/sequence.arrayGeneration", {}, JSON.stringify(sequence));
    }
}

function autoGeneration() {
    let messageContent = arrayResponse.textContent.trim();
    console.log(messageContent);
    if (messageContent && stompClient) {
        let sequence = {
            content: messageContent
        };
        stompClient.send("/app/sequence.autoGeneration", {}, JSON.stringify(sequence));
    }
}

function generation() {
    let messageContent = arrayResponse.textContent.trim();
    console.log(messageContent);
    if (messageContent && stompClient) {
        let sequence = {
            content: messageContent
        };
        stompClient.send("/app/sequence.generation", {}, JSON.stringify(sequence));
    }
}

function onMessageAutoGenerationReceived(autoPayload) {
    if (onMessageAutoGenerationReceived.count < 5) {
        let message = JSON.parse(autoPayload.body);
        let str = message.content.replace(/[^,\d]/g, "");
        console.log(str);
        let array = str.split(",");
        console.log(array);
        let tableElement = document.createElement('table');
        let bodyElement = document.createElement('tbody');
        let row = document.createElement('tr');
        for (let i = 0; i < 6; i++) {
            let cell = document.createElement('td');
            cell.innerHTML = array[i];
            row.appendChild(cell);
        }
        bodyElement.appendChild(row);
        setTimeout(autoGeneration, 10000);
        tableElement.appendChild(bodyElement);
        response.appendChild(tableElement);
        onMessageAutoGenerationReceived.count++;
    }
}

onMessageAutoGenerationReceived.count = 0;

function onMessageGenerationReceived(payload) {
    let message = JSON.parse(payload.body);
    let str = message.content.replace(/[^,\d]/g, "");
    console.log(str);
    let array = str.split(",");
    console.log(array);
    let tableElement = document.createElement('table');
    let bodyElement = document.createElement('tbody');
    let row1 = document.createElement('tr');
    for (let i = 0; i < 6; i++) {
        let cell = document.createElement('td');
        cell.innerHTML = array[i];
        row1.appendChild(cell);
    }
    let row2 = document.createElement('tr');
    for (let i = 6; i < 12; i++) {
        let cell = document.createElement('td');
        cell.innerHTML = array[i];
        row2.appendChild(cell);
    }
    let row3 = document.createElement('tr');
    for (let i = 12; i < 18; i++) {
        let cell = document.createElement('td');
        cell.innerHTML = array[i];
        row3.appendChild(cell);
    }
    let row4 = document.createElement('tr');
    for (let i = 18; i < 24; i++) {
        let cell = document.createElement('td');
        cell.innerHTML = array[i];
        row4.appendChild(cell);
    }
    let row5 = document.createElement('tr');
    for (let i = 24; i < 30; i++) {
        let cell = document.createElement('td');
        cell.innerHTML = array[i];
        row5.appendChild(cell);
    }
    bodyElement.appendChild(row1);
    bodyElement.appendChild(row2);
    bodyElement.appendChild(row3);
    bodyElement.appendChild(row4);
    bodyElement.appendChild(row5);
    tableElement.appendChild(bodyElement);
    response.appendChild(tableElement);
}

function onArrayReceived(payload) {
    if (document.getElementById("primeNumber")){
        let element = document.getElementById("primeNumber");
        arrayResponse.parentNode.removeChild(element);
    } else {
        let message = JSON.parse(payload.body);
        let messageElement = document.createElement('span');
        messageElement.setAttribute("id", "primeNumber");
        let messageText = document.createTextNode(message.content);
        messageElement.appendChild(messageText);
        arrayResponse.appendChild(messageElement);
    }
}