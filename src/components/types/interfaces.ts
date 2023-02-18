import { user } from "./type";

interface IController {
  fetchRecent(): void;
  fetchSearchCall(search: string): void;
  fetchById(id: number): void;
  fetchEpisodesById(id: number): void;
  test(): void;
}

interface IAuthorization {
  listUsers(adminPass: string): void;
  signIn(email: string, password: string): void;
  signOut(email: string): void;
  addUser(newUser: user): void;
  updateUser(updateFields: user): void;
  deleteUser(email: string): void;
}
interface ILibrary {
  allPlaylists(adminPass: string): void;
  addNewPlaylist(email: string, playlistName:string): void;
  renamePlaylist(email: string, playlistName:string, newPlaylistName: string): void;
  addItemToPlaylist(email: string, playlistName:string, itemId: string): void;
  removeItemToPlaylist(email: string, playlistName:string, itemId: string): void;
  removePlaylist(email: string, playlistName:string): void;
}

export {IController};