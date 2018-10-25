import { app } from '../firebase';
import {authCreateEmail} from './auth/email';
import { UserClass } from './user';
import  fileListComponent from '../files_list'

let template = document.createElement('template');
template.innerHTML = require('./template.html');
template = template.content.childNodes;

document.querySelector('body').appendChild(template[0]);

export default {
    el:null,
    template: null,
    afterBind (){
        app.auth().onAuthStateChanged(function(user){
            if(user){
                const  userInstance = new UserClass();
                userInstance.user = user;
                
                let element = document.querySelector(fileListComponent.el);
                element.innerHTML =  fileListComponent.template;
                const auth = document.getElementById('auth');
                fileListComponent.afterBind();
                auth.className = 'modal'; 
                

            }else{
                const auth = document.getElementById('auth');
                auth.className = 'modal open'; 

                document.querySelector('#auth-email').addEventListener('click', function(e){
                    e.preventDefault();
                    console.log('Login')

                })

                document.querySelector('#auth-create-email').addEventListener('click', function(e){
                    e.preventDefault();
                    authCreateEmail()
                })
            }
        })
    }
}