/* eslint-disable no-underscore-dangle */
import { IRequestParams, Method } from './engine'
import { ICache } from '../../../feature/caches/types'
import { CustomResponse, ICustomResponse } from './customResponse'

interface IRequest<T> {
  engine: (engine: (params: IRequestParams) => Promise<Response | XMLHttpRequest>) => this
  cache: (strategy: ICache<string, ICustomResponse<T>>) => this
  method: (method: Method) => this
  url: (url: string) => this
  headers: (headers: Record<string, string>) => this
  create: () => Promise<ICustomResponse<T>>
}

export class Request<T> implements IRequest<T> {
  private _engine: ((params: IRequestParams) => Promise<Response | XMLHttpRequest>) | null
  private _cache: ICache<string, ICustomResponse<T>> | null
  private _method: Method | null
  private _url: string | null
  private _headers: Map<string, string> | null
  private _body: XMLHttpRequestBodyInit | null

  constructor() {
    this._engine = null
    this._cache = null
    this._method = null
    this._url = null
    this._headers = null
    this._body = null
  }

  public engine(engine: (params: IRequestParams) => Promise<Response | XMLHttpRequest>): this {
    this._engine = engine
    return this
  }

  public cache(strategy: ICache<string, ICustomResponse<T>>): this {
    this._cache = strategy
    return this
  }

  public method(method: Method): this {
    this._method = method
    return this
  }

  public url(url: string): this {
    this._url = url
    return this
  }

  public headers(headers: Record<string, string>): this {
    this._headers = new Map(Object.entries(headers))
    return this
  }

  public create(): Promise<ICustomResponse<T>> {
    if (!this._url) {
      throw new Error('URL not exist')
    }

    if (!this._method) {
      throw new Error('Method not exist')
    }

    if (!this._engine) {
      throw new Error('Engine not exist')
    }

    if (this._cache) {
      const cachedResponse = this._cache.get(this._url)
      if (cachedResponse !== -1) {
        return Promise.resolve(cachedResponse)
      }
    }

    const headers = new Map([['Content-Type', 'application/json']])

    if (this._headers) {
      for (const [header, key] of this._headers) {
        headers.set(key, header)
      }
    }

    const cacheKey = this._url

    return this._engine({ method: this._method, url: this._url, data: this._body, headers })
      .then((res) => {
        const response = new CustomResponse<T>(res)
        if (this._cache) {
          this._cache.put(cacheKey, response)
        }
        return response
      })
      .catch((error) => Promise.reject(error))
  }
}
