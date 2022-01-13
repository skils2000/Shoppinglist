export interface ItemInfo {
  name: string;
  isBought: boolean;
}

export interface GetPokemonsDto {
  results: ItemInfo[];
}
