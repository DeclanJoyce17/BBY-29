const responseData = JSON.parse(localStorage.getItem('responseData'));
const toggledDivContent = JSON.parse(localStorage.getItem('toggledDivsContent'));
console.log("recommendation: ", responseData);
console.log('div content', toggledDivContent);
const rec = document.getElementById('ai-recommendation');
rec.innerHTML = responseData.message.replace(/\n/g, '<br>');

// Iterate over the array and toggle corresponding divs
toggledDivContent.forEach(topic => {
    console.log('topic', topic);
    const divToToggle = document.querySelector(`#${topic.toLowerCase()}`);
    if (divToToggle) {
        divToToggle.classList.toggle('active');
    }
});

// Convert text response to speech by sending the text content to backend which handles Google Text to Speech API requests

async function textToSpeech() {

    const textInput = rec.innerText.trim(); 
    // console.log(textInput);
    if (!textInput) {
        console.log('Error: Text content is empty');
        return;
    }
    // send a POST request to the server with the text content
    const response = await fetch('/text-to-speech', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text: textInput })
    });

    console.log("Response", response);

    if (response.ok) {
        // Once the server responds with the audio data, create and append the audio element
        const fileName = await response.text();
        const audioElement = document.createElement('audio');
        audioElement.controls = true;
        audioElement.autoplay = true;

        audioElement.src = '/img/text-to-speech-audios/' + fileName;

        const audioContainer = document.getElementById('audio-container');
        audioContainer.innerHTML = '';
        audioContainer.appendChild(audioElement);

    } else {
        console.log('Error: ', response.statusText);
    }
}

// textToSpeech();  

const homeBtn = document.getElementById('home');
homeBtn.addEventListener('click', () => {
  window.location.href = '/main';
});

const backBtn = document.getElementById('go-back');
backBtn.addEventListener('click', () => {
  window.history.back();
})