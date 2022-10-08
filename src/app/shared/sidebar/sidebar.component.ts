import { Component, OnInit } from '@angular/core';
import { GifsService } from '../../gifs/services/gifs.service';
import { AuthService } from '../../auth/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  providers: [AuthService]
})
export class SidebarComponent implements OnInit {

  constructor(private gifsService: GifsService, private authSvc: AuthService) { }

  get history() {
    return this.gifsService.history;
  }

  search(searchValue: string) {
    this.gifsService.searchGifs(searchValue);
  }

  async ngOnInit() {
    console.log('Navbar');
    const user = await this.authSvc.getCurrentUser();
    if(user){
      console.log('User -> ', user);
    }
  }

}
