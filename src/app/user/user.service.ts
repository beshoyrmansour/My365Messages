import { environment } from './../../environments/environment.prod';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { AuthService } from './../auth/auth.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { message } from './../shared/models/meesage.model';
import { user } from '../shared/models/user.model';
import * as firebase from 'firebase';

@Injectable()
export class UserService {
  public messageCollection: AngularFirestoreCollection<message>;
  public messageDocument: AngularFirestoreDocument<message>;
  userMessages: message[];
  userData: user;
  userID: string;
  userBackgrounds = [];
  isDefault: boolean;
  constructor(
    private authService: AuthService,
    private afs: AngularFirestore
  ) {
    this.afs.collection('users', ref => ref.where('email', '==', localStorage.getItem('email'))).snapshotChanges()
      .map((actions) => {
        return actions.map(a => {
          const data = a.payload.doc.data() as user;
          const id = a.payload.doc.id;
          console.log('ID', id);
          this.userID = id;
          return { id, ...data };
        });
      }).subscribe((user) => {
        this.userData = user[0];
        console.log('constructor subscribe userData', this.userData);
        this.afs.collection('messages', ref => ref.where('sender', '==', this.userData.id)).snapshotChanges()
          .map((actions) => {
            return actions.map(a => {
              const data = a.payload.doc.data() as user;
              const id = a.payload.doc.id;
              return { id, ...data };
            });
          });
      });
    firebase.initializeApp(environment.firebase)
  }

  getUserData() {
    return this.userData;
  }

  getUserMessages() {
    console.log('this.userData.id', this.userData.id);
    this.messageCollection = this.afs.collection<message>('messages', ref => ref.where('sender', '==', this.userData.id));
    return this.messageCollection.snapshotChanges().map((actions) => {
      return actions.map(a => {
        const data = a.payload.doc.data() as user;
        const id = a.payload.doc.id;
        return { id, ...data };
      });
    });
  }

  updateUserData() {
    console.log('updating User Data with ID :', this.userData.id);
    return this.afs.collection('users').doc(this.userData.id).update(this.userData).then(() => {

    });
  }

  postBackgrounds(file: File) {
    console.log('file uploading ...');
    // console.log(file);
    return firebase.storage().ref(this.userData.id + '/').child(file.name).put(file).then(() => {
      console.log('file uploaded successfuly');
      this.userData.userBackgrounds.push(file.name)
      return this.afs.collection('users').doc(this.userData.id).update(this.userData);
    });
  }

  getBackgrounds() {
    this.userBackgrounds = [];
    let loop = false;
    if (this.userData.userBackgrounds) {
      for (const imgName in this.userData.userBackgrounds) {
        if (this.userData.userBackgrounds.hasOwnProperty(imgName)) {
          firebase.storage().ref(this.userData.id + '/').child(this.userData.userBackgrounds[imgName]).getDownloadURL().then((url) => {
            this.userBackgrounds[imgName] = url;
            console.log('userData Bacground URL #', imgName, ':', this.userData.userBackgrounds[imgName]);
          }).catch((err) => {
            alert('Error : ' + err.message);
          });
        }
      }
      this.isDefault = false;
      return Observable.of(this.userBackgrounds);
    } else {
      /* get the default bacground */
      firebase.storage().ref('def-bg.svg').getDownloadURL().then((url) => {
        this.isDefault = true;
        this.userBackgrounds[0] = url;
      }).catch((err) => {
        alert('Error :' + err.message);
      })
    }
  }

  deletBackground(id: number) {
    const imgName = this.userData.userBackgrounds[id];
    return firebase.storage().ref(this.userData.id + '/').child(imgName).delete().then(() => {
      this.userData.userBackgrounds.splice(id, 1);
      this.userBackgrounds.splice(id, 1);
      this.updateUserData().then(() => {
        alert('Image ' + imgName + ' #' + id + ' deleted sucssefuly');
      })
    });
  }

  saveMessages(newMessage: message) {
    return this.messageCollection.add(newMessage);
  }

  deleteMessage(messageId) {
    return this.messageCollection.doc(messageId).delete();
  }
  editMessage(newContent, messageIndex) {
    this.messageDocument = this.messageCollection.doc(messageIndex);
    console.log('this.messageDocument', this.messageDocument);
    console.log('newContent', newContent);

    // return this.messageDocument.update(newContent)
  }
}