DIST_DIR = ./dist
BIN_DIR = ./node_modules/.bin
BIN_FILE = $(DIST_DIR)/megastores-client.js

build: $(DIST_DIR) node_modules
	$(BIN_DIR)/browserify src/client/index.js -o $(BIN_FILE) -t [ babelify ]

clean:
	rm -rf ./node_modules $(DIST_DIR)

test: node_modules
	$(BIN_DIR)/mocha ./test

doc: node_modules
	$(BIN_DIR)/jsdoc2md --param-list-format list src/**/*.js > docs/documentations.md

changelog: node_modules
	$(BIN_DIR)/conventional-changelog -p angular -i CHANGELOG.md -s

.PHONY: build clean doc

node_modules: package.json
	npm install --ignore-scripts

$(DIST_DIR):
	mkdir -p $@

$(BIN_FILE): $(DIST_DIR) node_modules
	$(BIN_DIR)/browserify src/client/index.js -o $(BIN_FILE) -t [ babelify ]
