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

async function openReviewWindow(prompt) {
    let params = [
        "left=500,top=500,width=500,height=500,menubar=no,toolbar=no,resizeable=no"
    ]
    const url = ("http://localhost:9995/?chat_box=").concat(prompt)
    window.open(url, "Chat", params);
}

function reviewChat(prompt) {
    return new Promise(() => {
        openReviewWindow(prompt);
    })
}

function scrapeOverview(selector) {
    return new Promise(resolve => {
        var overviewText = selector.innerText;
        resolve(overviewText);
    })
}

async function checkPage() {
    waitForElement(`div[aria-label="Show more AI Overview"]`, async (showMore) => {
        await showMore.click();
    });
    await delay(500);
    waitForElement(`div[jsname][data-rl]`, async (overview) => {
        scrapeOverview(overview).then(async (overviewText) => {
            console.log("hye")
            let prompt = "Please verify the validity of the following overview. Give an accuracy score out of 100:\n";
            prompt = prompt.concat(overviewText);
            reviewChat(prompt)
        });
    });    
}

checkPage()