//ahutor:herbert qq:464884492
const controller = new AbortController();
const signal = controller.signal;
const timeoutPromise = function (timeout) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            reject(new Response("timeout", { status: 504, statusText: "timeout " }));
            controller.abort();
        }, timeout);
    });
};
const requestPromise = function (url) {
    return fetch(url, {
        signal: signal
    });
};

export const fetchWithTimeout = async () => {
    try {
        const resp = await Promise.race([timeoutPromise(3000), requestPromise("https://freechat.one/")])
        console.log('success ', resp);
    } catch (error) {
        console.log('error ', error);
    }
}

