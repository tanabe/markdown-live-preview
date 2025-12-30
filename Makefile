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

.PHONY: serve-dist
serve-dist:
	npm run serve-dist

.PHONY: build-serve
build-serve:
	npm run build-and-serve

.PHONY: deploy
deploy:
	firebase deploy
