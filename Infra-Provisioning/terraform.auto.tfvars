key_name               = "Development"
cluster_name           = "netflix-clone-eks"
node_group_name        = "default-eks-nodes"
cluster_version        = "1.30"
subnet_ids             = ["subnet-0a4d6e86eac10cabf", "subnet-0257c60ad0899a927"]
vpc_security_group_ids = "data.aws_security_group.default.id"
instance_type         = "t3.medium"
