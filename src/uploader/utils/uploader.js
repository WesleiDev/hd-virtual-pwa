import { app } from '../../firebase';
import getPath from './path';


//Realiza o upload do arquivo para o firebase
export default function(file, name){
    let path = getPath();
    let realizouEnvio = false; 
    const storageRef =  app.storage().ref();
        let fileRef = storageRef.child('files/1/'+path+ name);
        let uploadTask = fileRef.put(file)        
        .then((snapshot) =>{      
            snapshot.ref.getDownloadURL().then(function(downloadURL){
                if(!realizouEnvio){
                    let folderRef = app.database().ref('files/1'+path);
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