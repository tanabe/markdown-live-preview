/**
 * Goals Feature Module
 * Tracks writing goals (word count, time, etc.)
 * @module features/goals
 */

import { eventBus, EVENTS } from '../../utils/eventBus.js';
import { storageService } from '../../core/storage/index.js';
import { STORAGE_KEYS } from '../../core/storage/keys.js';
import { markdownService } from '../../core/markdown/index.js';

/**
 * Goal types
 */
export const GOAL_TYPES = {
    WORDS: 'words',
    CHARACTERS: 'characters',
    TIME: 'time' // in minutes
};

/**
 * Goal data structure
 * @typedef {Object} Goal
 * @property {string} type - Goal type
 * @property {number} target - Target value
 * @property {number} current - Current progress
 * @property {number} startedAt - Start timestamp
 * @property {boolean} completed - Is goal completed
 */

/**
 * GoalsManager class
 * Manages writing goals
 */
class GoalsManager {
    static instance = null;

    constructor() {
        if (GoalsManager.instance) {
            return GoalsManager.instance;
        }

        this.goals = [];
        this.dailyGoal = null;
        this.sessionStart = Date.now();
        this.container = null;
        this.updateInterval = null;
        this.initialized = false;

        GoalsManager.instance = this;
    }

    /**
     * Initialize goals manager
     * @param {HTMLElement|string} container - Goals container element
     */
    initialize(container = null) {
        if (this.initialized) return;

        if (container) {
            this.container = typeof container === 'string'
                ? document.querySelector(container)
                : container;
        }

        // Load saved goals
        this._loadGoals();

        // Setup event listeners
        this._setupEventListeners();

        // Start update interval for time-based goals
        this._startUpdateInterval();

        this.initialized = true;
    }

    /**
     * Load goals from storage
     * @private
     */
    _loadGoals() {
        const savedGoals = storageService.get(STORAGE_KEYS.GOALS);
        if (savedGoals) {
            this.goals = savedGoals.goals || [];
            this.dailyGoal = savedGoals.dailyGoal || null;

            // Check if daily goal is from today
            if (this.dailyGoal) {
                const today = new Date().toDateString();
                const goalDate = new Date(this.dailyGoal.startedAt).toDateString();
                if (today !== goalDate) {
                    // Reset daily goal for new day
                    this.dailyGoal.current = 0;
                    this.dailyGoal.completed = false;
                    this.dailyGoal.startedAt = Date.now();
                }
            }
        }
    }

    /**
     * Save goals to storage
     * @private
     */
    _saveGoals() {
        storageService.set(STORAGE_KEYS.GOALS, {
            goals: this.goals,
            dailyGoal: this.dailyGoal
        });
    }

    /**
     * Setup event listeners
     * @private
     */
    _setupEventListeners() {
        // Listen for content changes
        eventBus.on(EVENTS.CONTENT_CHANGED, ({ content }) => {
            this._updateProgress(content);
        });
    }

    /**
     * Start update interval
     * @private
     */
    _startUpdateInterval() {
        // Update time-based goals every minute
        this.updateInterval = setInterval(() => {
            this._updateTimeGoals();
        }, 60000);
    }

    /**
     * Update progress based on content
     * @param {string} content - Current content
     * @private
     */
    _updateProgress(content) {
        const stats = markdownService.extractStats(content);

        // Update word-based goals
        this.goals.forEach(goal => {
            if (goal.type === GOAL_TYPES.WORDS) {
                const wasCompleted = goal.completed;
                goal.current = stats.words;
                goal.completed = goal.current >= goal.target;

                if (goal.completed && !wasCompleted) {
                    this._onGoalCompleted(goal);
                }
            } else if (goal.type === GOAL_TYPES.CHARACTERS) {
                const wasCompleted = goal.completed;
                goal.current = stats.characters;
                goal.completed = goal.current >= goal.target;

                if (goal.completed && !wasCompleted) {
                    this._onGoalCompleted(goal);
                }
            }
        });

        // Update daily goal
        if (this.dailyGoal) {
            const wasCompleted = this.dailyGoal.completed;

            if (this.dailyGoal.type === GOAL_TYPES.WORDS) {
                this.dailyGoal.current = stats.words;
            } else if (this.dailyGoal.type === GOAL_TYPES.CHARACTERS) {
                this.dailyGoal.current = stats.characters;
            }

            this.dailyGoal.completed = this.dailyGoal.current >= this.dailyGoal.target;

            if (this.dailyGoal.completed && !wasCompleted) {
                this._onGoalCompleted(this.dailyGoal, true);
            }
        }

        this._saveGoals();
        this.render();
    }

    /**
     * Update time-based goals
     * @private
     */
    _updateTimeGoals() {
        const sessionMinutes = Math.floor((Date.now() - this.sessionStart) / 60000);

        this.goals.forEach(goal => {
            if (goal.type === GOAL_TYPES.TIME) {
                const wasCompleted = goal.completed;
                goal.current = sessionMinutes;
                goal.completed = goal.current >= goal.target;

                if (goal.completed && !wasCompleted) {
                    this._onGoalCompleted(goal);
                }
            }
        });

        this._saveGoals();
        this.render();
    }

    /**
     * Handle goal completion
     * @param {Goal} goal - Completed goal
     * @param {boolean} isDaily - Is daily goal
     * @private
     */
    _onGoalCompleted(goal, isDaily = false) {
        eventBus.emit(EVENTS.GOAL_COMPLETED, { goal, isDaily });

        // Show notification
        eventBus.emit(EVENTS.TOAST_SHOW, {
            message: isDaily
                ? '🎉 Daily goal completed!'
                : `🎉 Goal reached: ${goal.target} ${goal.type}!`,
            type: 'success',
            duration: 5000
        });
    }

    /**
     * Set daily goal
     * @param {string} type - Goal type
     * @param {number} target - Target value
     */
    setDailyGoal(type, target) {
        this.dailyGoal = {
            type,
            target,
            current: 0,
            startedAt: Date.now(),
            completed: false
        };

        this._saveGoals();
        this.render();

        eventBus.emit(EVENTS.GOAL_SET, { goal: this.dailyGoal, isDaily: true });
    }

    /**
     * Add a session goal
     * @param {string} type - Goal type
     * @param {number} target - Target value
     * @returns {Goal} Created goal
     */
    addGoal(type, target) {
        const goal = {
            id: `goal-${Date.now()}`,
            type,
            target,
            current: 0,
            startedAt: Date.now(),
            completed: false
        };

        this.goals.push(goal);
        this._saveGoals();
        this.render();

        eventBus.emit(EVENTS.GOAL_SET, { goal, isDaily: false });

        return goal;
    }

    /**
     * Remove a goal
     * @param {string} goalId - Goal ID
     */
    removeGoal(goalId) {
        const index = this.goals.findIndex(g => g.id === goalId);
        if (index !== -1) {
            this.goals.splice(index, 1);
            this._saveGoals();
            this.render();
        }
    }

    /**
     * Clear daily goal
     */
    clearDailyGoal() {
        this.dailyGoal = null;
        this._saveGoals();
        this.render();
    }

    /**
     * Get progress percentage
     * @param {Goal} goal - Goal object
     * @returns {number} Progress percentage (0-100)
     */
    getProgress(goal) {
        if (!goal || goal.target === 0) return 0;
        return Math.min(100, Math.round((goal.current / goal.target) * 100));
    }

    /**
     * Get daily goal
     * @returns {Goal|null} Daily goal
     */
    getDailyGoal() {
        return this.dailyGoal;
    }

    /**
     * Get all session goals
     * @returns {Goal[]} All goals
     */
    getAllGoals() {
        return [...this.goals];
    }

    /**
     * Render goals UI
     */
    render() {
        if (!this.container) return;

        this.container.innerHTML = '';

        // Render daily goal
        if (this.dailyGoal) {
            const dailyEl = this._createGoalElement(this.dailyGoal, true);
            this.container.appendChild(dailyEl);
        }

        // Render session goals
        this.goals.forEach(goal => {
            const goalEl = this._createGoalElement(goal);
            this.container.appendChild(goalEl);
        });

        // Add "set goal" button if no daily goal
        if (!this.dailyGoal) {
            const addBtn = document.createElement('button');
            addBtn.className = 'goal-add-btn';
            addBtn.textContent = '+ Set Daily Goal';
            addBtn.addEventListener('click', () => {
                eventBus.emit(EVENTS.SHOW_GOAL_DIALOG);
            });
            this.container.appendChild(addBtn);
        }
    }

    /**
     * Create goal element
     * @param {Goal} goal - Goal data
     * @param {boolean} isDaily - Is daily goal
     * @returns {HTMLElement} Goal element
     * @private
     */
    _createGoalElement(goal, isDaily = false) {
        const progress = this.getProgress(goal);

        const goalEl = document.createElement('div');
        goalEl.className = `goal ${goal.completed ? 'completed' : ''} ${isDaily ? 'daily' : ''}`;

        goalEl.innerHTML = `
            <div class="goal-header">
                <span class="goal-label">
                    ${isDaily ? '📅 Daily' : '🎯'} ${goal.target} ${goal.type}
                </span>
                <span class="goal-value">${goal.current} / ${goal.target}</span>
            </div>
            <div class="goal-progress">
                <div class="goal-progress-bar" style="width: ${progress}%"></div>
            </div>
            <div class="goal-footer">
                <span class="goal-percentage">${progress}%</span>
                ${goal.completed ? '<span class="goal-complete-badge">✓ Complete</span>' : ''}
            </div>
        `;

        return goalEl;
    }

    /**
     * Dispose goals manager
     */
    dispose() {
        if (this.updateInterval) {
            clearInterval(this.updateInterval);
        }
        this._saveGoals();
        this.goals = [];
        this.dailyGoal = null;
        this.initialized = false;
        GoalsManager.instance = null;
    }
}

// Export singleton instance
export const goalsManager = new GoalsManager();

// Export class and constants
export { GoalsManager, GOAL_TYPES };

export default goalsManager;
