export class ReducerStateEntity {
  byId: any;
  ids: number[];
  activeIds: number[];

  constructor(byId: any, ids: number[], activeIds: number[]) {
    this.byId = byId;
    this.ids = ids;
    this.activeIds = activeIds;
  }
}

export class ReducerPagination {
  defaultCurrent: number;
  current: number;
  total: number;
  pageSize: number;

  constructor(defaultCurrent: number, total: number, pageSize: number = 20) {
    this.defaultCurrent = defaultCurrent;
    this.current = defaultCurrent;
    this.total = total;
    this.pageSize = pageSize;
  }
}

export class ReducerState {
  entities: ReducerStateEntity;
  pagination: ReducerPagination;
  loading: boolean;
  updating: boolean;

  constructor(entities: ReducerStateEntity, pagination: ReducerPagination, loading: boolean = false, updating: boolean = false) {
    this.entities = entities;
    this.pagination = pagination;
    this.loading = loading;
    this.updating = updating;
  }
}