import SignupScreen from '../screens/SignupScreen';
import LoginScreen from '../screens/LoginScreen';

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

describe(LoginScreen.login, () => {
    test("user should be logged in", () =>  {
        const input = [
            {username: "test1@noemail.com", password: "password"}
        ];
        const output = ['User logged in successfully']
    });
    expect(LoginScreen.login(username, password)).toEqual(output)
});