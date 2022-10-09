import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss'],
  providers: [AuthService]
})
export class ResultsComponent {

  public user$: Observable<any> = this.authSvc.afAuth.user;

  get results() {
    console.log("result");
    return this.gifsService.results;
  }

  get loaded() {
    return this.gifsService.loaded;
  }

  constructor(private gifsService: GifsService, private authSvc: AuthService) { }

  public onImageLoad( event: Event ){
    const target = event.target as HTMLImageElement;
    target.parentElement!.style.display = "flex";
  }

}
