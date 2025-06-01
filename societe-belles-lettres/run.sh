#!/bin/bash

# Script pour lancer l'application Flask
cd /home/ubuntu/societe-belles-lettres-flask
export FLASK_APP=src/main.py
export FLASK_ENV=development
python3 -m flask run --host=0.0.0.0
