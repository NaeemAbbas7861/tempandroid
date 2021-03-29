import { Component, OnInit } from '@angular/core';
//import { Events } from '@ionic/angular';

@Component({
  selector: 'app-doctor',
  templateUrl: './shop.page.html',
  styleUrls: ['./shop.page.scss'],
})
export class ShopPage implements OnInit {

  approvedCount: number;
  unapprovedCount: number;

  constructor() { }

  ngOnInit() {
    // this.event.subscribe('approvedCount', (count) => {
    //   this.approvedCount = count;
    // });
    // this.event.subscribe('unapprovedCount', (count) => {
    //   this.unapprovedCount = count;
    // });
  }

}
