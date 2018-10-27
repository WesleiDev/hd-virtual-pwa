import  templateComponent  from './template'
import  uploaderComponent  from './uploader'
import  authComponent      from './auth';


const components = [
    templateComponent,
    uploaderComponent,
    authComponent
]

class Init{
    constructor(){
        components.forEach((component) =>{
            if(component.el){
                let element = document.querySelector(component.el);
                element.innerHTML =  component.template;
            }        
            component.afterBind();
        })

        //Registra o service worker somente se estivem em ambiente de dev, comforme configuração
        //do webpack.prod.config.js e packge.json (npm run build)
        if(process.env.NODE_ENV === 'production'){
            this.registerSw();
        }
    }

    registerSw(){
    if('serviceWorker' in navigator){
        navigator.serviceWorker.register('./service-worker.js')
    }


}

}

new Init();