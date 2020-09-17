import "whatwg-fetch";

export class MoviesService {
  private _host: string;
  private _apiVer: string;
  private _path: string;

  private get Url(): string {
    return `${this._host}${this._apiVer}${this._path}`;
  }

  constructor(
      host: string = "https://api.themoviedb.org",
      apiVer: string = "/3",
      path: string = "/movie") {
    this._host = host;
    this._apiVer = apiVer;
    this._path = path;
  }

  getDetails(movieId: number): Promise<Response> {
    return fetch(`${this.Url}/${movieId}?api_key=1b869b3ccf57d089047ded4b1de007b8`).then((res:any) => {
      return res;
    });
  }
}

export default new MoviesService();
