const EventEmitter = require('events');

class ChatApp extends EventEmitter {
    /**
     * @param {String} title
     */
    constructor(title) {
        super();

        this.title = title;

        // Посылать каждую секунду сообщение
        setInterval(() => {
            this.emit('message', `${this.title}: ping-pong`);
        }, 3000);
    }
    close (){
        this.emit('close');
    }
}

let webinarChat =  new ChatApp('webinar');
let facebookChat = new ChatApp('=========facebook');
let vkChat =       new ChatApp('---------vk');

let chatOnMessage = (message) => {
    console.log(message);
};

let answerPrep = function (message) {
    console.log(message + ' Готовлюсь к ответу');
};
let onClose = function () {
    console.log(message + 'Чат вконтакте закрылся :(');
};

webinarChat.on('message', chatOnMessage);
webinarChat.on('message', answerPrep);
facebookChat.on('message', chatOnMessage);
vkChat.on('message', chatOnMessage);
vkChat.setMaxListeners(2);
vkChat.on('message', answerPrep);
vkChat.on('message', onClose);

// Закрыть вконтакте
setTimeout( ()=> {
    //console.log('Закрываю вконтакте...');
    vkChat.close();
    vkChat.removeListener('message', chatOnMessage);
}, 10000 );


// Закрыть фейсбук
setTimeout( ()=> {
    console.log('Закрываю фейсбук, все внимание — вебинару!');
    facebookChat.removeListener('message', chatOnMessage);
}, 15000 );

//3.3  через 30 секунд отписывает chatOnMessage от вебинара webinarChat
setTimeout( ()=> {

    webinarChat.removeListener('message', chatOnMessage);
}, 30000 );