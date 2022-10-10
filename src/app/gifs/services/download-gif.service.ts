import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DownloadGifService {

  constructor() { }

  private readFile(blob: Blob): Observable<string> {
    return Observable.create((obs: { error: (arg0: ProgressEvent<FileReader>) => any; next: (arg0: string | ArrayBuffer | null) => any; complete: () => any; }) => {
      const reader = new FileReader();

      reader.onerror = err => obs.error(err);
      reader.onabort = err => obs.error(err);
      reader.onload = () => obs.next(reader.result);
      reader.onloadend = () => obs.complete();

      return reader.readAsDataURL(blob);
    });
  }
}
