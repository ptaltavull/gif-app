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
    return this.gifsService.results;
  }

  constructor(private gifsService: GifsService, private authSvc: AuthService) { }

}
