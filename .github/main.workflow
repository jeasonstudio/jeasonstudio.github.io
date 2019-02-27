workflow "Build and Deploy to Coding.me" {
  on = "push"
  resolves = "Hello World"
}

action "Hello World" {
  uses = "actions/docker/cli@8cdf801b322af5f369e00d85e9cf3a7122f49108"
  runs = ["sh", "-c", "echo $GITHUB_SHA"]
}
