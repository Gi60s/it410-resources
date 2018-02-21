// a setTimeout function that returns a promise
function pause(delay) {
    const t = Date.now();
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(Date.now() - t);
        }, delay);
    });
}

async function slowCount(max) {
    const t = Date.now();
    for (let i = 1; i <= max; i++) {
        const actualWait = await pause(1000);
        console.log(i + ' after ' + actualWait + ' milliseconds');
    }
    return Date.now() - t;
}

slowCount(5)
    .then(totalWait => {
        console.log(totalWait);
    });