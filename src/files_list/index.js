import onClick from './on_click';
import getData from './firebase_get_data';
import { UserClass } from '../auth/user';
require('./style.scss');


export default {
    el:'#main',
    template: require('./template.html'),
    afterBind: () =>{
        //Pega o usuário logado para consultar somente aquilo que for dele
        let userInstance = new UserClass();

        getData({
            id: '/files/'+userInstance.user.uid,
            title: 'home'
        })

        onClick();      
        
    },
    
}