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