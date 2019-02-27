FROM debian:stretch

# Configuration variables
ENV HUGO_VERSION 0.54.0
ENV HUGO_BINARY hugo_extended_${HUGO_VERSION}_Linux-64bit.deb

# Install Git
RUN apt-get install git

# Download and install hugo
# Personally download Hugo because we didnot have an official docker image
RUN curl -sL -o /tmp/hugo.deb \
    https://github.com/gohugoio/hugo/releases/download/v${HUGO_VERSION}/${HUGO_BINARY} && \
    dpkg -i /tmp/hugo.deb && \
    rm /tmp/hugo.deb

LABEL "com.github.actions.name"="Hello World"
LABEL "com.github.actions.description"="Write arguments to the standard output"
LABEL "com.github.actions.icon"="mic"
LABEL "com.github.actions.color"="purple"

LABEL "repository"="https://github.com/jeasonstudio/jeasonstudio.github.io"
LABEL "homepage"="https://jeasonstudio.coding.me"
LABEL "maintainer"="Jeason <me@jeasonstudio.cn>"

ADD entrypoint.sh /entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]


CMD pwd