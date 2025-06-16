# Create security group for mongod
resource "aws_security_group" "mongod_sg" {
  name        = "${var.name}-mongod-sg"
  description = "Security group for MongoDB instance"
  vpc_id      = aws_vpc.main.id

  ingress {
    from_port   = 27017
    to_port     = 27017
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
  tags = {
    Name = "${var.name}-mongod-sg"
  }
}