import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { FirebaseProvider } from './../../providers/firebase/firebase';
import { Observable } from 'rxjs/Observable';
import { ShoppingItem } from '../../interfaces/ShoppingItems';


@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  newItem = '';
  shoppingItems: Observable<ShoppingItem[]>;
  
  constructor(private afAuth: AngularFireAuth, private toast: ToastController,
    public navCtrl: NavController, public navParams: NavParams,public firebaseProvider: FirebaseProvider) {

      this.shoppingItems = this.firebaseProvider.getShoppingItems().snapshotChanges().map(actions => {
        return actions.map(action => {
          const data = action.payload.doc.data() as ShoppingItem;
          const id = action.payload.doc.id;
          console.log({ id, ...data });
          return { id, ...data };
        });
      });

      console.log(this.shoppingItems);
    }

  ionViewWillLoad() {
    this.afAuth.authState.subscribe(data => {
      if (data && data.email && data.uid) {
        this.toast.create({
          message: `Welcome to APP_NAME, ${data.email}`,
          duration: 3000
        }).present();
      }
      else {
        this.toast.create({
          message: `Could not find authentication details.`,
          duration: 3000
        }).present();
      }
    })
  }

  addItem() {
    this.firebaseProvider.addItem(this.newItem);
  }
 
  removeItem(id) {
    this.firebaseProvider.removeItem(id);
  }
}
