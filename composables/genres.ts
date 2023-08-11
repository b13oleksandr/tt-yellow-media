import { Genre } from "~/types"

export const useGenres = () => {
  const genres = {
    [Genre.Action]: 'Бойовики',
    [Genre.Adventures]: 'Пригоди',
    [Genre.Drama]: 'Драма',
    [Genre.Comedy]: 'Комедії',
    [Genre.Horror]: 'Жахи',
    [Genre.Westerns]: 'Вестрни'
  }

  return {
    genres
  }
}
