resource "aws_eks_cluster" "main" {
  name     = var.name
  role_arn = aws_iam_role.eks_cluster_role.arn

  vpc_config {
    subnet_ids = [
      aws_subnet.public_a.id,
      aws_subnet.public_b.id
    ]
    endpoint_public_access = true
  }

  depends_on = [
    aws_iam_role_policy_attachment.eks_cluster_AmazonEKSClusterPolicy
  ]
}

resource "aws_eks_node_group" "ng" {
  cluster_name    = aws_eks_cluster.main.var.name
  node_group_name = var.node_group_name
  subnet_ids      = [
    aws_subnet.public_a.id,
    aws_subnet.public_b.id
  ]
  node_role_arn   = aws_iam_role.eks_node_role.arn
  scaling_config {
    desired_size = 2
    max_size     = 3
    min_size     = 1
  }
  remote_access {
    ssh_key_name = var.ssh_key_name
    source_security_group_ids = [aws_security_group.eks_nodes.id]
  }
  #security_groups = [aws_security_group.eks_nodes.id] # Uncomment if needed

  depends_on = [
    aws_iam_role_policy_attachment.eks_node_AmazonEKSWorkerNodePolicy,
    aws_iam_role_policy_attachment.eks_node_AmazonEKS_CNI_Policy,
    aws_iam_role_policy_attachment.eks_node_AmazonEC2ContainerRegistryReadOnly
  ]
}
