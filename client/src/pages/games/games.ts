import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { Http } from '@angular/http';
import { API_URL } from '../url';
import { User } from '../../providers/providers';

/**
 * Generated class for the GamesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-games',
  templateUrl: 'games.html',
})
export class GamesPage {
  games: any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, public user: User, public events: Events) {
    console.log("the nav params is ");
    console.log(navParams.data.games);
    if (typeof navParams.data.games === 'undefined') {
      this.http.get(API_URL + '/games').map(res => res.json()).subscribe(
        data => {
          this.games = data.data;
          console.log("now logging");
          console.log(data.data);
        },
        err => {
          console.log("Oops!");
          console.log(err);
        }
      );
    } else if (navParams.data.games == true) {
      this.games = navParams.data.games.data;
    }

    events.subscribe('refresh', () => {
      this.http.get(API_URL + '/games').map(res => res.json()).subscribe(
        data => {
          this.games = data.data;
          console.log("now logging");
          console.log(data.data);
        },
        err => {
          console.log("Oops!");
          console.log(err);
        }
      );
    });
  }

  gameInfo(gameTitle) {
    console.log("In games.ts the title is " + gameTitle);
    this.navCtrl.push('GameInfoPage', {
      gameTitle: gameTitle
    });
  }

  addGame() {
    this.navCtrl.push('GameCreatePage', {
      currentActionDescription: "Add a game",
      currentAction: "addingGame"
    });
  }

  searchGame() {
    this.navCtrl.push('SearchPage');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GamesPage');
    if (this.navParams.data.games) this.games = this.navParams.data.games.data;

  }

}
