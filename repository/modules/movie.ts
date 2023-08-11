import HttpFactory from '../factory'
import {ApiRequestMethod, Genre, Movie, MovieSession} from '~/types'

class MovieModule extends HttpFactory {
  private resource = '/movies'

  async get(id: string): Promise<Movie> {
    const params = id ? `?movie_id=${id}` : ''
    const res = <any>await this.call(`${this.resource}/${params}?ln=en`)

    return JSON.parse(res).data[0] || <Movie>{}
  }

  async getAll(genre: Genre | null): Promise<Movie[]> {
    const params = genre !== null ? `?genres=${genre}` : ''
    const res = <any>await this.call(`${this.resource}/${params}`)

    return JSON.parse(res).data || []
  }

  async search(query: string): Promise<Movie[]> {
    const params = query ? `?name=${query}` : ''
    const res = <any>await this.call(`${this.resource}/${params}`)

    return JSON.parse(res).data || []
  }

  async getSessions(movieId: string): Promise<MovieSession[]> {
    const res = <any>await this.call(`movieShows?movie_id=${movieId}`)

    return JSON.parse(res).data || []
  }

  async showPlaces(movieId: string, daytime: string, showdate: string): Promise<any> {
    const res = <any>await this.call(`showPlaces?movie_id=${movieId}&daytime=${daytime}&showdate=${showdate}`)

    return JSON.parse(res).data || []
  }

  async bookPlace(data: {
    movieId: string
    row: number
    seat: number
    showdate: string
    daytime: string
  }): Promise<any> {
    const res = <any>await this.call(`bookPlace`, ApiRequestMethod.post, {
        movie_id: data.movieId,
        row: data.row,
        seat: data.seat,
        showdate: data.showdate,
        daytime: data.daytime
      }
    )

    return JSON.parse(res).data || {}
  }
}

export default MovieModule