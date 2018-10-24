import uploaderfrom from '../utils/uploader';
import uploader from '../utils/uploader';
require('./style.scss');

console.log('Arquivo carregado')


let element = document.querySelector('body');
element.className = 'drag';

const showDragAndDrop = (e) =>{
    e.preventDefault();
    let classCollection = element.className.split(' ');
    
    if(classCollection.indexOf('in-drag') == -1){
        classCollection.push('in-drag');
    }

    element.className = classCollection.join(' ');
}

const hideDragAndDrop = (e) =>{
    e.preventDefault();

    let classCollection = element.className.split(' ');
    let key = classCollection.indexOf('in-drag');

    if(key >= 0){
        classCollection.splice(key, 1);
    }

    element.className = classCollection.join(' ');
}

element.addEventListener('drop', (e) =>{
    hideDragAndDrop(e);
    console.log('Vai fazer upload')
    uploader(e.dataTransfer.files[0], e.dataTransfer.files[0].name)
});
element.addEventListener('dragover', showDragAndDrop);
element.addEventListener('dragleave', hideDragAndDrop);


