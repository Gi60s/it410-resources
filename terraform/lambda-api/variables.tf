variable "app-name" {
  type        = string
  description = "A unique name that will prefix resources"
}

variable "environment" {
  type        = string
  description = "The app environment. This will be used to define the API Gateway stage and will be used for tagging."
}

variable "lambda-handler-name" {
  type        = string
  default     = "index.handler"
  description = "The file name, followed by a dot, followed by the main function name."
}

variable "lambda-source" {
  type        = string
  description = "The source directory containing the lambda code."
}

variable "project-id" {
  type        = string
  description = "The project identifier"
}

variable "region" {
  type        = string
  description = "The AWS region to deploy to."
}

variable "zip-destination" {
  type        = string
  description = "The destination directory to output zipped lambda directories to."
}

