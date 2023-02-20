import { user } from './type';

interface IController {
    fetchRecent(): void;
    fetchSearchCall(search: string): void;
    fetchById(id: number): void;
    fetchEpisodesById(id: number): void;
    test(): void;
}

interface IAdmin {
    listUsers(): void;
    allPlaylists(): void;
}

interface IAuthentication {
    signIn(): void;
}

interface IRegestration {
    addUser(newUser: user): void;
}

interface IAuthorization {
    signOut(): void;
    updateUser(updateFields: user): void;
    deleteUser(): void;
}

interface ILibrary {
    userLibrary(): void;
    addNewPlaylist(playlistName: string): void;
    renamePlaylist(playlistName: string, newPlaylistName: string): void;
    addItemToPlaylist(playlistName: string, itemId: string): void;
    removeItemFromPlaylist(playlistName: string, itemId: string): void;
    removePlaylist(playlistName: string): void;
}

export { IController, IAuthorization, ILibrary, IAdmin, IAuthentication, IRegestration }