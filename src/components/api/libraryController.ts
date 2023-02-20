export function userLibrary(email: string): void {
    const requestOptions = {
        method: 'GET',
        credentials: 'include',
    } as RequestInit;

    fetch(`https://rs-clone-api.vercel.app/userLibrary/${email}`, requestOptions)
        .then((response) => response.text())
        .then((result) => console.log(result))
        .catch((error) => console.log('error', error));
}
