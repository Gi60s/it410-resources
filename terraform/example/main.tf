module "lambda-api" {
  source = "../lambda-api"

  app-name = "hello-world"
  environment = "test"
  lambda-source = "./src"
  project-id = "my-project-id"
  region = "us-west-1"
  zip-destination = "./"
}

output "base_url" {
  value = module.lambda-api.api-base-url
}