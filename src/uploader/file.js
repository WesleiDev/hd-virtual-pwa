import { app } from '../firebase';
import getPath from './utils/path';

export default function(){
    let path = getPath();
    let fileInput = document.getElementById('file');
    fileInput.click();

    //esta variavel urlDownload foi para corrigir um bug do firebase que não consegui resolver
    let realizouDownload = false; 
    console.log('ANTES DO THEN')
    let uploadFile = function(e){
        const storageRef =  app.storage().ref();
        let fileRef = storageRef.child('files/1/'+path+ e.target.files[0].name);
        let uploadTask = fileRef.put(fileInput.files[0])
        
        .then((snapshot) =>{      
            snapshot.ref.getDownloadURL().then(function(downloadURL){
                if(!realizouDownload){
                    let folderRef = app.database().ref('files/1'+path);
                    folderRef.push({
                        title: fileInput.files[0].name,
                        type: 'file',
                        url: downloadURL
                    })

                    realizouDownload = true;
                    
                }
                
            })
              
        }).catch((err) =>{
            console.log('Erro ao realizar upload de arquivo: ', err)
        })

        
    }

    fileInput.addEventListener('change', uploadFile)


}