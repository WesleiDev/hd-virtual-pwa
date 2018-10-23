import getData from './firebase_get_data';

export default function(){
    let onClick = (e) => {
        e.preventDefault();

        let element = e.target;

        if(e.target.tagName == "I"){
            element = e.target.parentElement;
        }

        if(element.tagName == "A"){
            if(element.dataset.type == 'folder-open'){
                console.log('files/1/'+element.dataset.fid);
                getData({
                    id:element.dataset.fid,
                    title:element.dataset.title 
                })
            }else{
                let link = document.createElement('A');
                link.setAttribute('href', element.getAttribute('href'));
                link.setAttribute('target', '_blank');
                link.click();
                
            }
            

        }
        console.log(e.target.tagName);
    }
    document.querySelector('#main').addEventListener('click', onClick);
}