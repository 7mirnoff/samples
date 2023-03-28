export enum Method {
  post = 'POST',
  get = 'GET',
  put = 'PUT',
  delete = 'DELETE',
}

export interface IRequestParams {
  method: Method
  url: string
  data?: XMLHttpRequestBodyInit | null
  headers?: Map<string, string>
}

export async function sendXHR({ method, url, data, headers }: IRequestParams): Promise<XMLHttpRequest> {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.addEventListener('readystatechange', () => {
      if (xhr.readyState === 4) {
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve(xhr)
        } else {
          reject(xhr.statusText)
        }
      }
    })
    xhr.addEventListener('error', () => {
      reject(new Error('Network Error'))
    })
    xhr.open(method, url)

    if (headers) {
      for (const [header, key] of headers) {
        xhr.setRequestHeader(header, key)
      }
    }

    xhr.send(data)
  })
}

export async function sendFetch({ method, url, data, headers }: IRequestParams): Promise<Response> {
  const config: RequestInit = {
    method,
    headers: headers && Object.fromEntries(headers),
    body: data,
  }

  return fetch(url, config).then((res) => {
    if (res.ok) {
      return res
    }
    throw new Error('Network Error')
  })
}
