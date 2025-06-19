output "cluster_endpoint" {
  value = aws_eks_cluster.aws_eks_cluster.endpoint
}

output "cluster_certificate_authority_data" {
  value = aws_eks_cluster.aws_eks_cluster.certificate_authority[0].data
}

output "cluster_name" {
  value = aws_eks_cluster.aws_eks_cluster.name
}