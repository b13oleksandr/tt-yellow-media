export interface Movie {
  additional: string
  description: string
  genre: number
  id: number
  image: string
  name: string
}

export interface MovieSession {
  daytime: string
  showdate: string
}

export enum Genre {
  Action,
  Adventures,
  Comedy,
  Drama,
  Horror,
  Westerns
}
