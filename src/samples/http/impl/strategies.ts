interface IRequestStrategy {
  method: string
  url: string
  data: XMLHttpRequestBodyInit
  headers?: Map<string, string>
}

export function sendXHR<T>({ method, url, data, headers }: IRequestStrategy): Promise<T> {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.addEventListener('readystatechange', function handlerStateChange() {
      if (this.readyState === 4) {
        if (this.status >= 200 && this.status < 300) {
          resolve(xhr.response)
        } else {
          reject(xhr.statusText)
        }
      }
    })
    xhr.addEventListener('error', function handlerError() {
      reject(new Error('Network Error'))
    })
    xhr.open(method, url)

    if (headers) {
      for (const [key, header] of headers) {
        xhr.setRequestHeader(key, header)
      }
    }

    xhr.send(data)
  })
}

export function sendFetch<T>({ method, url, data, headers }: IRequestStrategy): Promise<T> {
  const config: RequestInit = {
    method,
    headers: headers && Object.fromEntries(headers),
    body: data,
  }
  return fetch(url, config).then((res) => {
    if (res.ok) {
      return res.json()
    }
    throw new Error('Network Error')
  })
}
