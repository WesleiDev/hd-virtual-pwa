import { app } from '../firebase';
import getPath from './utils/path';

export default function(){
    let path = getPath();
    let dirname = prompt('Qual o nome do novo diretório', 'Minha pasta');
    if(dirname == null || dirname == ''){
        return;
    }

    let folderRef = app.database().ref('files/1'+path);
    folderRef.push({
        type: 'folder-open',
        title: dirname
    })
    console.log(dirname);   
}