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
        .then((result) => console.log(result))
        .catch((error) => console.log('error', error));
}

export function signIn(email: string, password = ''): void {
    const myHeaders = new Headers();
    if (password != '') {
        myHeaders.append('x-hash-pass', `${password}`);
        console.log(`Get user using password`);
    }

    const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        credentials: 'include',
    } as RequestInit;

    fetch(`https://rs-clone-api.vercel.app/signIn/${email}`, requestOptions)
        .then((response) => response.text())
        .then((result) => console.log(result))
        .catch((error) => console.log('error', error));
}

export function signOut(email: string): void {
    const requestOptions = {
        method: 'GET',
        credentials: 'include',
    } as RequestInit;

    fetch(`https://rs-clone-api.vercel.app/signOut/${email}`, requestOptions)
        .then((response) => response.text())
        .then((result) => console.log(result))
        .catch((error) => console.log('error', error));
}

export function addUser(newUser: object): void {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const reqUser = JSON.stringify(newUser);
    const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: reqUser,
        credentials: 'include',
    } as RequestInit;

    fetch(`https://rs-clone-api.vercel.app/addUser`, requestOptions)
        .then((response) => response.text())
        .then((result) => console.log(result))
        .catch((error) => console.log('error', error));
}

export function deleteUser(email: string): void {
    const requestOptions = {
        method: 'DELETE',
        credentials: 'include',
    } as RequestInit;

    fetch(`https://rs-clone-api.vercel.app/deleteUser/${email}`, requestOptions)
        .then((response) => response.text())
        .then((result) => console.log(result))
        .catch((error) => console.log('error', error));
}

export function updateUser(updateFields: object, email: string): void {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const reqData = JSON.stringify(updateFields);
    const requestOptions = {
        method: 'PATCH',
        headers: myHeaders,
        body: reqData,
        credentials: 'include',
    } as RequestInit;

    fetch(`https://rs-clone-api.vercel.app/updateUser/${email}`, requestOptions)
        .then((response) => response.text())
        .then((result) => console.log(result))
        .catch((error) => console.log('error', error));
}