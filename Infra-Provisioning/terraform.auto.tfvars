key_name               = "Development"
cluster_name           = "netflix-clone-eks"
node_group_name        = "default-eks-nodes"
cluster_version        = "1.30"
subnet_ids             = ["subnet-0a05d9bf8cf0d3a4e", "subnet-0bad6ed9a95b0d8a0"]
vpc_security_group_ids = "data.aws_security_group.default.id"
instance_type         = "t3.medium"