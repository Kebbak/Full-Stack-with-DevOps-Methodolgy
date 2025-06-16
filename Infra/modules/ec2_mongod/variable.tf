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