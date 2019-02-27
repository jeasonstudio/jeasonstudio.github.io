workflow "Build and Deploy to Coding.me" {
  on = "push"
  resolves = "Hello World"
}

action "Hello World" {
  uses = "node:10"
  runs = ["sh", "-c", "echo $GITHUB_SHA"] 
}