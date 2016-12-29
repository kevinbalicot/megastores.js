DIST_DIR = ./dist
BIN_DIR = ./node_modules/.bin
BIN_FILE = $(DIST_DIR)/megastores-client.js
DEMO_DIR = ./demo

build: $(BIN_FILE)

clean:
	rm -rf ./node_modules $(DIST_DIR)

demo: build server
	cp $(BIN_FILE) $(DEMO_DIR) && $(BIN_DIR)/http-server $(DEMO_DIR)

server:
	node $(DEMO_DIR)/server.js &

test: node_modules
	$(BIN_DIR)/mocha ./test

.PHONY: build clean server demo

node_modules: package.json
	npm install --ignore-scripts

$(DIST_DIR):
	mkdir -p $@

$(BIN_FILE): $(DIST_DIR) node_modules
	$(BIN_DIR)/browserify src/client/index.js -o $(BIN_FILE) -t [ babelify ]
