#!/bin/bash -eu

helm dependency update

helm upgrade \
    --install \
    --create-namespace \
    --namespace monitoring \
    --wait \
    --timeout 10m \
    monitoring \
    .
