
export default function(snapshot){
    
    let data = snapshot.val()

    data = Object.entries(data);

    let partial = require('./partial.html');
    

    //Ordenação dos arquivos
    data.sort((a, b) => {
        if(typeof a[1] != 'object'){
            return false;
        }
        return a[1].title.localeCompare(b[1].title)
    })

    //Ordenação das pastas
    data.sort((a, b) => {
        if(typeof a[1] != 'object'){
            return false;
        }
        return a[1].type < b[1].type;
    })

    

    let html = "";
    for(let index in data){
        if(typeof data[index][1] != 'object'){
            continue;
        }

        html += partial
        .replace(/{{ title }}/g, data[index][1].title)
        .replace(/{{ type }}/g, data[index][1].type)
        .replace(/{{ fid }}/g, data[index][0]);
    }

    document.querySelector('#main .files').innerHTML = html;
     
}