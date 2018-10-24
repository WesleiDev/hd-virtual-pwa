import uploader from './utils/uploader';
let streamAudio;
let recorder;

const audioRecorder = () =>{
    recorder = new MediaRecorder(streamAudio);
    let chuncks = [];
    //Vai salvando os pedaços da gravação
    recorder.ondataavailable = (event) =>{
        chuncks.push(event.data)
    }

    //salva a gravação em Blob para enviar para o firebase
    recorder.onstop = () =>{
        let blob = new Blob(chuncks, {type:'video/webm'});
        chuncks = [];

        let name = Math.random().toString(36).substring(2);
        name += '.ogg';
        uploader(blob, name);
    }

    recorder.start();
}

export default function(){
    if(streamAudio){
        recorder.stop();
        streamAudio.getTracks()[0].stop();
        console.log('Parando audio')
        streamAudio = null;
    }else{
        let config = {
            video: false,
            audio: true
        }
    
        let success  = function(stream){
            streamAudio = stream;
            audioRecorder();
            console.log('Reproduzindo audio')
        }
    
        navigator.getUserMedia(config, success, (err) => console.log(err))
    }
    
}