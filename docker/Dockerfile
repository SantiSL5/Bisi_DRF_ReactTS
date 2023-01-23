FROM python:3.9 as drf
ARG UID
ENV PYTHONUNBUFFERED=1
ENV PATH=$PATH:/home/drf/.local/bin
WORKDIR /opt/app

RUN useradd -G root -u $UID -d /home/drf drf
RUN mkdir -p /home/drf && \
    chown -R drf:drf /home/drf
USER drf

COPY entrypointdrf.sh /entrypointdrf.sh
ENTRYPOINT ["/bin/bash", "/entrypointdrf.sh"]

#########################################################################


FROM node:18.13.0 as react
ARG UID
WORKDIR /var/www

RUN deluser node
RUN useradd -G root -u $UID -d /home/react react
RUN mkdir -p /home/react && \
    chown -R react:react /home/react
USER react


COPY entrypointreact.sh /entrypointreact.sh
ENTRYPOINT ["/bin/bash", "/entrypointreact.sh"]