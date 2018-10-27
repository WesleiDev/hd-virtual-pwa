import { app } from '../firebase';
import { UserClass } from '../auth/user';

export default function(value){
    const sha1 = require('js-sha1');

    console.log(sha1(value))
    let ref = app.database().ref('/sharer/'+sha1(value));

    ref.once('value', (snapshot) =>{
        if(snapshot.val()){
            const userInstance = new UserClass();
           let ref2 = app.database().ref('/shared/'+snapshot.val()+'/'+userInstance.user.uid)
           ref2.set({
               uid: userInstance.user.uid,
               email: userInstance.user.email
           })
        }else{
            alert('E-mail não cadastrado')
        }
    })
}