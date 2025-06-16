module "eks" {
  source = "./modules/eks"
  version = "19.0.0"
  cluster_name            = var.cluster_name
  node_group_name = var.eks_node_group_name
  vpc_id          = aws_vpc.main.id
  subnet_ids      = [var.subnet_id_a, var.subnet_id_b]
  eks_cluster_role_arn = aws_iam_role.eks_cluster_role.arn
  eks_node_role_arn    = aws_iam_role.eks_node_role.arn
  ssh_key_name = var.ssh_key_name
}