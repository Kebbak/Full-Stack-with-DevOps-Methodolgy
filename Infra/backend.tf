terraform {
  backend "s3" {
    bucket = "netflix-replica1"
    key    = "netflix-replica1/DEV"
    region = "us-east-1"
    encrypt = true

  }
}