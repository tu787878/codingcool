// const socket = io('localhost:3000');
var socket = io("https://vantuproject.herokuapp.com/");
$('#div-chat').hide();

let customConfig;


socket.on('DANH_SACH_ONLINE', arrUserInfo => {

});

socket.on('DANG_KY_THAT_BAT', () => {

});
var localStream;
var test = true;
socket.on('CO_NGUOI_DUNG_MOI', user => {
    const { ten, peerId } = user;
    // $('#ulUser').append(`<li id="${peerId}">${ten}</li>`);
    openStream()
        .then(stream => {
            localStream = stream;
        if(test == true){
            // playStream2(stream);
        }
           test = false; 
           
        const call = peer.call(user.peerId, stream);
   
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
  
    $('#my-peer').append(id);
    const username = nameOfUser;
  
    socket.emit('NGUOI_DUNG_DANG_KY', { ten: username, peerId: id });

});
var test = true;
//Callee
peer.on('call', call => {

  
    openStream()
    .then(stream => { 
        localStream = stream;
        if(test == true){
            // playStream2(stream);
        }
        call.answer(stream);
        call.on('stream', remoteStream => playStream('remoteStream' + call.peer, remoteStream));
        test = false;
    });
    
});
