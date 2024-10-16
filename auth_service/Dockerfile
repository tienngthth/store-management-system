FROM --platform=linux/amd64 ubuntu:22.04

# Installing dependencies for running a python application
RUN apt-get update && \
        apt-get install -y python3 python3-pip postgresql-client libpq-dev && \
        apt-get clean && \
        rm -rf /var/lib/apt/lists/*

# Install poetry
RUN pip3 install poetry 

# Setting the working directory
WORKDIR /user_service

# Install poetry dependencies
COPY pyproject.toml ./
RUN poetry install --no-root

# Copying our application into the container
COPY src src
COPY bin bin

ENV DATABASE_URL=postgresql://administrator:verySecretPassword@host.docker.internal:5432/db
ENV AWS_DEFAULT_REGION=us-east-1

# Running our application
ENTRYPOINT ["/user_service/bin/docker-entrypoint"]
CMD ["serve"]
