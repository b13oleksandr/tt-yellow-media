import { $Fetch } from 'ofetch'
import { ApiRequestMethod } from '~/types'

class HttpFactory {
  private readonly $fetch: $Fetch

  constructor(fetcher: $Fetch) {
    this.$fetch = fetcher
  }

  async call<T>(url: string, method: ApiRequestMethod = ApiRequestMethod.get, data?: object, extras = {}): Promise<T> {
    return <T>await this.$fetch(url, {
      method,
      body: data,
      ...extras
    })
  }
}

export default HttpFactory
