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

variable "subnet_id_a" {
  description = "Subnet ID for the first subnet"
  type        = string
}
variable "subnet_id_b" {
  description = "Subnet ID for the second subnet"
  type        = string
}