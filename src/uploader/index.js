import file from './file';

export default {
    el: '#footer',
    template: require('./template.html'),
    afterBind(){
        let btnCollection = document.querySelectorAll('#footer a');

        btnCollection.forEach((btn) => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                let element = e.target;
                if(element.tagName == "I"){
                    element = e.target.parentElement;
                }

                if(element.tagName == 'A'){
                    switch(element.dataset.uploadType){
                        case 'file':
                            file();
                            break;
                        case 'folder':
                            console.log('Cria diretório')
                            break;
                        case 'photo':
                            console.log('Tira foto')
                            break;
                        case 'audio':
                            console.log('Grava audio')
                            break;
                        case 'note':
                            console.log('Cria anotação')
                            break;
                    }
                }
            })
        })
    }
}