import { ReducerPagination } from "./ReducerState";

export class ReducerActionPayload<U> {
  entity: U;
  pagination: ReducerPagination;

  constructor(entity: U, pagination: ReducerPagination) {
    this.entity = entity;
    this.pagination = pagination;
  }
}

export class ReducerAction<T> {
  type: string;
  payload: ReducerActionPayload<T>;

  constructor(type: string, payload: ReducerActionPayload<T>) {
    this.type = type;
    this.payload = payload;
  }
}
