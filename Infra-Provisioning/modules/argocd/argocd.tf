
provider "helm" {
  alias = "eks"

  kubernetes {
    host                   = var.eks_cluster_endpoint
    cluster_ca_certificate = base64decode(var.eks_cluster_ca)
    token                  = var.eks_token
  }
}


resource "helm_release" "argocd" {
  provider   = helm.eks
  name       = "argocd"
  repository = "https://argoproj.github.io/argo-helm"
  chart      = "argo-cd"
  version    = "5.51.6"
  namespace        = "argocd"
  create_namespace = true

  set {
    name = "server.insecure"
    value = "true"
  }
 
}