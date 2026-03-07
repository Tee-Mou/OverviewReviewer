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

function scrapeOverview(selector) {
    let element = document.querySelector(selector);
    document.body.style.border = "5px solid red";
}

function openReview() {
    if (confirm("AI Review?")) {
        txt = "Let's do it";
    } else {
        txt = "nvm";
    }
}

waitForElement(`div[aria-label="Show more AI Overview"]`, async (element) => {
    delay(500).then(async () => {
        await element.click();
        openReview()
        scrapeOverview(`div[jsname][data-rl]`);
    })    
})