import { SearchService } from './../../services/search.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'wt-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  searchValue: string;
  constructor(private searchService: SearchService) { }

  ngOnInit() {
  }
  search() {
    this.searchService.search(this.searchValue);
  }

}
