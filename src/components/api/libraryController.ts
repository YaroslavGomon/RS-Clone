import { ILibrary } from '../types/interfaces';
import { UserLibrary } from '../types/type';

export class Library implements ILibrary {
    private email: string;
    constructor(email: string) {
        this.email = email;
    }
    public userLibrary(): Promise<UserLibrary | string> {
        return userLibrary(this.email);
    }
    public addNewPlaylist(playlistName: string) {
        return addNewPlaylist(this.email, playlistName);
    }
    public renamePlaylist(playlistName: string, newPlaylistName: string) {
        return renamePlaylist(this.email, playlistName, newPlaylistName);
    }
    public addItemToPlaylist(playlistName: string, itemId: string) {
        return addItemToPlaylist(this.email, playlistName, itemId);
    }
    public removeItemFromPlaylist(playlistName: string, itemId: string) {
        return removeItemFromPlaylist(this.email, playlistName, itemId);
    }
    public removePlaylist(playlistName: string) {
        return removePlaylist(this.email, playlistName);
    }
}

/// API Authorization and Authentication functions
/// DELETE EXPORT
/// EXPORT FOR DEVELOP

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
        // .then((result) => console.log(result))
        .catch((error) => console.log('error', error));
}

async function userLibrary(email: string): Promise<UserLibrary | string> {
    const requestOptions = {
        method: 'GET',
        credentials: 'include',
    } as RequestInit;

    return fetch(`https://rs-clone-api.vercel.app/userLibrary/${email}`, requestOptions)
        .then(async (response) => {
            const responseString = await response.text();
            if(response.status === 500 || response.status === 404){
                throw new Error(`${responseString}`);
            }
            else {
                return responseString;
            }
        })
        .then(res => JSON.parse(res) as UserLibrary);
        // .catch((error) => console.error(error));
}

async function addNewPlaylist(email: string, playlistName: string) {
    const requestOptions = {
        method: 'PATCH',
        credentials: 'include',
    } as RequestInit;

    fetch(`https://rs-clone-api.vercel.app/addNewPlaylist/${email}/${playlistName}`, requestOptions)
        .then((response) => response.text())
        .then((result) => console.log(result))
        .catch((error) => console.log('error', error));
}

async function renamePlaylist(email: string, playlistName: string, newPlaylistName: string) {
    const requestOptions = {
        method: 'PATCH',
        credentials: 'include',
    } as RequestInit;

    fetch(`https://rs-clone-api.vercel.app/renamePlaylist/${email}/${playlistName}/${newPlaylistName}`, requestOptions)
        .then((response) => response.text())
        // .then((result) => console.log(result))
        .catch((error) => console.log('error', error));
}

async function addItemToPlaylist(email: string, playlistName: string, itemId: string) {
    const requestOptions = {
        method: 'POST',
        credentials: 'include',
    } as RequestInit;

    fetch(`https://rs-clone-api.vercel.app/addItemToPlaylist/${email}/${playlistName}/${itemId}`, requestOptions)
        .then((response) => response.text())
        // .then((result) => console.log(result))
        .catch((error) => console.log('error', error));
}

async function removeItemFromPlaylist(email: string, playlistName: string, itemId: string) {
    const requestOptions = {
        method: 'DELETE',
        credentials: 'include',
    } as RequestInit;

    fetch(`https://rs-clone-api.vercel.app/removeItemFromPlaylist/${email}/${playlistName}/${itemId}`, requestOptions)
        .then((response) => response.text())
        // .then((result) => console.log(result))
        .catch((error) => console.log('error', error));
}

async function removePlaylist(email: string, playlistName: string) {
    const requestOptions = {
        method: 'DELETE',
        credentials: 'include',
    } as RequestInit;

    fetch(`https://rs-clone-api.vercel.app/removePlaylist/${email}/${playlistName}`, requestOptions)
        .then((response) => response.text())
        // .then((result) => console.log(result))
        .catch((error) => console.log('error', error));
}
