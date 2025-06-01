// utils/uni-promisify.js
export function promisify(api) {
    return (options = {}) => {
        return new Promise((resolve, reject) => {
            api({
                ...options,
                success: (res) => resolve(res),
                fail: (err) => reject(err)
            });
        });
    };
}