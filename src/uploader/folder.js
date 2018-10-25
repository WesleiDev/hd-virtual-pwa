import { app } from '../firebase';
import getPath from './utils/path';
import { UserClass } from '../auth/user'

export default function(){
    let path = getPath();
    let dirname = prompt('Qual o nome do novo diretório', 'Minha pasta');
    if(dirname == null || dirname == ''){
        return;
    }

    let userInstance = new UserClass();

    let folderRef = app.database().ref('files/'+userInstance.user.uid+'/'+path);
    folderRef.push({
        type: 'folder-open',
        title: dirname
    })
    console.log(dirname);   
}