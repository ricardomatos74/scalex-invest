terraform {
  required_version = ">= 1.6.0"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = var.aws_region
}

variable "aws_region" {
  description = "AWS region"
  default     = "us-east-1"
}

# Bucket S3 para hospedar assets estáticos do frontend (exemplo)
resource "random_id" "suffix" {
  byte_length = 4
}

resource "aws_s3_bucket" "frontend_bucket" {
  bucket = "scalex-invest-frontend-${random_id.suffix.hex}"
  acl    = "public-read"

  website {
    index_document = "index.html"
    error_document = "404.html"
  }
}

output "frontend_bucket_url" {
  value = aws_s3_bucket.frontend_bucket.website_endpoint
}
