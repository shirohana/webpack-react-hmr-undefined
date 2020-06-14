MAKEFLAGS = --jobs=1

.PHONY: clean clean-all clean-cache serve start watch

start:
	@node server/index.js

watch:
	NODE_ENV=development make start

serve:
	NODE_ENV=production make start

clean-cache:
	@rm -rf .eslintcache

clean: clean-cache
	@rm -rf dist

clean-all:
	@rm -rf \
		coverage \
		dist \
		node_modules
