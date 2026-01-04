/**
 * DOM Utility Functions
 * Helpers for DOM manipulation
 * @module utils/dom
 */

/**
 * Query selector shorthand
 * @param {string} selector - CSS selector
 * @param {Element} parent - Parent element (default: document)
 * @returns {Element|null} Found element or null
 */
export function $(selector, parent = document) {
    return parent.querySelector(selector);
}

/**
 * Query selector all shorthand
 * @param {string} selector - CSS selector
 * @param {Element} parent - Parent element (default: document)
 * @returns {Element[]} Array of elements
 */
export function $$(selector, parent = document) {
    return Array.from(parent.querySelectorAll(selector));
}

/**
 * Get element by ID
 * @param {string} id - Element ID
 * @returns {Element|null} Found element or null
 */
export function byId(id) {
    return document.getElementById(id);
}

/**
 * Create element with attributes and children
 * @param {string} tag - Tag name
 * @param {Object} attrs - Attributes object
 * @param {(string|Element)[]} children - Child elements or text
 * @returns {Element} Created element
 */
export function createElement(tag, attrs = {}, children = []) {
    const el = document.createElement(tag);

    Object.entries(attrs).forEach(([key, value]) => {
        if (key === 'className') {
            el.className = value;
        } else if (key === 'style' && typeof value === 'object') {
            Object.assign(el.style, value);
        } else if (key.startsWith('on') && typeof value === 'function') {
            const event = key.slice(2).toLowerCase();
            el.addEventListener(event, value);
        } else if (key === 'dataset' && typeof value === 'object') {
            Object.entries(value).forEach(([k, v]) => {
                el.dataset[k] = v;
            });
        } else {
            el.setAttribute(key, value);
        }
    });

    children.forEach(child => {
        if (typeof child === 'string') {
            el.appendChild(document.createTextNode(child));
        } else if (child instanceof Element) {
            el.appendChild(child);
        }
    });

    return el;
}

/**
 * Add class(es) to element
 * @param {Element} el - Target element
 * @param {...string} classes - Class names
 */
export function addClass(el, ...classes) {
    el?.classList.add(...classes);
}

/**
 * Remove class(es) from element
 * @param {Element} el - Target element
 * @param {...string} classes - Class names
 */
export function removeClass(el, ...classes) {
    el?.classList.remove(...classes);
}

/**
 * Toggle class on element
 * @param {Element} el - Target element
 * @param {string} className - Class name
 * @param {boolean} force - Force add/remove
 * @returns {boolean} Whether class is now present
 */
export function toggleClass(el, className, force) {
    return el?.classList.toggle(className, force) ?? false;
}

/**
 * Check if element has class
 * @param {Element} el - Target element
 * @param {string} className - Class name
 * @returns {boolean} Whether element has class
 */
export function hasClass(el, className) {
    return el?.classList.contains(className) ?? false;
}

/**
 * Show element
 * @param {Element} el - Target element
 * @param {string} display - Display value (default: 'block')
 */
export function show(el, display = 'block') {
    if (el) el.style.display = display;
}

/**
 * Hide element
 * @param {Element} el - Target element
 */
export function hide(el) {
    if (el) el.style.display = 'none';
}

/**
 * Toggle element visibility
 * @param {Element} el - Target element
 * @param {string} display - Display value when shown
 * @returns {boolean} Whether element is now visible
 */
export function toggle(el, display = 'block') {
    if (!el) return false;
    const isHidden = el.style.display === 'none' || getComputedStyle(el).display === 'none';
    el.style.display = isHidden ? display : 'none';
    return isHidden;
}

/**
 * Add event listener with cleanup function
 * @param {Element} el - Target element
 * @param {string} event - Event name
 * @param {Function} handler - Event handler
 * @param {Object} options - Event options
 * @returns {Function} Cleanup function
 */
export function on(el, event, handler, options) {
    el?.addEventListener(event, handler, options);
    return () => el?.removeEventListener(event, handler, options);
}

/**
 * Add one-time event listener
 * @param {Element} el - Target element
 * @param {string} event - Event name
 * @param {Function} handler - Event handler
 */
export function once(el, event, handler) {
    el?.addEventListener(event, handler, { once: true });
}

/**
 * Delegate event to child elements
 * @param {Element} parent - Parent element
 * @param {string} event - Event name
 * @param {string} selector - Child selector
 * @param {Function} handler - Event handler
 * @returns {Function} Cleanup function
 */
export function delegate(parent, event, selector, handler) {
    const delegateHandler = (e) => {
        const target = e.target.closest(selector);
        if (target && parent.contains(target)) {
            handler.call(target, e, target);
        }
    };
    parent?.addEventListener(event, delegateHandler);
    return () => parent?.removeEventListener(event, delegateHandler);
}

/**
 * Get element's offset from document
 * @param {Element} el - Target element
 * @returns {{ top: number, left: number }} Offset object
 */
export function getOffset(el) {
    const rect = el.getBoundingClientRect();
    return {
        top: rect.top + window.scrollY,
        left: rect.left + window.scrollX
    };
}

/**
 * Scroll element into view smoothly
 * @param {Element} el - Target element
 * @param {Object} options - Scroll options
 */
export function scrollIntoView(el, options = { behavior: 'smooth', block: 'center' }) {
    el?.scrollIntoView(options);
}

/**
 * Set element's inner HTML safely
 * @param {Element} el - Target element
 * @param {string} html - HTML string
 */
export function setHTML(el, html) {
    if (el) el.innerHTML = html;
}

/**
 * Set element's text content
 * @param {Element} el - Target element
 * @param {string} text - Text content
 */
export function setText(el, text) {
    if (el) el.textContent = text;
}

/**
 * Get/set element's value
 * @param {HTMLInputElement} el - Input element
 * @param {string} value - Value to set (optional)
 * @returns {string} Element value
 */
export function val(el, value) {
    if (value !== undefined) {
        el.value = value;
    }
    return el?.value ?? '';
}

/**
 * Empty element's children
 * @param {Element} el - Target element
 */
export function empty(el) {
    if (el) el.innerHTML = '';
}

/**
 * Remove element from DOM
 * @param {Element} el - Target element
 */
export function remove(el) {
    el?.remove();
}

/**
 * Clone element
 * @param {Element} el - Target element
 * @param {boolean} deep - Deep clone
 * @returns {Element} Cloned element
 */
export function clone(el, deep = true) {
    return el?.cloneNode(deep);
}

/**
 * Check if element is visible
 * @param {Element} el - Target element
 * @returns {boolean} Whether element is visible
 */
export function isVisible(el) {
    if (!el) return false;
    const style = getComputedStyle(el);
    return style.display !== 'none' && style.visibility !== 'hidden' && style.opacity !== '0';
}

/**
 * Wait for DOM ready
 * @returns {Promise} Resolves when DOM is ready
 */
export function ready() {
    return new Promise(resolve => {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', resolve, { once: true });
        } else {
            resolve();
        }
    });
}

export default {
    $, $$, byId, createElement,
    addClass, removeClass, toggleClass, hasClass,
    show, hide, toggle,
    on, once, delegate,
    getOffset, scrollIntoView,
    setHTML, setText, val, empty, remove, clone,
    isVisible, ready
};
