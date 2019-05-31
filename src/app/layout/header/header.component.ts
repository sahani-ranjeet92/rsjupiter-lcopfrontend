import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  pushRightClass: 'push-right';
  public loading: boolean;

  constructor() { }

  ngOnInit() {
    this.loading = true;
    let context = this;
    setTimeout(function () {
      context.loading = false;
    }, 100000);
  }


  toggleSidebar() {
    const dom: any = document.querySelector('body');
    dom.classList.toggle(this.pushRightClass);

  }

}
