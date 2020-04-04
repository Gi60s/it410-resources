To make this work you'll need to set up your own AWS account then install the CLI and login to AWS via the CLI. You will also need to make sure you have access to provision resources via the CLI.

Once that is all done, go into the `example` directory and run `terraform apply`.

This will deploy a simple server with a single REST endpoint, allowing a `GET` at `/hello`. After running the `terraform apply` you will see the prefix for that endpoint and you'll just need to add `/hello` to the end to see the server in action.