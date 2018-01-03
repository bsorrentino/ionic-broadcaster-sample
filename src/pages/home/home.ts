import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Broadcaster } from '@ionic-native/broadcaster';
import { Subscription } from 'rxjs/Subscription';
//import cordova from "cordova";
import { timer } from 'rxjs/Observable/timer';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private  subscription:Subscription;

  constructor(public navCtrl: NavController, 
              private broadcaster: Broadcaster) {

  }


  onRegisterListener() {
      this.subscription = this.broadcaster.addEventListener("TEST.EVENT")
        .subscribe( (event:any) => console.log( "event home received", event ));

  }

  onUnregisterListener() {
    this.subscription.unsubscribe();
  }

  onStartTest() {

    console.log( cordova.platformId );

    if( cordova.platformId === "browser" ) {

        timer(1000,1000)
          .subscribe( (v)=> {
            console.log( "fire native event");
            let event = new CustomEvent("TEST.EVENT", { detail: { data:"this is a test event"} } );
            document.dispatchEvent( event );
          })
      
    }

  }
  
}
