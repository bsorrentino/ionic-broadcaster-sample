var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Broadcaster } from '@ionic-native/broadcaster';
//import cordova from "cordova";
import { timer } from 'rxjs/Observable/timer';
var HomePage = (function () {
    function HomePage(navCtrl, broadcaster) {
        this.navCtrl = navCtrl;
        this.broadcaster = broadcaster;
    }
    HomePage.prototype.onRegisterListener = function () {
        this.subscription = this.broadcaster.addEventListener("TEST.EVENT")
            .subscribe(function (event) { return console.log("event home received", event); });
    };
    HomePage.prototype.onUnregisterListener = function () {
        this.subscription.unsubscribe();
    };
    HomePage.prototype.onStartTest = function () {
        console.log(cordova.platformId);
        if (cordova.platformId === "browser") {
            timer(1000, 1000)
                .subscribe(function (v) {
                console.log("fire native event");
                var event = new CustomEvent("TEST.EVENT", { detail: { data: "this is a test event" } });
                document.dispatchEvent(event);
            });
        }
    };
    HomePage = __decorate([
        Component({
            selector: 'page-home',
            templateUrl: 'home.html'
        }),
        __metadata("design:paramtypes", [NavController,
            Broadcaster])
    ], HomePage);
    return HomePage;
}());
export { HomePage };
//# sourceMappingURL=home.js.map