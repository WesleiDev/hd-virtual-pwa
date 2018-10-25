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
                        url: downloadURL
                    })

                    realizouEnvio = true;
                    
                }
                
            })
              
        }).catch((err) =>{
            console.log('Erro ao realizar upload de arquivo: ', err)
        })

}