
helm upgrade \
    --install \
    --namespace ingress \
    --set rbac.create=true \
    --set podSecurityPolicy.enabled=true \
    ingress \
    ingress-nginx/ingress-nginx
