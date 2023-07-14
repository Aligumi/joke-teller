const button = document.getElementById("button");
const audioElement = document.getElementById("audio");

// Disable/Enable button
const toggleButton = () => {
    button.disabled = !button.disabled;
}
function textToSpeech(joke) {
    VoiceRSS.speech({
        key: 'fc1f8c507cc64e45afcf35cf98fe99a2',
        src: joke,
        hl: 'en-us',
        v: 'Linda',
        r: 0, 
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });  
}
// Fetch joke from api
async function getJoke() {
    let joke = "";
    const url = 'https://jokeapi-v2.p.rapidapi.com/joke/Any?format=json%20&blacklistFlags=nsfw%2Cracist';
    const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '5b599cf020msh61def43d428be89p168205jsn814d4adda9ac',
		'X-RapidAPI-Host': 'jokeapi-v2.p.rapidapi.com'
	}
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        if (result.setup) {
            joke = `${result.setup + "," + result.delivery}`
        } else {
            joke = result.joke;
        }
        textToSpeech(joke);
        // Disable button
        toggleButton()
    } catch (error) {
        console.error(error);
    }    
}

button.addEventListener("click",getJoke);
audioElement.addEventListener("ended", toggleButton);

