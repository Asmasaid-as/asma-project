import { validateURL } from "./urlChecker";



function handleSubmit(event) {

    event.preventDefault(); 
    let urlQuery = document.getElementById('urlvalue').value
    console.log("Submitted URL:", urlQuery);
    if(validateURL(urlQuery))
    {
        
        postDataToServer('http://localhost:3000/api', {url: urlQuery})
        .then(function(res) {
            if (res.error) {
             
                document.getElementById('result_polarity').innerHTML = 'Error: ' + res.error.message;
                document.getElementById("agree").innerHTML = 'Error: ' + res.error.message;
                document.getElementById("subjectivity_conf").innerHTML = 'Error: ' + res.error.message;
                document.getElementById("pol_confidence").innerHTML = 'Error: ' + res.error.message;
                document.getElementById("irony").innerHTML = 'Error: ' + res.error.message;
            } else {
                
                if (res.status && res.status.code) {
                    const statusCode = res.status.code;
                    const statusMessage = res.status.msg;

                    if (statusCode == 100)
                    {
                        document.getElementById('result_polarity').innerHTML = statusMessage;
                        document.getElementById("agree").innerHTML = statusMessage;
                        document.getElementById("subjectivity_conf").innerHTML = statusMessage;
                        document.getElementById("pol_confidence").innerHTML = statusMessage;
                        document.getElementById("irony").innerHTML = statusMessage;
                    }
                    else
                    {
                        document.getElementById('result_polarity').innerHTML = '' + polChecker(res.score_tag);
                        document.getElementById("agree").innerHTML = ` ${res.agreement}`;
                        document.getElementById("subjectivity_conf").innerHTML = ` ${res.subjectivity}`;
                        document.getElementById("pol_confidence").innerHTML = ` ${res.confidence}`;
                        document.getElementById("irony").innerHTML = `${res.irony}`;
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

    if (!score || typeof score !== 'string') {
        return 'INVALID SCORE';
    }

    if (score )
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
        default:
            return 'UNKNOWN SCORE';
    }
    return display.toUpperCase();
}

export { handleSubmit }
export { polChecker }