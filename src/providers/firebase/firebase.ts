import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import 'rxjs/add/operator/map';
import {ShoppingItem} from '../../interfaces/ShoppingItems';

/*
  Generated class for the FirebaseProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
  nadun@gmail.com 12345678
  nadun2@gmail.com 12345678
*/

@Injectable()
export class FirebaseProvider {
 
  constructor(public afs: AngularFirestore) { }
 
  getShoppingItems() {
    // return this.afd.list('/shoppingItems/');
    return this.afs.collection<ShoppingItem>('shoppingItems');
  }
 
  addItem(nameOf) {
    // this.afd.list('/shoppingItems/').push(name);
    this.afs.collection<ShoppingItem>('shoppingItems').add({
      name: nameOf,
      }).then((added)=>{
      console.log(added.id);
      }).catch((e)=>{
      console.log("Error",e);
      })
  }
 
  removeItem(id) {
    this.afs.collection<ShoppingItem>('shoppingItems').doc(id).delete();
  }
}
