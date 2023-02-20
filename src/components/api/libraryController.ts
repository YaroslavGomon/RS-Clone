export function allLibrary(adminPass: string): void {
    const myHeaders = new Headers();
    myHeaders.append('x-admin-pass', `${adminPass}`);
    const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        credentials: 'include',
    } as RequestInit;

    fetch(`https://rs-clone-api.vercel.app/allPlaylists`, requestOptions)
        .then((response) => response.text())
        .then((result) => console.log(result))
        .catch((error) => console.log('error', error));
}

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

export function  addNewPlaylist(email: string, playlistName:string): void {
    const requestOptions = {
        method: 'PATCH',
        credentials: 'include',
    } as RequestInit;

    fetch(`https://rs-clone-api.vercel.app/addNewPlaylist/${email}/${playlistName}`, requestOptions)
        .then((response) => response.text())
        .then((result) => console.log(result))
        .catch((error) => console.log('error', error));
}

export function  renamePlaylist(email: string, playlistName:string, newPlaylistName: string): void {
    const requestOptions = {
        method: 'PATCH',
        credentials: 'include',
    } as RequestInit;

    fetch(`https://rs-clone-api.vercel.app/renamePlaylist/${email}/${playlistName}/${newPlaylistName}`, requestOptions)
        .then((response) => response.text())
        .then((result) => console.log(result))
        .catch((error) => console.log('error', error));
}

export function  addItemToPlaylist(email: string, playlistName:string, itemId: string): void {
    const requestOptions = {
        method: 'POST',
        credentials: 'include',
    } as RequestInit;

    fetch(`https://rs-clone-api.vercel.app/addItemToPlaylist/${email}/${playlistName}/${itemId}`, requestOptions)
        .then((response) => response.text())
        .then((result) => console.log(result))
        .catch((error) => console.log('error', error));
}

export function  removeItemFromPlaylist(email: string, playlistName:string, itemId: string): void {
    const requestOptions = {
        method: 'DELETE',
        credentials: 'include',
    } as RequestInit;

    fetch(`https://rs-clone-api.vercel.app/removeItemFromPlaylist/${email}/${playlistName}/${itemId}`, requestOptions)
        .then((response) => response.text())
        .then((result) => console.log(result))
        .catch((error) => console.log('error', error));
}

export function  removePlaylist(email: string, playlistName:string): void {
    const requestOptions = {
        method: 'DELETE',
        credentials: 'include',
    } as RequestInit;

    fetch(`https://rs-clone-api.vercel.app/removePlaylist/${email}/${playlistName}`, requestOptions)
        .then((response) => response.text())
        .then((result) => console.log(result))
        .catch((error) => console.log('error', error));
}
