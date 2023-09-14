#/bin/sh
rm -rf ./backend/client/build/*
cd ./frontend
npx vite build
cp -r ./dist/* ../backend/client/build
