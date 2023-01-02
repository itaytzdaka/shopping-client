import { Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {

  @Input()
  public numOfInvites: number;
  @Input()
  public numOfProducts: number;

  constructor() { }

  ngOnInit(): void {
  }

}
