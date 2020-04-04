
# Output the API Gateway url to the console
output "api-base-url" {
  value = aws_api_gateway_deployment.example.invoke_url
}