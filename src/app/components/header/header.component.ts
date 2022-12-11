import { Component, OnInit, Input, Output ,EventEmitter} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public search: string;

  @Output()
  public setSearch = new EventEmitter<string>();

  public userSearch(): void {
    this.setSearch.emit(this.search); // Raising the event - העלאת ארוע
  }

  constructor() { }

  ngOnInit(): void {
  }

}
