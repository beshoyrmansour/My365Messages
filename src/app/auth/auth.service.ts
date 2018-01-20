import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { user } from '../shared/models/user.model';
import { AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore } from 'angularfire2/firestore';
import { promise } from 'selenium-webdriver';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable()
export class AuthService {
  public users: Observable<user[]>;
  public user: user;
  securityQuestion: string = '';
  securityAnswer: string = '';
  firebaseAuthUser = {};
  public userCollection: AngularFirestoreCollection<user>;
  public userDocument: AngularFirestoreDocument<user>;
  constructor(private afs: AngularFirestore,
    private afAuth: AngularFireAuth,
  ) {
    this.userCollection = this.afs.collection<user>('users', ref => ref.orderBy('username', 'asc'))
    this.users = this.userCollection.snapshotChanges().map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as user;
        const id = a.payload.doc.id;
        return { id, ...data };
      });
    });
  }
  signup(user: user, password) {
    if (user) {
      const promise = new Promise((resolve, reject) => {
        this.afAuth.auth.createUserWithEmailAndPassword(user.email, password).then(() => {
          console.log('AuthService signup createUserWithEmailAndPassword then is fired');
          let res = this.userCollection.add(user);
          console.log('AuthService signup then createUserWithEmailAndPassword Add to user collection ==> : ', res);
          this.afAuth.auth.onAuthStateChanged(fireUser => {
            console.log('AuthService signup catch createUserWithEmailAndPassword then onAuthStateChanged fireUser ==> : ', fireUser);
            this.login(user.email, password);
          })
          resolve();
        }).catch((err) => {
          console.log('AuthService signup createUserWithEmailAndPassword catch ==> : ', err);
          reject(err);
        })
      })
      return promise;
    }
  }
  login(email: string, password: string) {
    const promise = new Promise((resolve, reject) => {
      this.afAuth.auth.signInWithEmailAndPassword(email, password).then(
        response => {
          this.afAuth.auth.currentUser.getToken()
            .then((token: string) => {
              localStorage.setItem('token', token);
              localStorage.setItem('email', email);
              this.afAuth.auth.onAuthStateChanged(fireUser => {
                localStorage.setItem('uid', fireUser.uid);
                localStorage.setItem('G', fireUser['G']);
                this.firebaseAuthUser = fireUser;
              })
              resolve();
            });
        }
      ).catch(error => {
        console.log('AuthService login signInWithEmailAndPassword catch The entire Error : ', error);
        alert('there is a problem !: ' + error.message);
        reject(error);
      }
        );
    });
    return promise;
  }
  loadForgetPassword(senderEmail: string) {
    console.log('loadForgetPassword is Fied with email : ' + senderEmail);
    // return this.afs.collection("users", ref => ref.where('email', '==', senderEmail)).valueChanges()

    let promise = new Promise((resolve, reject) => {
      this.afs.collection("users", ref => ref.where('email', '==', senderEmail)).valueChanges().subscribe((user) => {
        if (user.length) {
          resolve(user);
          this.securityQuestion = user[0]['securityQuestion']
          this.securityAnswer = user[0]['securityAnswer']
          console.log('security Question : ', user[0]['securityQuestion'], 'securityAnswer : ', user[0]['securityAnswer']);
        } else {
          reject("No User found with this Email");
        }
      })
    });
    return promise;
  }

  logout() {
    this.afAuth.auth.signOut();
    localStorage.clear();
  }

  changePassword(newPassword: string) {
    // this.afAuth.auth.updatePassword(newPassword).then(function () {
    //   // Update successful.
    //   console.log('password is updated successfully');
    // }).catch(function (error) {
    //   // An error happened.
    // });

    return this.afAuth.auth.sendPasswordResetEmail('beshoy.refky.mansour@gmail.com')
      .then(() => console.log("email sent"))
      .catch((error) => console.log(error))

  }

  sendRandomPassword() {
    // var user = this.fba.currentUser;
    // // this.fba.verifyPasswordResetCode('dsdsdsdsd');
    // var newPassword = this.fba.confirmPasswordReset(user.uid, 'beshoy')
  }
}
