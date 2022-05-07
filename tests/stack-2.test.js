const stack = require("../src/stack");

// Testar ifall det är rätt element i stacken som raderas vid pop
test("pop on stack deletes the last element in stack", () => {
    stack.push(1);
    stack.push(2);
    stack.pop()
    expect(stack.peek()).toBe(1);
})