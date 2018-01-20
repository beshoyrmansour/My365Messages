import { environment } from './../../environments/environment.prod';
import { AngularFirestore } from 'angularfire2/firestore';
import { AuthService } from './../auth/auth.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { message } from './../shared/models/meesage.model';
import { user } from '../shared/models/user.model';
import * as firebase from 'firebase';

@Injectable()
export class UserService {

  userMessages: message[];
  userData: user;
  userBackgrounds = [];
  constructor(
    private authService: AuthService,
    private afs: AngularFirestore,

  ) {
    this.afs.collection('users', ref => ref.where('email', '==', localStorage.getItem('email'))).snapshotChanges()
      .map((actions) => {
        return actions.map(a => {
          const data = a.payload.doc.data() as user;
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      }).subscribe((user) => {
        this.userData = user[0];
        this.afs.collection('messages', ref => ref.where('sender', '==', this.userData.id)).snapshotChanges()
          .map((actions) => {
            return actions.map(a => {
              const data = a.payload.doc.data() as user;
              const id = a.payload.doc.id;
              return { id, ...data };
            });
          }).subscribe((messages: message[]) => {
            this.userMessages = messages
          });
      });
    firebase.initializeApp(environment.firebase)
  }

  getuserData() {
    return this.userData;
  }

  getUserMessages() {
    return this.userMessages;
  }

  updateBackgroundsNumber(flag: boolean) {

    return this.afs.collection('users').doc(this.userData.id).update(this.userData);
  }
  postBackgrounds(file: File) {
    console.log('file uploading ...');
    console.log(file);
    return firebase.storage().ref(this.userData.id + '/').child(file.name).put(file).then(() => {
      console.log('file uploaded successfuly');
      this.userData.userBackgrounds.push(file.name)
      return this.afs.collection('users').doc(this.userData.id).update(this.userData);
    });
    // return firebase.storage().ref(this.userData.id + '/').child((this.userData.backgroundNumber + 1) + '.jpeg').put(file).then(() => {
    //   console.log('file uploaded successfuly');
    //   this.updateBackgroundsNumber(true).then(() => {
    //     console.log('Backgrounds Number updated.');
    //   });
    // });
  }

  getBackgrounds() {
    console.log('getBackgrounds() .......');

    this.userBackgrounds = [];
    let loop = false;
    if (this.userData.userBackgrounds != ['']) {
      console.log('True', this.userData.userBackgrounds);
      for (const imgName in this.userData.userBackgrounds) {
        if (this.userData.userBackgrounds.hasOwnProperty(imgName)) {
          const element = this.userData.userBackgrounds[imgName];
          firebase.storage().ref(this.userData.id + '/').child(element).getDownloadURL().then((url) => {
            this.userData.userBackgrounds[imgName] = url;
          }).catch((err) => {
            console.log('Error :', err);
          });
        }
      }

      return Observable.of(this.userBackgrounds);
    } else {
      firebase.storage().ref('def-bg.svg').getDownloadURL().then((url) => {
        console.log(url);
        this.userBackgrounds = url;
      }).catch((err) => {
        console.log('Error :', err);
      })
    }
  }
  deletBackground(id: number) {
    return firebase.storage().ref(this.userData.id + '/').child((id + 1) + '.jpeg').delete().then(() => {
      console.log('image number ' + id + 'deleted');
      // if (id < this.userData.backgroundNumber) {
      //   for (let index = id; index < this.userData.backgroundNumber; index++) {
      //     console.log('index: ' + index);
      //     firebase.storage().ref(this.userData.id + '/').child((index + 1) + '.jpeg').getDownloadURL().then((ref) => {
      //       console.log('adding next img...');
      //       firebase.storage().ref(this.userData.id + '/').child((index - 1) + '.jpeg').put(ref).then(() => {
      //         console.log('deleting old img...');

      //         firebase.storage().ref(this.userData.id + '/').child((index + 1) + '.jpeg').delete();
      //       })
      //     })
      //   }
      // }
      // this.updateBackgroundsNumber(false).then(() => {
      //   console.log('Backgrounds Number updated.');
      //   this.getBackgrounds();
      // });
    })
  }
}
