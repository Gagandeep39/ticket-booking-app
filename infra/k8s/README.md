# Steps to Execute

- [Steps to Execute](#steps-to-execute)
  - [Starting the Cluster](#starting-the-cluster)
  - [Deleting the cluster](#deleting-the-cluster)
  - [Notes](#notes)

## Starting the Cluster

1. Create Ingress `kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v0.40.2/deploy/static/provider/cloud/deploy.yaml`
2. Run all deployments `kubectl apply -f .` in current directory
3. [Optional] Expose port for Kubernetes Dashboard `kubectl proxy`
   - UI available at the [link](http://localhost:8001/api/v1/namespaces/kubernetes-dashboard/services/https:kubernetes-dashboard:/proxy/#/overview?namespace=default)

## Deleting the cluster

1. `kubectl delete -f .`
2. `kubectl delete -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v0.40.2/deploy/static/provider/cloud/deploy.yaml`

## Notes

- `dashboard-ui.yml` contains code to launch kubernetes GUI, can be deleted safely if you want
