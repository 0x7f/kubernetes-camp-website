#!/bin/bash -eu

helm dependencies update

helm upgrade \
  --install \
  --wait \
  k8scamp \
  .
