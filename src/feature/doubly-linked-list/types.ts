export interface INode<T> {
  value: T
  next: INode<T> | null
  previous: INode<T> | null
}

export interface INodeList<T> {
  head: INode<T> | null
  tail: INode<T> | null
  prepend(value: T): INodeList<T>
  append(value: T): INodeList<T>
  delete(value: T): INode<T> | null
  find(value?: T | undefined): INode<T> | null
  deleteTail(): INode<T> | null
  deleteHead(): INode<T> | null
  fromArray(values: Array<T>): INodeList<T>
  toArray(): INode<T>[]
  reverse(): INodeList<T>
}
