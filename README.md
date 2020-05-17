# ionic-broadcaster-sample

Sample usage of [cordova-broadcaster](https://github.com/bsorrentino/cordova-broadcaster) in ionic3 using [ionic-native](https://ionicframework.com/docs/native/broadcaster/)

Currently This project support Cordova platform **Browser** and **Android**. (**IOS** coming soon)

## Requirements

I've Used

### Node 
item   | version | note
 --- | -- | --
Node | `12.16.1`
npm  | `6.13.4`

### Cordova 

item   | version | note
 --- | -- | --
cordova dist | `7.1.0` | _local to project_
ordova android engine | `8.0.0` | 
cordova ios engine | `4.5.5` |
cordova browser engine | `5.0.4` |

### Ionic

item   | version | note
 --- | -- | --
ionic cli | `3.20.1`| _local to project_
ionic native | `4.4.0`|

## Getting Started

1. Clone Project
2. Run `npm install`

## Browser Platform

1. Run `ionic cordova platform add browser`
2. Run `ionic cordova build browser`
1. Run `ionic cordova run browser`

## Android Platform

1. Run `ionic cordova platform add android@8.0.0`
2. Run `ionic cordova build android`
1. Run `ionic cordova run android`

## IOS Platform

1. Run `ionic cordova platform add ios`
2. Run `ionic cordova build ios`
1. Run `ionic cordova run ios`
