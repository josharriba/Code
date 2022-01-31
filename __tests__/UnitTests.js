import SignupScreen from '../screens/SignupScreen';
describe(SignupScreen.registerNewUser, () => {
    test("age should be 22", () => {
        const input = [
            { id: 1, age: "17" },
            { id: 2, age: "22" },
        ];
        const output = [{id: 2, age: "22"}]
    });
    expect(SignupScreen.registerNewUser(input, "22")).toEqual(output);
});