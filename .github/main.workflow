workflow "Build and Deploy to Coding.me" {
  on = "push"
  resolves = "Hello World"
}

action "Hello World" {
  uses = "./action-deploy"
  env = {
    MY_NAME = "Jeason"
  }
  args = "\"Hello world, I'm $MY_NAME!\""
}
