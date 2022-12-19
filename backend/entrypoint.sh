#!/bin/bash

create_superuser="from django.contrib.auth import get_user_model; User = get_user_model(); User.objects.create_superuser('admin', '', 'admin')"
create_superuser() {
    echo "Creating superuser"
    echo "$create_superuser" | python manage.py shell
}

wait_for_db() {
    if [ -z "$POSTGRES_HOST" ] || [ -z "$POSTGRES_PORT" ]; then
        echo "No django database host or port, not waiting for db."
    else
        while !</dev/tcp/"$POSTGRES_HOST"/"$POSTGRES_PORT"; do sleep 2;
        done
    fi
}

if [ "$1" == "runserver" ]; then
    wait_for_db

    echo "Running migrations"
    # Apply database migrations
    python manage.py migrate
    # Collect static files
    echo "Running collectstatic"
    python manage.py collectstatic --noinput
    # Load initial data
    echo "Loading initial data"
    python manage.py loaddata data

    create_superuser

    exec python manage.py "$@"
fi

if [ "$1" == "nomigrate" ]; then
    wait_for_db

    echo "Running collectstatic"
    python manage.py collectstatic --noinput

    create_superuser

    exec python manage.py runserver "${@:2}"
fi

if [ "$1" == "migrate" ]; then
    wait_for_db

    echo "Running migrations"
    # Apply database migrations
    python manage.py "$@"
fi

if [ "$1" == "makemigrations" ];then
    wait_for_db
    exec python manage.py "$@"
fi

if [ "$1" == "loaddata" ];then
    wait_for_db
    exec python manage.py "$@"
fi

exec "$@"