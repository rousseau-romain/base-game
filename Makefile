install_npm:
	npm install

init: install_npm

reset:
	@ meteor reset

start:
	@ meteor

mongo:
	@ meteor mongo
