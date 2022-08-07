import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoaderComponent implements OnInit {
  @Input() public isLoading: boolean;

  constructor() { }

  ngOnInit(): void {
  }

}
