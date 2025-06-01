export function getMathRandom() {
    let result = parseInt(Math.random() * 1000000) + 1000000
    return result.toString().slice(0, 6)
}