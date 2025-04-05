.PHONY: setup
setup:
	npm install

.PHONY: clean
clean:
	rm -rf dist

.PHONY: build
build:
	npm run build

.PHONY: preview
preview:
	npm run preview

.PHONY: dev
dev:
	npm run dev

.PHONY: deploy
deploy:
	firebase deploy
