workflow "Build and Deploy to Coding.me" {
  on = "push"
  resolves = "Hello World"
}

action "Hello World" {
  uses = "docker://node:10"
  runs = ["node", "-v", "&&", "uname", "-a"]
}
