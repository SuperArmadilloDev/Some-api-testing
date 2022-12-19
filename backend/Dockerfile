FROM python:3
ENV PYTHONUNBUFFERED 1
RUN mkdir /code
WORKDIR /code

RUN pip install --no-cache-dir psycopg2 poetry
RUN poetry config virtualenvs.create false

COPY pyproject.toml .
COPY poetry.lock .

RUN poetry install

COPY . .

COPY entrypoint.sh /entrypoint.sh

RUN chmod +x /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]
CMD ["runserver", "0:8000"]
