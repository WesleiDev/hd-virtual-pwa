import { app } from '../../firebase';
import getPath from './path';
import { UserClass } from '../../auth/user';


//Realiza o upload do arquivo para o firebase
export default function(file, name){
    let path = getPath();
    let realizouEnvio = false; 
    const storageRef =  app.storage().ref();

    let userInstance = new UserClass();

        let fileRef = storageRef.child('files/'+userInstance.user.uid+'/'+path+ name);
        fileRef.put(file)        
        .then((snapshot) =>{  
        
            snapshot.ref.getDownloadURL().then(function(downloadURL){
                if(!realizouEnvio){
                    let folderRef = app.database().ref('files/'+userInstance.user.uid+''+path);
                    folderRef.push({
                        title: name,
                        type: 'file',
                        url: downloadURL,
                        size : snapshot.totalBytes
                    })

                    realizouEnvio = true;

                    let userRef = app.database().ref('/users/'+userInstance.user.uid+'/usage');

                    userRef.once('value', (snapshot) => {
                        let size = snapshot.val() || 0;
                        userRef.set(totalBytes + size);
                    }, err => console.log(err))
                    
                }
                
            })

            let totalBytes = snapshot.totalBytes;
              
        }).catch((err) =>{
            console.log('Erro ao realizar upload de arquivo: ', err)
        })

}