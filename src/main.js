import { app } from './firebase';

class Init{
    constructor(){
        let component = require('./template/')
        let elementApp = document.getElementById('app');
        elementApp.innerHTML =  component.template;
        component.action();

        console.log(app)
    }


}

new Init();