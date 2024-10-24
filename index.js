const apiKey = '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'; // Замените на ваш ключ API

document.getElementById('chat-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const userInput = document.getElementById('user-input').value;
    document.getElementById('user-input').value = '';

    displayMessage(userInput, 'user');

    try {
        const response = await sendMessageToOpenAI(userInput);
        const botMessage = response.choices[0].message.content; 
        displayMessage(botMessage, 'bot');
    } catch (error) {
        console.error('Error fetching from OpenAI:', error);
        displayMessage('Error getting response from AI', 'bot');
    }
});

function displayMessage(message, sender) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', sender);
    messageElement.textContent = message;
    document.getElementById('messages').appendChild(messageElement);
    document.getElementById('chatbox').scrollTop = document.getElementById('chatbox').scrollHeight;
}

async function sendMessageToOpenAI(message) {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: message }]
        })
    });

    return response.json();
}