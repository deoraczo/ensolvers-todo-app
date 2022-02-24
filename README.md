<h1 align="center">TODO APP</h1>

<div align="center">
  <h3>
    <a href="https://nameless-lowlands-50873.herokuapp.com/folders">
      Demo
    </a>
  </h3>
</div>

## Overwiew
<img src="images/image_1.png?raw=true" alt="Screenshot">
<img src="images/image_2.png?raw=true" alt="Screenshot">

## Requirements
- Node 14.17.5
- npm 6.14.14
- NestJs 8.1.1
- VueJs 2.6.11
- Mysql Server 8.0
- docker
- docker-compose
  
## Installation and Usage (Linux Ubuntu - Development)
Create Mysql Database in local
```bash
mysql -u root -p
```
and
```bash
CREATE DATABASE <name_db>; # remember the name we will use it later
```

Create Mysql Database using docker:
_Note_: change MYSQL_DATABASE, MYSQL_PASSWORD, MYSQL_USER and MYSQL_ROOT_PASSWORD.

```bash
docker run --name tododb -e MYSQL_ROOT_PASSWORD=password -e MYSQL_DATABASE=tasking_db -e MYSQL_USER=root -e MYSQL_PASSWORD=password --restart always -p 3306:3306 -d mysql/mysql-server:8.0
```

Clone this repo

```bash
git clone https://github.com/deoraczo/ensolvers-todo-app.git
# Enter your ensolvers-todo-app folder
cd ensolvers-todo-app
```
create .env file:
```bash
cp .env.example .env
nano .env
```

Fill `.env` file with environment variables:

```bash
PORT=

DB_HOST=   #DB host IP, usually localhost
DB_PORT=
DB_NAME=   #created database name
DB_USER=
DB_PASSWORD=
```

Install backend dependencies:
```bash
npm install
```
Start backend in development mode:
```bash
npm run start:dev
```
Open a second terminal, go to client folder:
create .env file:
```bash
cd client
```
Install client dependencies:
```bash
npm install
```
Start client in development mode:
```bash
npm run serve
```

Go to http://your_server_ip:8080/tasks

## Installation and Usage (Linux Ubuntu - Production)
Clone this repo

```bash
git clone https://github.com/deoraczo/ensolvers-todo-app.git
# Enter your ensolvers-todo-app folder
cd ensolvers-todo-app
```
create .env file:
```bash
cp .env.example .env
nano .env
```

Fill `.env` file with environment variables:

```bash
PORT=

DB_HOST=   #DB host IP, usually localhost
DB_PORT=
DB_NAME=   #created database name
DB_USER=
DB_PASSWORD=
```
### Deploy docker
**_Note_**: .env file configured by which uses the variables to configure the containers is required
```bash
sh scripts/docker.prod.sh
```
Go to http://your_server_ip:3000/tasks

### Deploy local
**_Note_**: An already created database is required
```bash
sh scripts/up-app.prod.sh
```
Go to http://your_server_ip:3000/tasks