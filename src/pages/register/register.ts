import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from "../../models/user";
import { AngularFireAuth } from "angularfire2/auth";
import { AngularFireDatabase } from 'angularfire2/database-deprecated';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  user = {} as User;

  constructor(private afAuth: AngularFireAuth, private adDB: AngularFireDatabase,
    public navCtrl: NavController, public navParams: NavParams) {
  }

  async register(user: User) {
    try {
      const result = await this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password);
      const fResult = await this.adDB.database.ref('/users').child(result.uid).set({ email: user.email });    
      console.log(fResult);
    }
    catch (e) {
      console.error(e);
    }
  }
}
