import { IAuthentication, IAuthorization, IRegestration } from '../types/interfaces';
import { user } from '../types/type';

class Regestration implements IRegestration {
    public addUser(newUser: user): void {
        return addUser(newUser);
    }
}

class Authentication implements IAuthentication {
    private email;
    private hashPassword;
    constructor(email: string, password: string) {
        this.email = email;
        this.hashPassword = this.hash(password);
    }
    public signIn() {
        return signIn(this.email, this.hashPassword);
    }
    private hash(string: string): string {
        let result = 0;
        for (let i = 0; i < string.length; i++) {
            result += string.charCodeAt(i) + 7;
        }
        return result.toString();
    }
}

class Authorization implements IAuthorization {
    private email: string;
    constructor(email: string) {
        this.email = email;
    }
    signOut(): void {
        return signOut(this.email);
    }
    updateUser(updateFields: user) {
        return updateUser(updateFields, this.email);
    }
    deleteUser(): void {
        return deleteUser(this.email);
    }
}

export { Authorization, Authentication, Regestration };

/// API Authorization and Authentication functions
/// DELETE EXPORT
/// EXPORT FOR DEVELOP

export function listUsers(adminPass: string): void {
    const myHeaders = new Headers();
    myHeaders.append('x-admin-pass', `${adminPass}`);

    const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        credentials: 'include',
    } as RequestInit;
    fetch('https://rs-clone-api.vercel.app/listUsers', requestOptions)
        .then((response) => response.text())
        // .then((result) => console.log(result))
        .catch((error) => console.log('error', error));
}

async function signIn(email: string, password = '') {
    const myHeaders = new Headers();
    if (password != '') {
        myHeaders.append('x-hash-pass', `${password}`);
        // console.log(`Get user using password`);
    }

    const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        credentials: 'include',
    } as RequestInit;

    fetch(`https://rs-clone-api.vercel.app/signIn/${email}`, requestOptions)
        .then((response) => {
            if (response.status === 404 || response.status === 500) {
                throw new Error('Invalid password or email');
            } else {
                return response.text();
            }
        })
        .then((result) => {
            // console.log(result);
            return result;
        })
        .then((result) => {
            localStorage.setItem('currentUser', result);
            localStorage.setItem('userEmail', (JSON.parse(result) as user).email);
            return result;
        })
        .then((result) => {
            alert(`Hooray!!! ${(JSON.parse(result) as user).userName}, you are logged in`);
            window.location.reload();
        })
        .catch((error) => alert(`${error}`));
}

function signOut(email: string): void {
    const requestOptions = {
        method: 'GET',
        credentials: 'include',
    } as RequestInit;

    fetch(`https://rs-clone-api.vercel.app/signOut/${email}`, requestOptions)
        .then((response) => {
            if (response.status === 500 || response.status === 404) {
                throw new Error('Incorrect password or email');
            } else {
                return response.text();
            }
        })
        .then((res) => {
            alert(`${res}`);
            window.location.reload();
        })
        // .then((result) => console.log(result))
        .catch((error) => alert(`${error}`));
}

function addUser(newUser: object): void {
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    const reqUser = JSON.stringify(newUser);
    const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: reqUser,
        credentials: 'include',
    } as RequestInit;

    fetch(`https://rs-clone-api.vercel.app/addUser`, requestOptions)
        .then((response) => {
            if (response.status === 500) {
                throw new Error('This email exist');
            } else {
                return response.text();
            }
        })
        .then((res) => {
            alert(`User ${(JSON.parse(res) as user).userName} added. Please signIn`);
        })
        // .then((result) => console.log(result))
        .catch((error) => alert(`${error}`));
}

function deleteUser(email: string): void {
    const requestOptions = {
        method: 'DELETE',
        credentials: 'include',
    } as RequestInit;

    fetch(`https://rs-clone-api.vercel.app/deleteUser/${email}`, requestOptions)
        .then((response) => response.text())
        .then((res) => alert(`${res}`))
        // .then((result) => console.log(result))
        .catch((error) => console.log('error', error));
}

async function updateUser(updateFields: object, email: string) {
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    const reqData = JSON.stringify(updateFields);
    const requestOptions = {
        method: 'PATCH',
        headers: myHeaders,
        body: reqData,
        credentials: 'include',
    } as RequestInit;

    return await fetch(`https://rs-clone-api.vercel.app/updateUser/${email}`, requestOptions)
        .then((response) => response.text())
        .then((res) => {
            alert(`User updated\n${res}, you should relogin`);
            return res;
        })
        // .then((result) => console.log(result))
        .catch((error) => console.log('error', error));
}
