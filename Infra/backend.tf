terraform {
  backend "s3" {
    bucket = "netflix-replica"
    key    = "netflix-replica/DEV"
    region = local.region
    encrypt = true

  }
}