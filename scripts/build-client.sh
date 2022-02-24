#!/bin/bash

cd ./client

rm -f package-lock.json && npm install

npm run build