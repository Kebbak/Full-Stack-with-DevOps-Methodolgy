module "argocd" {
  source = "./modules/argocd"

  eks_cluster_endpoint = module.eks_cluster.cluster_endpoint
  eks_cluster_ca       = module.eks_cluster.cluster_certificate_authority_data
  eks_token            = data.aws_eks_cluster_auth.cluster.token
}