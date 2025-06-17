module "eks_cluster" {
  source                 = "./modules/eks"
  cluster_name           = var.cluster_name
  node_group_name        = var.node_group_name
  cluster_version        = var.cluster_version
  instance_type          = var.instance_type
  subnet_ids             = var.subnet_ids
  vpc_security_group_ids = var.vpc_security_group_ids

}