workflow "New workflow Test" {
  on = "push"
  resolves = ["Hello World"]
}

action "Hello World" {
  uses = "node:10"
  runs = "node -v && echo hello world"
}