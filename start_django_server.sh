#!/bin/bash
cd $(dirname $0)/../combina
source ../venv/bin/activate
exec gunicorn combina.wsgi:application --bind 127.0.0.1:8000