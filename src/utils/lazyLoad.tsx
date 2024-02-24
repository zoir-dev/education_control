export async function lazyLoad(delay = 2000) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve("Data fetched successfully after " + delay + " milliseconds");
        }, delay);
    });
}