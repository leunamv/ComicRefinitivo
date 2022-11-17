import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';



@Injectable({
  providedIn: 'root',
})

export class ComicService {
  endPoint = 'http://localhost:8080/api/comics1';//aqui modifique comics a comics1
  httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private httpClient: HttpClient) { }

  getComics(){
    return this.httpClient.get(this.endPoint);
  }
  // httpOptions = {
    // headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  // };
  createComic(comic,blob){
    let formData= new FormData();
    formData.append('comic',comic.comic);
    formData.append('autor',comic.autor);
    formData.append('file',blob);
    return this.httpClient.post(this.endPoint, formData);
  }
  getComic(id) {
    console.log("Estamos en getcomic",id);
    return this.httpClient.get<ComicService[]>(this.endPoint + '/' + id).pipe(
      tap((_) => console.log(`Comic fetched: ${id}`)),
      catchError(this.handleError<ComicService[]>(`Get comic id=${id}`))
    );
  }

    // updateComic(comic,blob){
    //   let formData= new FormData();
    //   formData.append('comic',comic.comic);
    //   formData.append('autor',comic.autor);
    //   formData.append('file',blob);
    //   return this.httpClient.put(this.endPoint, formData);
    // }

  

  updateComic(id, comic: ComicService): Observable<any> {
    return this.httpClient
      .put(this.endPoint + '/' + id, JSON.stringify(comic), this.httpOptions)
      .pipe(
        tap((_) => console.log(`Comic updated: ${id}`)),
        catchError(this.handleError<ComicService[]>('Update comic'))
      );
  }


  // updateComic(comic,blob){       ESTE MAS O MENOS FUNCIONABA PERO PONIA UNDEFINED en la base de datos ...COMPLICADO
  //   return this.httpClient
  //   .put<ComicService[]>(this.endPoint + '/' + comic, this.httpOptions)
  //   .pipe(
  //     tap((_) => console.log(`Comic updated: ${comic}`)),
  //     catchError(this.handleError<ComicService[]>('Delete comic')),
    
  //  )
  // }

  

  deleteComic(id) {
    return this.httpClient
      .delete<ComicService[]>(this.endPoint + '/' + id, this.httpOptions)
      .pipe(
        tap((_) => console.log(`Comic deleted: ${id}`)),
        catchError(this.handleError<ComicService[]>('Delete comic'))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
