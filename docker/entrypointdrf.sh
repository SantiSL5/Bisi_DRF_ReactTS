#!/bin/bash
python -m pip install --upgrade pip
pip3 install -r requirements.txt
exec "$@";