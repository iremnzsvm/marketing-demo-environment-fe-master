#!/bin/sh

if [ -z "${K8S_NAMESPACE}" ]; then
  export K8S_NAMESPACE=dev
fi

if [ -z "${K8S_FILE_PATH}" ]; then
  export K8S_FILE_PATH=static
fi

kubectl create namespace "${K8S_NAMESPACE}"
kubectl apply -f "${K8S_FILE_PATH}" --recursive -n "${K8S_NAMESPACE}"