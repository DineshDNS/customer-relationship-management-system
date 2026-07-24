#!/bin/sh

echo "Waiting for PostgreSQL..."

while ! nc -z postgres 5432
do
    sleep 1
done

echo "Database Started."

python manage.py migrate

python manage.py collectstatic --noinput

gunicorn crm.wsgi:application \
--bind 0.0.0.0:8000 \
--workers 3