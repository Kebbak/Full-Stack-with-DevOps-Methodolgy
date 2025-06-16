module "eks" {
  source = "./modules/eks"
  name            = var.eks_name
  node_group_name = var.eks_node_group_name
  vpc_id          = aws_vpc.main.id
  subnet_ids      = [aws_subnet.public_a.id, aws_subnet.public_b.id]
  eks_cluster_role_arn = aws_iam_role.eks_cluster_role.arn
  eks_node_role_arn    = aws_iam_role.eks_node_role.arn
  ssh_key_name = var.ssh_key_name
}