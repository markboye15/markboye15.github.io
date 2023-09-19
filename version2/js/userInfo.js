export function randomize() {
    if (window.crypto && window.crypto.getRandomValues) {
        // Use the crypto API if available
        var randomArray = new Uint32Array(1)
        window.crypto.getRandomValues(randomArray)
        var randomNumber = randomArray[0] / 0xFFFFFF //  (/ 0xFFFFFFFF)  Normalize to [0, 1]
        return Math.floor(randomNumber * 10)
    } else {
        // Fallback to Math.random() if crypto API is not available
        return Math.floor(Math.random() * 10)

    }
}

export const userInfo = async () => {
    const currentURL = window.location.href
    const params = new URLSearchParams(currentURL.split('?')[1])
    const queryParams = {}
    for (const [key, value] of params) {
        queryParams[key] = value

    }

    if (queryParams['pl'] == null) {
        queryParams['pl'] = "name" + randomize()
        // window.location.href = currentURL + "?pl=" + queryParams['pl']
        window.history.pushState("", "", "?pl=" + queryParams['pl'])
    }

    return queryParams
}

