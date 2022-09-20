export interface IModel<T> {
  // create(arg0: {T}): Promise<T>;
  create(obj: T): Promise<T>;
  read(): Promise<T[]>;
  readOne(_id: string): Promise<T | null>;
  update(_id: string, obj: T): Promise<T | null>;
  delete(_id: string): Promise<T | null>;
}
