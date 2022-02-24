#!/bin/bash

cd ./client

npm install --only=dev
npm install --only=production

npm run build