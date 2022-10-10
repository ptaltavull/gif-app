import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SearchGifsResponse, Gif } from '../interfaces/gifs.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey: string = 'daCnEgDHsa5TA5ZV51ynwrk0HnWhXR4H';
  private urlService: string = 'https://api.giphy.com/v1/gifs';
  private _history: string[] = [];

  public loaded: boolean = false;

  public results: Gif[] = [];

  get history() {
    return [...this._history];
  }

  constructor(private http: HttpClient) {

    this._history = JSON.parse(localStorage.getItem('history')!) || [];
    if (JSON.parse(localStorage.getItem('results')!)) {
      this.results = JSON.parse(localStorage.getItem('results')!);
      this.loaded = true;
    } else {
      this.results = [];
    }

  }

  public searchGifs(query: string = '') {

    this.loaded = false;

    query = query.trim().toLowerCase();

    if (!this._history.includes(query)) {
      this._history.unshift(query);
      this._history = this._history.splice(0, 10);

      localStorage.setItem('history', JSON.stringify(this._history));

    }

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', '20')
      .set('q', query);

    this.http.get<SearchGifsResponse>(`${this.urlService}/search`, { params })
      .subscribe((response) => {
        this.results = response.data;
        localStorage.setItem('results', JSON.stringify(this.results));
        setTimeout(() => this.loaded = true, 3000);
      })
  }

  public getGifById(id: string):Observable<any> {
    const params = new HttpParams()
      .set('api_key', this.apiKey);
    return this.http.get<any>(`${this.urlService}/${id}`, { params });
  }

}
