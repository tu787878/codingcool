var silent = false;
var socket = io("http://localhost:3000");
var editor = ace.edit("editor");
var userLast="";
socket.emit('join',{id:<%=data[0].id%>,user:'<%=user%>'});
// socket.on('add',data => {
//   data.allUser.push(data.user);
//   console.log(data.allUser);
//   socket.emit('ok',)
// });
// editor.setTheme("ace/theme/vala");
// editor.getSession().setMode("ace/mode/javascript");

  editor.getSession().on('change', function () {
    if (silent) return "d";
    editor.find(userLast);
    editor.replace("");
    var data = editor.getSession().getValue();
    var ll = $('#lang').val();
    console.log("change");
    socket.emit('haha', {id: <%=data[0].id%>,data: data,user:'<%=user%>',lang: ll});

});
$("#lang").val("<%=data[0].lang%>");
$( "#lang" )
  .change(function () {
    var value = $(this).val();
    console.log(value);
    editor.getSession().setMode("ace/mode/" + value);
  })
  .change();
$( "#size" )
    .change(function () {
      var value = $(this).val();
      console.log(value);
      document.getElementById('editor').style.fontSize= value + 'px';
    })
    .change();
$( "#them" )
      .change(function () {
        var value = $(this).val();
        console.log(value);
        editor.setTheme("ace/theme/" + value);
      })
      .change();
// socket.on('dataOld', old => {
//   silent = true;
//   console.log(old[0].data);
//   editor.getSession().setValue(old[0].data.data);
//   silent = false;
// })
socket.on('nes', data => {
 console.log("data ne");
 console.log(data);
 var val = $('#lang').val();
 var cmt = "", cmt2 = "";
 switch (val) {
   case "html": cmt = "<!--";
   cmt2 = "-->";
     break;
     case "javascript": cmt = "//";
     cmt2 = "";
     break;
     case "c_cpp"  : cmt = "//";
     cmt2 = "";
     break;
     case "csharp": cmt = "/*";
     cmt2 = "*/";
     break;
     case "java": cmt = "/*";
     cmt2 = "*/";
     break;
     case "php"  : cmt = "//";
     cmt2 = "";
     break;
     case "python"  : cmt = "#";
     cmt2 = "";
     break;
   default:

 }
 silent = true;
 userLast = "\n " + cmt + data.name + " is coding..." + cmt2;
 editor.getSession().setValue(data.dt.data + userLast);
 editor.$blockScrolling = 1;
 silent = false;
 // editor.clearSelection();
});
