variable "cidr_block" {
    description = "CIDR block for the VPC"
    type        = string
    
}

variable "name" {
    description = "Name of the EKS cluster"
    type        = string
}

variable "node_group_name" {
    description = "Name of the EKS node group"
    type        = string
}


variable "ssh_key_name" {
    description = "SSH key name for accessing the EKS nodes"
    type        = string
}

variable "ami_id" {
  description = "The AMI ID to use for the EC2 instance."
  type        = string
}
variable "instance_type" {
  description = "The type of instance to use for the EC2 instance."
  type        = string
  default     = "t2.micro"
}
variable "ssh_key_name" {
  description = "The name of the SSH key pair to use for the EC2 instance."
  type        = string
}

variable "availability_zones" {
  description = "List of availability zones for the EKS cluster"
  type        = list(string)
}

variable "vpc_cidr_block" {
  description = "List of cidr blocks for subnets"
  type        = list(string)
}
