import { app } from '../firebase';
import { foldersPath } from '../files_list/firebase_get_data';

export default function(){
    let path = "/";

    foldersPath.forEach((item, key) =>{
        if(key > 0){
            path += item.id + '/'
        }
    })

    console.log(app)
    console.log(path)
    let fileInput = document.getElementById('file');
    fileInput.click();

    //esta variavel urlDownload foi para corrigir um bug do firebase que não consegui resolver
    let urlDownload = ""; 
    let uploadFile = function(e){
        const storageRef =  app.storage().ref();
        let fileRef = storageRef.child('files/1/'+path+ e.target.files[0].name);
        let uploadTask = fileRef.put(fileInput.files[0])
        
        .then((snapshot) =>{
            urlDownload = "";
      
            snapshot.ref.getDownloadURL().then(function(downloadURL){
                if(urlDownload !== downloadURL){
                    let folderRef = app.database().ref('files/1'+path);
                    folderRef.push({
                        title: fileInput.files[0].name,
                        type: 'file',
                        url: downloadURL
                    })

                    urlDownload = downloadURL;
                    console.log(downloadURL)
                }
                
            })
              
        }).catch((err) =>{
            console.log('Erro ao realizar upload de arquivo: ', err)
        })

        
    }

    fileInput.addEventListener('change', uploadFile)


}