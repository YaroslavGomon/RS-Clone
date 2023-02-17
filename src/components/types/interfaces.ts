interface IController {
  fetchRecent(): void;
  fetchSearchCall(search: string): void;
  fetchById(id: number): void;
  fetchEpisodesById(id: number): void;
  // test(): void;
}

export {IController};
