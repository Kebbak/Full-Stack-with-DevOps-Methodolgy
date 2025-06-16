output "eks_cluster_name" { value = module.eks.cluster_name }
output "argocd_server_url" {
  value = helm_release.argocd.status[0].load_balancer_ingress[0].hostname
}