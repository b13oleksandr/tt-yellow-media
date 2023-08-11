import { $fetch, FetchOptions } from 'ofetch'
import MovieModule from "~/repository/modules/movie"

export interface ApiInstance {
  movie: MovieModule
}

export default defineNuxtPlugin((nuxtApp) => {
  const fetchOptions: FetchOptions = {
    baseURL: nuxtApp.$config.public.apiBase
  }

  const apiFetcher = $fetch.create(fetchOptions)

  const modules: ApiInstance = {
    movie: new MovieModule(apiFetcher)
  }

  return {
    provide: {
      api: modules
    }
  }
})
