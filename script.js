function sendMsg() {
    var msgInput = document.getElementById('msg');
    var msg = msgInput.value.trim();
    if (msg === '') return;

    var chatbox = document.getElementById('chatbox');
    chatbox.innerHTML += "<p class='user'><b>You:</b> " + msg + "</p>";

    fetch('/get', {
        method: 'POST',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        body: 'msg=' + encodeURIComponent(msg)
    })
    .then(response => response.json())
    .then(data => {
        chatbox.innerHTML += "<p class='bot'><b>Bot:</b> " + data.response + "</p>";
        chatbox.scrollTop = chatbox.scrollHeight; // scroll to bottom
    })
    .catch(err => {
        chatbox.innerHTML += "<p class='bot'><b>Bot:</b> Sorry, there was an error!</p>";
    });

    msgInput.value = '';
    msgInput.focus();
}
