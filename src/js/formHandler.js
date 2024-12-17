import { validateURL } from "./urlChecker";

const form = document.getElementById('urlForm');
form.addEventListener('submit', handleSubmit);

function handleSubmit(event) {

    event.preventDefault(); 
    let urlQuery = document.getElementById('url').value
    console.log("Submitted URL:", urlQuery);
    if(validateURL(urlQuery))
    {
        
        postDataToServer('http://localhost:3000/api', {url: urlQuery})
        .then(function(res) {
            if (res.error) {
             
                document.getElementById('polarity').innerHTML = 'Error: ' + res.error.message;
                document.getElementById("agreement").innerHTML = 'Error: ' + res.error.message;
                document.getElementById("subjectivity").innerHTML = 'Error: ' + res.error.message;
                document.getElementById("confidence").innerHTML = 'Error: ' + res.error.message;
                document.getElementById("irony").innerHTML = 'Error: ' + res.error.message;
            } else {
                
                if (res.status && res.status.code) {
                    const statusCode = res.status.code;
                    const statusMessage = res.status.msg;

                    if (statusCode == 100)
                    {
                        document.getElementById('polarity').innerHTML = statusMessage;
                        document.getElementById("agreement").innerHTML = statusMessage;
                        document.getElementById("subjectivity").innerHTML = statusMessage;
                        document.getElementById("confidence").innerHTML = statusMessage;
                        document.getElementById("irony").innerHTML = statusMessage;
                    }
                    else
                    {
                        document.getElementById('polarity').innerHTML = 'Polarity: ' + polChecker(res.score_tag);
                        document.getElementById("agreement").innerHTML = `Agreement: ${res.agreement}`;
                        document.getElementById("subjectivity").innerHTML = `Subjectivity: ${res.subjectivity}`;
                        document.getElementById("confidence").innerHTML = `Confidence: ${res.confidence}`;
                        document.getElementById("irony").innerHTML = `Irony: ${res.irony}`;
                    }
                }
 
            }
        })
    } 
        else 
        {
            alert('invalid URL, please try with a valid URL.');
        }
        
    
}

const postDataToServer = async (url = "", dataToBeSent = {}) => {
    
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        mode: 'cors',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToBeSent)
    });
    try {
        const receivedData = await response.json();
        console.log('Data received:', receivedData)
        return receivedData;
    } catch (error) {
        console.log('error', error);
    }
};

const polChecker = (score) => {
    let display;
    switch (score){
        case 'P+':
            display = 'strong positive';
            break;
        case 'P':
            display = 'positive';
            break;
        case 'NEW':
            display = 'neutral';
            break;
        case 'N':
            display = 'negative';
            break;
        case 'N+':
            display = 'strong negative';
            break;
        case 'NONE':
            display = 'no sentiment';
    }
    return display.toUpperCase();
}

export { handleSubmit }
export { polChecker }