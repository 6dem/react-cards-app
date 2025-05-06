export function artificialDelay(delay = 800) {
    return new Promise((res) => setTimeout(res, delay))
}
