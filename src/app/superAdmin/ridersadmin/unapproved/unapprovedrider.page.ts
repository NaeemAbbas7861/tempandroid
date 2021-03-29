import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { LoadingController } from '@ionic/angular';
//import * as moment from 'moment';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/services/toast.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-approved',
  templateUrl: './unapproved.page.html',
  styleUrls: ['./unapproved.page.scss'],
})
export class UnapprovedRiderPage implements OnInit {

  riders: any
  today: any;
  event:any;
  resourceURL = environment.RESOURCE_URL

  constructor(
    public route: ActivatedRoute,
    public api: LoginService,
    public loadingController: LoadingController,
    public router: Router,
  //  private events: Events,
    private toastService: ToastService
  ) {
   // this.today = moment().format('YYYY-MM-DD');
  }

  ngOnInit() {
    // this.GetUnApprovedRider();
  }

  ionViewDidEnter() {
      this.GetUnApprovedRider();
  
    this.doRefresh(this.event);
  }

  async GetUnApprovedRider() {
    const loading = await this.loadingController.create({
      message: 'Loading'
    });

    await loading.present();

    await this.api.GetUnApprovedRider().subscribe(
      res => {
        console.log(res);
        this.riders = res;
        loading.dismiss();
      },
      err => {
        console.log(err);
        loading.dismiss();
      }
    );
  }
  navigate(id){
    this.router.navigateByUrl('superadmin/riders/'+id+'/products');
  }

  async ApprovedRider(id){
  const loading = await this.loadingController.create({ message: 'Loading' });
  await loading.present();

  await this.api.ChangeRiderstatus(id).subscribe(
    res => {
      console.log(res);
      this.riders = res;
      this.toastService.create('Rider Approval request succeded');
      this.GetUnApprovedRider();
      this.doRefresh(event);
   //   this.events.publish('unapprovedCount', this.doctors.length);
      loading.dismiss();
    },
    err => {
      console.log(err);
      loading.dismiss();
    }
  );
}
doRefresh(event) {
  console.log('Begin async operation');
  this.ngOnInit();
  setTimeout(() => {
    console.log('Async operation has ended');
    event.target.complete();
  }, 1000);
}

 
}
