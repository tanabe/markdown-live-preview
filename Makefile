.PHONY: setup install-dependencies
setup: install-dependencies

# Install all project dependencies
# - Uses `npm ci` when package-lock.json exists for reproducible installs
# - Falls back to `npm install` otherwise
install-dependencies:
	@command -v npm >/dev/null 2>&1 || { echo "npm is not installed. Please install Node.js (which includes npm) from https://nodejs.org/"; exit 1; }
	@if [ -f package-lock.json ]; then \
		echo "Installing dependencies with npm ci..."; \
		npm ci; \
	else \
		echo "Installing dependencies with npm install..."; \
		npm install; \
	fi
.PHONY: clean
clean:
	rm -rf dist

.PHONY: build
build: install-dependencies
	npm run build

.PHONY: preview
preview: install-dependencies
	npm run preview

.PHONY: dev
dev: install-dependencies
	npm run dev

.PHONY: deploy
deploy:
	firebase deploy
