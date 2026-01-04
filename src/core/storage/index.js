/**
 * StorageService - Handles all localStorage operations with namespacing
 * Replaces storehouse-js with a custom implementation
 * @module core/storage
 */

import { STORAGE_KEYS, NAMESPACE } from './keys.js';

class StorageService {
    constructor(namespace = NAMESPACE) {
        this.namespace = namespace;
    }

    /**
     * Get full key with namespace
     * @private
     */
    _getKey(key) {
        return `${this.namespace}.${key}`;
    }

    /**
     * Get a value from storage
     * @param {string} key - Storage key
     * @returns {*} Stored value or null
     */
    get(key) {
        try {
            const item = localStorage.getItem(this._getKey(key));
            if (!item) return null;

            const { value, expiresAt } = JSON.parse(item);

            // Check expiration
            if (expiresAt && Date.now() > expiresAt) {
                this.remove(key);
                return null;
            }

            return value;
        } catch (error) {
            console.warn(`Storage get error for key "${key}":`, error);
            return null;
        }
    }

    /**
     * Set a value in storage
     * @param {string} key - Storage key
     * @param {*} value - Value to store
     * @param {number|null} ttlMs - Time to live in milliseconds (null for no expiration)
     */
    set(key, value, ttlMs = null) {
        try {
            const item = {
                value,
                expiresAt: ttlMs ? Date.now() + ttlMs : null,
                updatedAt: Date.now()
            };
            localStorage.setItem(this._getKey(key), JSON.stringify(item));
            return true;
        } catch (error) {
            console.error(`Storage set error for key "${key}":`, error);
            return false;
        }
    }

    /**
     * Remove a value from storage
     * @param {string} key - Storage key
     */
    remove(key) {
        try {
            localStorage.removeItem(this._getKey(key));
            return true;
        } catch (error) {
            console.warn(`Storage remove error for key "${key}":`, error);
            return false;
        }
    }

    /**
     * Check if a key exists
     * @param {string} key - Storage key
     * @returns {boolean}
     */
    has(key) {
        return this.get(key) !== null;
    }

    /**
     * Get a boolean value
     * @param {string} key - Storage key
     * @param {boolean} defaultValue - Default if not found
     * @returns {boolean}
     */
    getBoolean(key, defaultValue = false) {
        const value = this.get(key);
        return value !== null ? Boolean(value) : defaultValue;
    }

    /**
     * Get a string value
     * @param {string} key - Storage key
     * @param {string} defaultValue - Default if not found
     * @returns {string}
     */
    getString(key, defaultValue = '') {
        const value = this.get(key);
        return value !== null ? String(value) : defaultValue;
    }

    /**
     * Get a number value
     * @param {string} key - Storage key
     * @param {number} defaultValue - Default if not found
     * @returns {number}
     */
    getNumber(key, defaultValue = 0) {
        const value = this.get(key);
        return value !== null ? Number(value) : defaultValue;
    }

    /**
     * Get an object value
     * @param {string} key - Storage key
     * @param {Object} defaultValue - Default if not found
     * @returns {Object}
     */
    getObject(key, defaultValue = null) {
        const value = this.get(key);
        return value !== null && typeof value === 'object' ? value : defaultValue;
    }

    /**
     * Get an array value
     * @param {string} key - Storage key
     * @param {Array} defaultValue - Default if not found
     * @returns {Array}
     */
    getArray(key, defaultValue = []) {
        const value = this.get(key);
        return Array.isArray(value) ? value : defaultValue;
    }

    /**
     * Clear all items with this namespace
     */
    clearAll() {
        const prefix = this._getKey('');
        const keysToRemove = [];

        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key && key.startsWith(prefix)) {
                keysToRemove.push(key);
            }
        }

        keysToRemove.forEach(key => localStorage.removeItem(key));
    }

    /**
     * Get all keys in this namespace
     * @returns {string[]}
     */
    getAllKeys() {
        const prefix = this._getKey('');
        const keys = [];

        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key && key.startsWith(prefix)) {
                keys.push(key.replace(prefix, ''));
            }
        }

        return keys;
    }

    /**
     * Get storage usage info
     * @returns {{ used: number, available: number }}
     */
    getStorageInfo() {
        let used = 0;
        const prefix = this._getKey('');

        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key && key.startsWith(prefix)) {
                const value = localStorage.getItem(key);
                used += key.length + (value?.length || 0);
            }
        }

        // Approximate available (5MB typical limit)
        const totalAvailable = 5 * 1024 * 1024;

        return {
            used,
            available: totalAvailable - used,
            usedFormatted: this._formatBytes(used),
            availableFormatted: this._formatBytes(totalAvailable - used)
        };
    }

    /**
     * Format bytes to human readable
     * @private
     */
    _formatBytes(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }
}

// Singleton instance
export const storage = new StorageService();

// Re-export keys for convenience
export { STORAGE_KEYS, NAMESPACE };

export default storage;
