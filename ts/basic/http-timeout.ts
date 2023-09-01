//ahutor:herbert qq:464884492
let controller = new AbortController();
let signal = controller.signal;

let timeoutPromise = (timeout) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            reject(new Response("timeout", { status: 504, statusText: "timeout " }));
            controller.abort();
        }, timeout);
    });
}
let requestPromise = (url) => {
    return fetch(url, {
        signal: signal
    });
};
Promise.race([timeoutPromise(3000), requestPromise("https://freechat.one/")])
    .then(resp => {
        console.log('success ', resp);
    })
    .catch(error => {
        console.log('error ', error);
    });