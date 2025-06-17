variable "node_group_name" {
  type    = string
  default = "default-eks-nodes name"
}

variable "cluster_version" {
  description = "eks require version"
  type        = string
}

variable "subnet_ids" {
  description = "Subnet ID for the instance"
  type        = list(string)
}

variable "vpc_security_group_ids" {
  description = "VPC Security Group ID for the instance"
  type        = string
}

variable "cluster_name" {
  type        = string
  description = "description"
}


variable "instance_type" {
  description = "The instance type for the EKS nodes"
  type        = string
}