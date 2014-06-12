# Makefile for building a very simple linux build of pipetting-ui

TARGET = app.nw

D_BIN = ./node_modules/.bin/*
DD_BOWER = ./node_modules/bower/*
DD_GULP = ./node_modules/gulp/*
DD_LIVERELOAD = ./node_modules/gulp-livereload/*
DD_GUTIL = ./node_modules/gulp-util/*
DD_HTTPSERVER = ./node_modules/http-server/*
DD_NWB = ./node_modules/node-webkit-builder/*

start: $(TARGET)
	nw $(TARGET)

app.nw: node_modules
	@echo "Building $@"
	@zip -r $@ ./* -x "./build/*" "./cache/*" "./xlsx-files/*" "$(DD_BOWER)" \
										"$(DD_GULP)" "$(DD_LIVERELOAD)" "$(DD_GUTIL)" \
										"$(DD_HTTPSERVER)" "$(DD_NWB)" "$(D_BIN)"

node_modules:
	@echo "Checking if node_modules exist"
	@if [ ! -d node_modules ]; then npm install; fi;
	@echo "node_modules OK!"

clean:
	@echo "Removing $(TARGET)"
	@rm -rf $(TARGET)

clean_all: clean
	rm -rf node_modules
