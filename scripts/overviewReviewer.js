function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time))
}

function waitForElement(selector, callback){
    const interval = setInterval(() => {
        const element = document.querySelector(selector);
        if (element) {
            clearInterval(interval);
            callback(element);
        }
    }, 100)
}

function reviewPopup(confirmPopup, cancelPopup) {
    if (confirm("AI Review?")) {
        txt = "Let's do it";
        confirmPopup()
    } else {
        txt = "nvm";
        cancelPopup()
    }
}

async function query_llm(query) {
    let url = "http://localhost:11434/api/chat";
    let prompt = "Please verify the validity of the following overview. Give an accuracy score out of 100.";
    prompt = prompt.concat(query);
    let params = {
        "model": "llama2",
        "messages": [
            {"role": "user", "content": prompt}
        ]
    };
    const options = {
        method: "POST",
        body: JSON.stringify(params)
    };
    let response = await (await fetch(url, options)).text();
    return response;
}

function openReview() {
    return new Promise((resolve, reject) => {
        reviewPopup(resolve, reject);
    })
}

function scrapeOverview(selector) {
    return new Promise(resolve => {
        var innerText = selector.innerText;
        resolve(innerText);
    })
}

async function checkPage() {
    waitForElement(`div[aria-label="Show more AI Overview"]`, async (showMore) => {
        await showMore.click();
    });
    await delay(500);
    waitForElement(`div[jsname][data-rl]`, async (overview) => {
        scrapeOverview(overview).then(async (innerText) => {
            console.log(innerText);
            let llm_response = await query_llm(innerText);
            console.log(llm_response)
        });
    });

    
}

checkPage()