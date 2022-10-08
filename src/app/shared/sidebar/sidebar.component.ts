import { Component } from '@angular/core';
import { GifsService } from '../../gifs/services/gifs.service';
import { AuthService } from '../../auth/services/auth.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  providers: [AuthService]
})
export class SidebarComponent {

  public user$: Observable<any> = this.authSvc.afAuth.user;

  constructor(private gifsService: GifsService, private authSvc: AuthService, private router: Router) { }

  get history() {
    return this.gifsService.history;
  }

  search(searchValue: string) {
    this.gifsService.searchGifs(searchValue);
  }

  async onLogout(){
    try {
      await this.authSvc.logout();
      this.router.navigate(['/login']);
    }
    catch(error){
      console.log(error);
    } 
  }
}
