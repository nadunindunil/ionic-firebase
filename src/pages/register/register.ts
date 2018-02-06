import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from "../../models/user";
import { AngularFireAuth } from "angularfire2/auth";
import { AngularFirestore } from 'angularfire2/firestore';


@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  user = {} as User;

  constructor(private afAuth: AngularFireAuth, public afs: AngularFirestore,
    public navCtrl: NavController, public navParams: NavParams) {
  }

  async register(user: User) {
    try {
      const result = await this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password);

      const data: any = {
        uid: result.uid,
        email: user.email
      }

      const finResult = await this.afs.doc(`users/${data.uid}`).set(data);

      // const fResult = await this.afs.database.ref('/users').child(result.uid).set({ email: user.email });    
      console.log(finResult);
    }
    catch (e) {
      console.error(e);
    }
  }
}
