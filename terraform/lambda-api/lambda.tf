provider "aws" {
  region = var.region
  version = "~> 2.44"
}

provider "archive" {
  version = "~> 1.3"
}

# Convert source directory to a zip file and upload to S3 bucket
data "archive_file" "lambda_zip" {
  type        = "zip"
  source_dir  = var.lambda-source
  output_path = "${var.zip-destination}/${var.app-name}.zip"
}

resource "aws_s3_bucket" "bucket" {
  bucket = "${var.app-name}-lambda-api-${var.environment}"
  acl    = "private"

  tags = {
    Name        = var.app-name
    Environment = var.environment
  }
}

resource "aws_s3_bucket_object" "lambda" {
  bucket  = aws_s3_bucket.bucket.bucket
  key     = "lambda-source-zip"
  source  = data.archive_file.lambda_zip.output_path
  etag    = filemd5(data.archive_file.lambda_zip.output_path)

  depends_on  = [data.archive_file.lambda_zip]
}



# Define up API Gateway Resource
resource "aws_api_gateway_rest_api" "api" {
  name = "${var.app-name}-api"
}

resource "aws_lambda_function" "lambda" {
  function_name = "${var.app-name}-lambda"
  s3_bucket = aws_s3_bucket_object.lambda.bucket
  s3_key    = aws_s3_bucket_object.lambda.key
  handler = var.lambda-handler-name
  runtime = "nodejs10.x"
  role = aws_iam_role.lambda_exec.arn
  source_code_hash = filebase64sha256(data.archive_file.lambda_zip.output_path)
}

# Temporary IAM role that allows the lambda to be set up
resource "aws_iam_role" "lambda_exec" {
  name = "${var.app-name}-iam"

  assume_role_policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "sts:AssumeRole",
      "Principal": {
        "Service": "lambda.amazonaws.com"
      },
      "Effect": "Allow",
      "Sid": ""
    }
  ]
}
EOF

}

# Enable cloudwatch logging for the lambda
resource "aws_cloudwatch_log_group" "logs" {
  name              = "/aws/lambda/${aws_lambda_function.lambda.function_name}"
  retention_in_days = 14
}

resource "aws_iam_policy" "lambda_logging" {
  name = "${var.app-name}-lambda-logging"
  description = "IAM policy for logging from a lambda"
  policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": [
        "logs:CreateLogGroup",
        "logs:CreateLogStream",
        "logs:PutLogEvents"
      ],
      "Resource": "arn:aws:logs:*:*:*",
      "Effect": "Allow"
    }
  ]
}
EOF
}

resource "aws_iam_role_policy_attachment" "lambda_logs" {
  role = aws_iam_role.lambda_exec.name
  policy_arn = aws_iam_policy.lambda_logging.arn
}

# Handle requests to non-root path. Handles /*
resource "aws_api_gateway_resource" "proxy" {
  rest_api_id = aws_api_gateway_rest_api.api.id
  parent_id   = aws_api_gateway_rest_api.api.root_resource_id
  path_part   = "{proxy+}"
}

resource "aws_api_gateway_method" "proxy" {
  rest_api_id   = aws_api_gateway_rest_api.api.id
  resource_id   = aws_api_gateway_resource.proxy.id
  http_method   = "ANY"
  authorization = "NONE"
}

resource "aws_api_gateway_integration" "lambda" {
  rest_api_id = aws_api_gateway_rest_api.api.id
  resource_id = aws_api_gateway_method.proxy.resource_id
  http_method = aws_api_gateway_method.proxy.http_method

  integration_http_method = "POST"
  type                    = "AWS_PROXY"
  uri                     = aws_lambda_function.lambda.invoke_arn
}

# Handle request to root path: /
resource "aws_api_gateway_method" "proxy_root" {
  rest_api_id   = aws_api_gateway_rest_api.api.id
  resource_id   = aws_api_gateway_rest_api.api.root_resource_id
  http_method   = "ANY"
  authorization = "NONE"
}

resource "aws_api_gateway_integration" "lambda_root" {
  rest_api_id = aws_api_gateway_rest_api.api.id
  resource_id = aws_api_gateway_method.proxy_root.resource_id
  http_method = aws_api_gateway_method.proxy_root.http_method

  integration_http_method = "POST"
  type                    = "AWS_PROXY"
  uri                     = aws_lambda_function.lambda.invoke_arn
}

# Expose API publicly
resource "aws_api_gateway_deployment" "example" {
  depends_on = [
    aws_api_gateway_integration.lambda,
    aws_api_gateway_integration.lambda_root,
  ]

  rest_api_id = aws_api_gateway_rest_api.api.id
  stage_name  = "test"
}

# Give API gateway access to run this lambda
resource "aws_lambda_permission" "apigw" {
  statement_id  = "AllowAPIGatewayInvoke"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.lambda.function_name
  principal     = "apigateway.amazonaws.com"

  # The "/*/*" portion grants access from any method on any resource
  # within the API Gateway REST API.
  source_arn = "${aws_api_gateway_rest_api.api.execution_arn}/*/*"
}

# To use custom domain name the following resources must be configured
# resource "aws_api_gateway_domain_name"
# resource "aws_api_gateway_base_path_mapping"
# resource "aws_route53_record"
