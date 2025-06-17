data "aws_subnet" "subnet1" {
  id = "subnet-0a1d33e3af03fb6ad"
}

# create ec2 instance
resource "aws_instance" "example" {
  ami           = "ami-09e6f87a47903347c"
  instance_type = t2.micro
  subnet_id     = data.aws_subnet.subnet1.id

  tags = {
    Name = "ExampleInstance"
  }
}