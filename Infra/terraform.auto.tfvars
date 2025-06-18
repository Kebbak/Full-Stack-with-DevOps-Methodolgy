key_name               = "Development"
cluster_name           = "netflix-clone-eks"
node_group_name        = "default-eks-nodes"
cluster_version        = "1.30"
subnet_ids             = ["subnet-0a4e38de2675128c3", "subnet-04bf4bd6a83c58dab"]
vpc_security_group_ids = "data.aws_security_group.default.id"
instance_type         = "t3.medium"