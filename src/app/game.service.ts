import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Game } from './game';

@Injectable()
export class GameService {

  readonly url = 'http://localhost:8080/api/games'

  constructor(private http: HttpClient) { }

  getAllGames(gamesPerPage: number, pageIndex: number) {

    const params = new HttpParams()
        .set('limit', gamesPerPage)
        .set('offset', pageIndex)
    
    return this.http.get<Game>(this.url, {params})
  }
}
