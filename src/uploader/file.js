import { app } from '../firebase';
import { foldersPath } from '../files_list/firebase_get_data';

export default function(){
    let path = "/";

    foldersPath.forEach((item, key) =>{
        if(key > 0){
            path += item.id + '/'
        }
    })

    console.log(path)
    let fileInput = document.getElementById('file');
    fileInput.click();

    fileInput.addEventListener('change', function(e){
        console.log(e.target.files[0])

        const storageRef =  app.storage().ref();
        let fileRef = storageRef.child('files/1/'+path+ e.target.files[0].name);
        fileRef.put(fileInput.files[0])
        .then((snapshot) =>{
            let folderRef = app.database().ref('files/1'+path);
            folderRef.push({
                title: fileInput.files[0].name,
                type: 'file',
                url: 'sdsd'
            })
                console.log(snapshot);
        }).catch((err) =>{
            console.log('Erro ao realizar upload de arquivo: ', err)
        })

    })

}