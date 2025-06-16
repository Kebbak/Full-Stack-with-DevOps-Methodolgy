# Create aws instance with mongod
resource "aws_instance" "mongod" {
  ami           = var.ami_id
  instance_type = var.instance_type
  subnet_id     = aws_subnet.public_a.id
  vpc_security_group_ids = [aws_security_group.mongod_sg.id]
  key_name      = var.ssh_key_name

  
user_data = file("${path.module}/script.sh")

  tags = {
    Name = "mongod-instance"
  }

  # add user data as a script to install MongoDB

}