const stack = require('../src/stack');

// Testar om funktionen returnerar undefined om stacken är tom
test('peek on empty stack returns undefined', () => {
    expect(stack.peek()).toBeUndefined();
});

// Testar om en stack med minst ett element returnerar annat än undefined
test('peek on stack with one element returns that element', () => {
    stack.push(1);
    expect(stack.peek()).toBeDefined();
    expect(stack.peek()).toBe(1);
});

// Testar om en stack med minst två element returnerar det översta elementet i stacken
test('peek on stack with two or more elements returns the top element', () => {
    stack.push(1);
    stack.push("wow");
    stack.push(42);
    expect(stack.peek()).toBeDefined();
    expect(stack.peek()).toBe(42);
});