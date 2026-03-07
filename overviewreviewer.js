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
    document.body.style.border = "5px solid red";
}

function openReview() {
    if (confirm("AI Review?")) {
        txt = "Let's do it";
    } else {
        txt = "nvm";
    }
}

async function checkPage() {
    waitForElement(`div[aria-label="Show more AI Overview"]`, async (showMore) => {
        await delay(500);
        await showMore.click();
        await waitForElement(`div[jsname][data-rl]`, async (overview) => {
            await scrapeOverview(overview);
        });
    })
}

checkPage()