import SignupScreen from '../screens/SignupScreen';
import LoginScreen from '../screens/LoginScreen';
import FinancesScreen from '../screens/FinancesScreen';

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

// Login Screen - test for user logged in successfully
describe(LoginScreen.login, () => {
    test("user should be logged in", () =>  {
        const input = [
            {username: "test1@noemail.com", password: "password"}
        ];
        const output = ['User logged in successfully']
    });
    expect(LoginScreen.login(username, password)).toEqual(output)
});

// Login Screen - test for blank inputs
describe(LoginScreen.login, () => {
    test("user should be logged in", () =>  {
        const input = [
            {username: "", password: ""}
        ];
        const output = ['Enter email and password to signin']
    });
    expect(LoginScreen.login(username, password)).toEqual(output)
});

// Finances Screen - test for blanks
describe(FinancesScreen.enterTransaction, () => {
    test('transaction should not be left blank', () => {
        const input = [
            {date: '', description: '', amount: ''}
        ];
        const output = ['You cannot leave any information blank!']
    });
    expect(FinancesScreen.enterTransaction(date, description, amount)).toEqual(output)
});

// Finances Screen - test for making sure an incorrect date format can't be entered
describe(FinancesScreen.enterTransaction, () => {
    test('transaction should not be left blank', () => {
        const input = [
            {date: '13/1/132', description: 'grocery', amount: '12'}
        ];
        const output = ['Please enter a valid date! (mm/dd/yy)']
    });
    expect(FinancesScreen.enterTransaction(date, description, amount)).toEqual(output)
});

