#!/bin/bash -eu

helm dependencies update

helm upgrade \
    --install \
    --namespace maximilian-haupt \
    --wait \
    --timeout 10m \
    k8scamp \
    .
