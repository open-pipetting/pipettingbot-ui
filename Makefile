TARGET = app.nw

app.nw: node_modules
	@echo "Building $@"
	@zip -r $@ ./*

node_modules:
	@echo "Checking if node_modules exist"
	@if [ ! -d node_modules ]; then npm install; fi;
	@echo "node_modules OK!"

clean:
	@echo "Removing $(TARGET)"
	@rm -rf $(TARGET)

clean_all: clean
	rm -rf node_modules
