terraform {
  backend "s3" {
    bucket         = "bablu-prod-terraform-state"
    key            = "prod-app/terraform.tfstate"
    region         = "ap-south-1"
    dynamodb_table = "terraform-lock-table"
    encrypt        = true
  }
}
