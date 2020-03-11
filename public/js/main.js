// const socket = io('localhost:3000');
var socket = io("https://vantuproject.herokuapp.com/");
$('#div-chat').hide();

let customConfig;


socket.on('DANH_SACH_ONLINE', arrUserInfo => {

});

socket.on('DANG_KY_THAT_BAT', () => {

});
var test = true;
socket.on('CO_NGUOI_DUNG_MOI', user => {
    const { ten, peerId } = user;
    console.log("tennnn");
    console.log(ten);
    // $('#ulUser').append(`<li id="${peerId}">${ten}</li>`);
    openStream()
        .then(stream => {
        if(test == true){
            playStream2(stream);
        }
           test = false; 
           
        const call = peer.call(user.peerId, stream);
        console.log(user.ten);
        call.on('stream', remoteStream => playStream('remoteStream' + user.peerId, remoteStream));
});
});

socket.on('AI_DO_NGAT_KET_NOI', peerId => {
    var id = '#remoteStream' + peerId;
    $(id).remove();
    var id2 = '#nameOfremoteStream' + peerId;
    $(id2).remove();
});

function openStream() {
    const config = { audio: true, video: false };
    return navigator.mediaDevices.getUserMedia(config);
}

function playStream(idVideoTag, stream) {
    $('#div-chat').append('<video class = "videoxxx" id="' + idVideoTag + '" controls></video>  <br /><br />');
    const audio = document.getElementById(idVideoTag);
    audio.srcObject = stream;
    audio.play();
}
function playStream2(stream) {
    console.log("pl222");
    const audio = document.getElementById('myLocalVideo');
    audio.srcObject = stream;
    audio.play();
}


// openStream()
// .then(stream => playStream('localStream', stream));

const peer = new Peer({ 
    key: 'lwjd5qra8257b9',
});

peer.on('open', id => {
    console.log(id);
    $('#my-peer').append(id);
    const username = nameOfUser;
    //console.log(nameOfUser);
    socket.emit('NGUOI_DUNG_DANG_KY', { ten: username, peerId: id });

});
var test = true;
//Callee
peer.on('call', call => {
   // console.log("data of call");
    //console.log(call.peer);
  
    openStream()
    .then(stream => { 
        if(test == true){
            playStream2(stream);
        }
        call.answer(stream);
        call.on('stream', remoteStream => playStream('remoteStream' + call.peer, remoteStream));
        test = false;
    });
    
});
