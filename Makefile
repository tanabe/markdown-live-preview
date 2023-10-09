.PHONY: setup
setup:
	git submodule init
	git submodule update

.PHONY: build
build:
	rm -rf public/js/ace
	cp -r libs/ace-builds/src-min-noconflict public/js/ace
	cp libs/github-markdown-css/github-markdown.css public/css/
	cp libs/Storehouse-js/src/storehouse.js public/js/
	cd libs/marked; \
	npm i; \
	npm run build; \
	cp marked.min.js ../../public/js/; \
	cd ../../
	cp libs/DOMPurify/dist/purify.min.js public/js/

.PHONY: run
run:
	scripts/run-local-server.sh
