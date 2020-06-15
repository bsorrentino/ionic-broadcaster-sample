/// <reference types="cordova" /> 

import { Component, NgZone, OnInit } from '@angular/core';
import {Broadcaster}  from '@ionic-native/broadcaster';

/// <reference path 
import { timer, Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  private logs = new Array<string>();

  private  subscription:Subscription;

  constructor(private ngZone: NgZone ) {

  }

  ngOnInit() {
    console.log( 'ngOnInit' );
  }

  private L( ...args: any[] ) {
    let v = args.join(' ');
    console.log(v);
    this.ngZone.run( () => this.logs.push(v) );
  }

  onRegisterListener() {
    if( this.subscription &&  !this.subscription.closed ) return;
    const ev = "TEST.EVENT"
    this.L( "register event", ev);
    this.subscription = Broadcaster.addEventListener(ev)
        .subscribe( event =>
          this.L( "received", ev, "\n", JSON.stringify(event)));

  }

  onUnregisterListener() {
    if( !this.subscription || this.subscription.closed ) return;
    this.L( "unregister event", "TEST.EVENT");
    this.subscription.unsubscribe();
  }

  onStartTest() {

    this.L( "PLATFORM", cordova.platformId );
    
    if( cordova.platformId === "browser" ) {
        const ev = "TEST.EVENT";
        timer(1000,1000)
          .subscribe( (v)=> {
            this.L( "fire native event", ev);
            let event = new CustomEvent(ev, { detail: { data:"this is a test event"} } );
            document.dispatchEvent( event );
          })

    }
    else if( cordova.platformId === "android" || cordova.platformId === "ios" ) {
      const ev = "START.TEST.EVENT";
      this.L( "fire native event", ev);
      Broadcaster.fireNativeEvent( ev, { start:1000, period:1000} );

    }

  }

  onClearLog() {
    this.ngZone.run( () => this.logs = [] );
  }

}
