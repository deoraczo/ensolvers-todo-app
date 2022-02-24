#!/bin/bash
cd .
cd ./client

npm install 

npm run build


cd ..

npm install

npm run build

npm run start:prod