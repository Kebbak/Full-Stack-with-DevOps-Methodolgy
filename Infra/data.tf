data "aws_vpc" "default" {
  default = true
}

data "aws_subnet" "subnet1" {
  id = "subnet-0a1d33e3af03fb6ad"
}

data "aws_subnet" "subnet2" {
  id = "subnet-0302a71e86b160c7f"
}

data "aws_security_group" "default" {
  vpc_id = data.aws_vpc.default.id
  filter {
    name   = "group-name"
    values = ["default"]
  }
}

data "aws_eks_cluster_auth" "cluster" {
  name = module.eks_cluster.cluster_name
}