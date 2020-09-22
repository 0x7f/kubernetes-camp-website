#!/bin/bash -eu

helm dependencies update

helm upgrade \
  --namespace maximilian-haupt \
  --install \
  --wait \
  k8scamp \
  .
