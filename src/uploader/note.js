import uploader from './utils/uploader';
require('./note/style.scss');

let template = document.createElement('template');
template.innerHTML = require('./note/template.html');
template = template.content.childNodes;
document.querySelector('body').appendChild(template[0])


document.getElementById('note-cancel').addEventListener('click', function(e){
    let noteModal = document.getElementById('note');
    e.preventDefault();
    noteModal.className = 'modal';
});

document.getElementById('note-save').addEventListener('click', function(e){
    e.preventDefault();
    let text = document.getElementById('note-text');
    let data = [text.value];
    //gerando um blob do arquivo texto
    let blob = new Blob(data, {encoding:'UTF-8',type: 'text/plain;charset=UTF-8'});

    let name = Math.random().toString().substring(2);
    name += '.txt';

    uploader(blob, name);
    document.getElementById('note-cancel').click();
    text.value = '';
})

export default function(){
    let noteModal = document.getElementById('note');
    noteModal.className = 'modal open';
}