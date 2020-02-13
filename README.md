# 192-RUPE

This repository contains the React Frontend and Flask Backend code

## React Frontend

To run the application, open the terminal in the 192-React directory

Install all of the dependencies with npm

```
npm install
```

Use npm to start the application

```
npm start
```

## Flask Backend

To run the server, open the terminal in the 192-Flask-API directory

Create a virtual environment with virtualenv

```
virtualenv env
source env/bin/activate
```

Install all of the dependencies with pip

```
pip install -r requirements.txt
```

Use the python command to start a python interactive shell 

```
python
```

Use the following commands to setup the database

```
from api import db
db.create_all()
```

Exit the python shell and run the api.py file to start the server

```
python api.py
```
