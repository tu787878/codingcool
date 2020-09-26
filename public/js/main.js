const socket = io('localhost:3000');
// var socket = io("https://ecoder.herokuapp.com/");
$('#div-chat').hide();
var json = {};
let customConfig;

var tenMoi;
socket.on('DANH_SACH_ONLINE', arrUserInfo => {
    tenMoi = arrUserInfo;
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
            localStream.getAudioTracks()[0].enabled = false;
        if(test == true){
            // playStream2(stream);
        }
           test = false; 
           
        const call = peer.call(user.peerId, stream);
   
        call.on('stream', remoteStream => {
            playStream('remoteStream' + user.peerId, remoteStream, user.ten)
        
        });
});
});

socket.on('AI_DO_NGAT_KET_NOI', peerId => {
    var id = '.remoteStream' + peerId;
    $(id).remove();
    var id2 = '.nameOfremoteStream' + peerId;
    $(id2).remove();
});

function openStream() {
    const config = { audio: true, video: false };
    return navigator.mediaDevices.getUserMedia(config);
}

function playStream(idVideoTag, stream,ten) {
    $('#div-chat').append('<video onwaiting="videoPlaying()" class = "videoxxx ' + idVideoTag + '" id = "'+ idVideoTag +'"></video>  <br /><br />');
    $('#components_menu').append(`<li class="sidebar-menu-item ` + idVideoTag + `">
    <div class="sidebar-menu-button xx" href="ui-buttons.html">
        <i class="sidebar-menu-icon sidebar-menu-icon--left material-icons">mouse</i>
        <span class="sidebar-menu-text">`+ ten +`</span><i class="voice fas fa-microphone-alt click"></i><i id="off`+idVideoTag+`" onClick="offVolume('`+ idVideoTag +`')" class="voice fas fa-volume-mute mute-click"></i><i id="on`+idVideoTag+`" onClick="onVolume('`+ idVideoTag +`')" style="color:aqua;" class="voice fas fa-volume-up"></i>
    </div>
</li>`);
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

    socket.emit('NGUOI_DUNG_DANG_KY', { ten: username, peerId: id});

});
var test = true;
//Callee
peer.on('call', call => {
    

  
    openStream()
    .then(stream => { 
        localStream = stream;
        localStream.getAudioTracks()[0].enabled = false;
        if(test == true){
            // playStream2(stream);
        }
        console.log(call)
        call.answer(stream);
        call.on('stream', remoteStream => playStream('remoteStream' + call.peer, remoteStream, tenMoi[call.peer]));
        test = false;
    });
    
});


function offVolume(id) {
    console.log("off" + id)
    var video = document.getElementById(id);
    console.log(video.muted = true);
    var idx = "#on" + id;
    $(idx).css("color","grey");
    idx = "#off" + id;
    $(idx).css("color","aqua");

}
function onVolume(id) {
    console.log("on" + id)
    var video = document.getElementById(id);
    console.log(video.muted = false);
    var idx = "#off" + id;
    $(idx).css("color","grey");
    idx = "#on" + id;
    $(idx).css("color","aqua");

}

function onMicro(){
    console.log("onMicro")
    localStream.getAudioTracks()[0].enabled = true;
    $('#onMicro').css("color","aqua");
    $('#offMicro').css("color","grey");

}
function offMicro(){
    console.log("offMicro")
    localStream.getAudioTracks()[0].enabled = false;
    $('#onMicro').css("color","grey");
    $('#offMicro').css("color","aqua");
}

function videoPlaying(){
    console.log("play")
}