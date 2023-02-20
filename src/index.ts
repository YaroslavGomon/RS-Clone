import './style.scss';
import './assets/img/fav-icon.png';
import { App } from './components/app';
// import { addUser, deleteUser, listUsers, signIn, signOut, updateUser } from './components/api/authorizationController';
// import { addItemToPlaylist, addNewPlaylist, allLibrary, removeItemFromPlaylist, removePlaylist, renamePlaylist, userLibrary } from './components/api/libraryController';
// import { userLibrary } from './components/api/libraryController';

const app = new App();
app.start();





// ***FIRST TEST***
// get all users and library for all users
// *** uncomment below code
// listUsers('root');
// allLibrary('root');
// ***


// ***SECOND TEST***
// sign in and get user library,
// sign in without password by using cookies,
// sign Out to delete user cookies
// *** uncomment below code
// const EMAIL = 'motevich@gmail.com';
// const HASH_PASS = '995';
// signIn(EMAIL, HASH_PASS);
// userLibrary(EMAIL);
// signIn(EMAIL);
// signOut(EMAIL);
// // check that user signed out
// setTimeout(()=>{signIn(EMAIL);}, 1000);
// ***


// ***THIRD TEST***
// add user
// sign in to this user
// update user
// delete user
// *** uncomment below code
// const newUser = {
//     "userName": "Ksusha",
//     "userPassword": "password1",
//     "email": "ksusha@gmail.com",
//     "phone": "+375259882978",
// };
// const updateFields = {
//   "userName": "Ksusha Motevich",
// };
// const EMAIL = 'ksusha@gmail.com';
// const HASH_PASS = '995';
// addUser(newUser);
// signIn(EMAIL, HASH_PASS);
// updateUser(updateFields, EMAIL);
// deleteUser(EMAIL);
// signIn(EMAIL, HASH_PASS);
// ;
// ***


//***THIRD TEST***
// LIBRARY
// const NEW_PLAYLIST = 'MY NEW PLAY LIST';
// const NEW_PLAYLIST_NAME = 'MY-NEW-PLAYLIST';
// const ITEM_ID = '12345678';
// const EMAIL = 'motevich@gmail.com';
// const HASH_PASS = '995';
// signIn(EMAIL, HASH_PASS);
// userLibrary(EMAIL);
// addNewPlaylist(EMAIL, NEW_PLAYLIST);
// renamePlaylist(EMAIL, NEW_PLAYLIST, NEW_PLAYLIST_NAME);
// addItemToPlaylist(EMAIL, NEW_PLAYLIST_NAME, ITEM_ID);
// removeItemFromPlaylist(EMAIL, NEW_PLAYLIST_NAME, ITEM_ID);
// removePlaylist(EMAIL, NEW_PLAYLIST_NAME);