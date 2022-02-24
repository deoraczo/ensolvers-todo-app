#!/bin/bash

docker-compose build                    
docker-compose --env-file .env up -d