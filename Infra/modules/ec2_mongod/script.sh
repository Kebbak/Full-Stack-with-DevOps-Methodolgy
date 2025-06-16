# User data script for EC2 instance to install MongoDB and configure it
#!/bin/bash

sudo yum update -y
# Install MongoDB
sudo tee /etc/yum.repos.d/mongodb-org-4.4.repo <<EOF
[mongodb-org-4.4]
name=MongoDB Repository
baseurl=https://repo.mongodb.org/yum/redhat/7/mongodb-org/4.4/x86_64/
gpgcheck=1
enabled=1
gpgkey=https://www.mongodb.org/static/pgp/server-4.4.asc
EOF
sudo yum install -y mongodb-org
# Start MongoDB service
sudo systemctl start mongod
# Enable MongoDB to start on boot
sudo systemctl enable mongod
# Configure MongoDB to listen on all interfaces
sudo sed -i 's/^#bindIp: