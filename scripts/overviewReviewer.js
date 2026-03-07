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

function openReview() {
    return new Promise((resolve, reject) => {
        reviewPopup(resolve, reject);
    })
}

function scrapeOverview(selector) {
    return new Promise(resolve => {
        var innerText = selector.innerText;
        var html = selector;
        resolve(html, innerText);
    })
}

async function checkPage() {
    var markdown = null;
    waitForElement(`div[aria-label="Show more AI Overview"]`, async (showMore) => {
        await showMore.click();
    });
    await delay(500);
    waitForElement(`div[jsname][data-rl]`, async (overview) => {
        scrapeOverview(overview).then(async (html, innerText) => {
            console.log(html);
            console.log(innerText);
        });
    });

    
}

checkPage()