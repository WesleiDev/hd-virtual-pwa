import { app } from '../firebase';
import uploader from './utils/uploader';


export default function(){
    
    let fileInput = document.getElementById('file');
    fileInput.click();

    //esta variavel urlDownload foi para corrigir um bug do firebase que não consegui resolver
    
    let uploadFile = function(e){
        uploader(fileInput.files[0], fileInput.files[0].name)        
    }

    fileInput.addEventListener('change', uploadFile)


}