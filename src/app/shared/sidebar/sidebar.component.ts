import { Component, OnInit } from '@angular/core';
import { GifsService } from '../../gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {

  constructor(private gifsService: GifsService) { }

  get history() {
    return this.gifsService.history;
  }

  search(searchValue: string){
    this.gifsService.searchGifs(searchValue);
  }

}
