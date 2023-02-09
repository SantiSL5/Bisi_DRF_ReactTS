#!/bin/bash
python -m pip install --upgrade pip
pip3 install -r requirements.txt
python3 manage.py makemigrations users
python3 manage.py makemigrations bikes
python3 manage.py makemigrations stations
python3 manage.py makemigrations slots
python3 manage.py migrate
exec "$@";