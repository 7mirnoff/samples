/* eslint-disable no-underscore-dangle */
export interface ICustomResponse<T> {
  json: () => Promise<T>
}

export class CustomResponse<T> implements ICustomResponse<T> {
  constructor(private readonly response: Response | XMLHttpRequest) {
    this.response = response
  }

  async json(): Promise<T> {
    const res = this.response
    if ('json' in res) {
      return res.json()
    }

    return new Promise((resolve, reject) => {
      if (res.responseText) {
        try {
          resolve(JSON.parse(res.responseText))
        } catch (error) {
          reject(error)
        }
      } else {
        reject(new Error('Empty response from XHR'))
      }
    })
  }
}
