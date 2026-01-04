/**
 * Debounce and Throttle Utilities
 * Performance optimization helpers
 * @module utils/debounce
 */

/**
 * Creates a debounced function that delays invoking func until after wait milliseconds
 * have elapsed since the last time the debounced function was invoked.
 * @param {Function} fn - Function to debounce
 * @param {number} delay - Delay in milliseconds
 * @param {Object} options - Options object
 * @param {boolean} options.leading - Invoke on leading edge
 * @param {boolean} options.trailing - Invoke on trailing edge (default: true)
 * @returns {Function} Debounced function with cancel method
 */
export function debounce(fn, delay, options = {}) {
    const { leading = false, trailing = true } = options;
    let timeoutId = null;
    let lastArgs = null;
    let lastThis = null;
    let lastCallTime = 0;

    function invokeFunc() {
        const args = lastArgs;
        const thisArg = lastThis;
        lastArgs = lastThis = null;
        fn.apply(thisArg, args);
    }

    function debounced(...args) {
        const time = Date.now();
        const isInvoking = shouldInvoke(time);

        lastArgs = args;
        lastThis = this;
        lastCallTime = time;

        if (isInvoking) {
            if (timeoutId === null && leading) {
                invokeFunc();
            }
        }

        if (timeoutId !== null) {
            clearTimeout(timeoutId);
        }

        if (trailing) {
            timeoutId = setTimeout(() => {
                timeoutId = null;
                if (trailing && lastArgs) {
                    invokeFunc();
                }
            }, delay);
        }
    }

    function shouldInvoke(time) {
        const timeSinceLastCall = time - lastCallTime;
        return lastCallTime === 0 || timeSinceLastCall >= delay;
    }

    debounced.cancel = function () {
        if (timeoutId !== null) {
            clearTimeout(timeoutId);
            timeoutId = null;
        }
        lastArgs = lastThis = null;
        lastCallTime = 0;
    };

    debounced.flush = function () {
        if (timeoutId !== null && lastArgs) {
            invokeFunc();
            debounced.cancel();
        }
    };

    debounced.pending = function () {
        return timeoutId !== null;
    };

    return debounced;
}

/**
 * Creates a throttled function that only invokes func at most once per every wait milliseconds.
 * @param {Function} fn - Function to throttle
 * @param {number} limit - Time limit in milliseconds
 * @param {Object} options - Options object
 * @param {boolean} options.leading - Invoke on leading edge (default: true)
 * @param {boolean} options.trailing - Invoke on trailing edge (default: true)
 * @returns {Function} Throttled function with cancel method
 */
export function throttle(fn, limit, options = {}) {
    const { leading = true, trailing = true } = options;
    let lastArgs = null;
    let lastThis = null;
    let lastCallTime = 0;
    let timeoutId = null;

    function invokeFunc() {
        const args = lastArgs;
        const thisArg = lastThis;
        lastArgs = lastThis = null;
        lastCallTime = Date.now();
        fn.apply(thisArg, args);
    }

    function throttled(...args) {
        const time = Date.now();
        const timeSinceLastCall = time - lastCallTime;

        lastArgs = args;
        lastThis = this;

        if (timeSinceLastCall >= limit) {
            if (timeoutId !== null) {
                clearTimeout(timeoutId);
                timeoutId = null;
            }
            if (leading) {
                invokeFunc();
            }
        } else if (timeoutId === null && trailing) {
            timeoutId = setTimeout(() => {
                timeoutId = null;
                invokeFunc();
            }, limit - timeSinceLastCall);
        }
    }

    throttled.cancel = function () {
        if (timeoutId !== null) {
            clearTimeout(timeoutId);
            timeoutId = null;
        }
        lastArgs = lastThis = null;
        lastCallTime = 0;
    };

    return throttled;
}

/**
 * Creates a function that is invoked once and then cached
 * @param {Function} fn - Function to memoize
 * @returns {Function} Memoized function
 */
export function once(fn) {
    let called = false;
    let result;

    return function (...args) {
        if (!called) {
            called = true;
            result = fn.apply(this, args);
        }
        return result;
    };
}

/**
 * Delays execution by specified milliseconds
 * @param {number} ms - Milliseconds to delay
 * @returns {Promise} Promise that resolves after delay
 */
export function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Creates a function that runs after being called n times
 * @param {number} n - Number of calls before execution
 * @param {Function} fn - Function to execute
 * @returns {Function} Wrapped function
 */
export function after(n, fn) {
    let count = 0;
    return function (...args) {
        if (++count >= n) {
            return fn.apply(this, args);
        }
    };
}

/**
 * Creates a function that can only be called n times
 * @param {number} n - Maximum number of calls
 * @param {Function} fn - Function to execute
 * @returns {Function} Wrapped function
 */
export function before(n, fn) {
    let count = 0;
    let result;
    return function (...args) {
        if (count < n) {
            count++;
            result = fn.apply(this, args);
        }
        return result;
    };
}

export default { debounce, throttle, once, delay, after, before };
