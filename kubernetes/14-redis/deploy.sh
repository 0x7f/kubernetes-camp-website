#!/bin/bash -eu

#helm install redis stable/redis-ha

#helm repo add bitnami https://charts.bitnami.com/bitnami
#helm install redis bitnami/redis

helm upgrade \
  --install \
  --set usePassword=false \
  redis \
  bitnami/redis
