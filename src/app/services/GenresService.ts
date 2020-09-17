import "whatwg-fetch";

export class GenresService {
  private _host: string;
  private _apiVer: string;
  private _path: string;

  private get Url(): string {
    return `${this._host}${this._apiVer}${this._path}`;
  }

  constructor(
      host: string = "https://api.themoviedb.org",
      apiVer: string = "/3",
      path: string = "/genre/movie/list") {
    this._host = host;
    this._apiVer = apiVer;
    this._path = path;
  }

  get(): Promise<Response> {
    return fetch(`${this.Url}?api_key=1b869b3ccf57d089047ded4b1de007b8`);
  }
}

export default new GenresService();
