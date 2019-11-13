import { total } from "./App";

// JEST MOCKS

const add = jest.fn((a, b) => a + b);


// UNIT TESTS
/////////////

test('Fake Test', () => {
    expect(true).toBeTruthy(); 
});

test('false test', () => {
    expect(false).toBeFalsy();
});

test('add(1, 2) to return 3', () => {
    const value = add(1, 2);
    
    expect(value).toEqual(3);
    expect(add(1, 1)).toEqual(2);
    expect(add).toHaveBeenCalledTimes(2);
    expect(add).toHaveBeenCalledWith(1, 1);
});

/*

Below is a simple example of an integration test.

It's an integration because it is testing the integration of two different
functions.

*/

test('total', () => {
    expect(total(5, 10)).toEqual('$15');
});
