import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  ngOnInit(): void {
  }

  @ViewChild('txtSearch') txtSearch!:ElementRef<HTMLInputElement>;

  constructor(private gifsService: GifsService){}

  search() {
    const value = this.txtSearch.nativeElement.value;
    
    if (value.trim().length === 0){
      return;
    }

    this.gifsService.searchGifs(value);

    this.txtSearch.nativeElement.value = "";
  }

}
