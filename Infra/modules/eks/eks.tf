# Create terraform eks cluster
resource "aws_eks_cluster" "aws_eks_cluster" {
  name               = var.cluster_name
  version            = var.cluster_version
  role_arn           = aws_iam_role.eks-role.arn

  vpc_config {
    subnet_ids = var.subnet_ids
  }

  depends_on = [
    aws_iam_role_policy_attachment.eks_cluster_policy,
    aws_iam_role_policy_attachment.eks_vpc_resource_controller,
  ]

  tags = {
    Name = "${local.Environment}-eks-cluster"
  }
}

# Add addons vpc cni
resource "aws_eks_addon" "eks-add" {
  cluster_name = aws_eks_cluster.aws_eks_cluster.name
  addon_name   = "vpc-cni"

  depends_on = [
    aws_eks_cluster.aws_eks_cluster
  ]
}

# Add addons core dns
resource "aws_eks_addon" "eks-add-coredns" {
  cluster_name = aws_eks_cluster.aws_eks_cluster.name
  addon_name   = "coredns"

  depends_on = [
    aws_eks_cluster.aws_eks_cluster
  ]
}

# Add addons kube proxy
resource "aws_eks_addon" "eks-add-kube-proxy" {
  cluster_name = aws_eks_cluster.aws_eks_cluster.name
  addon_name   = "kube-proxy"

  depends_on = [
    aws_eks_cluster.aws_eks_cluster
  ]
}

# Addon csi driver
resource "aws_eks_addon" "eks-add-csi-driver" {
  cluster_name = aws_eks_cluster.aws_eks_cluster.name
  addon_name   = "aws-ebs-csi-driver" 
  addon_version = "v1.21.0-eksbuild.1"
  resolve_conflicts = "OVERWRITE"
  depends_on = [
    aws_eks_cluster.aws_eks_cluster
  ]
}

# EKS nodes
resource "aws_eks_node_group" "my_eks_node" {
  cluster_name            = aws_eks_cluster.aws_eks_cluster.name
  node_group_name = var.node_group_name
  node_role_arn   = aws_iam_role.eks_node_role.arn
  subnet_ids      = var.subnet_ids

  scaling_config {
    desired_size = 2
    max_size     = 2
    min_size     = 1
  }

  instance_types = [var.instance_type]

  depends_on = [
    aws_eks_cluster.aws_eks_cluster,
  ]

  tags = {
    Name = "eks-node"
  }
}