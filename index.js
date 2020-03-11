const express = require("express");
const app = express();
var io = require("socket.io")(server);
var session = require("express-session");
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

var tam = true;

app.use(bodyParser.urlencoded({ extended: false }));


app.use(session({
  secret : 'tudc'
}));
//**********Login**********//

app.use(cookieParser());

//**********Started**********//
app.use(express.static("./public"));
app.set("view engine","ejs");
app.set("views","./views");



//**********Socket.io**********//
var server = require("http").Server(app);
var io = require("socket.io")(server);
server.listen(process.env.PORT || 3000);


//***********User*******//
var mysql = require('mysql');

// var db = mysql.createConnection({
//   host: "localhost",
//     user: "root",
//   password: "",
//   database: "dbs314838"
// });
var db = mysql.createConnection({
  host: "sql2.freemysqlhosting.net",
  user: "sql2327076",
  password: "qJ4%pB7%",
  database: "sql2327076"
});
function createDataCode(name, pass,member){
	return db.connect(function(err) {
  if (err) return err;
  console.log("Connected!");
  var sql = "INSERT INTO dataCode (nameCode, data, passWord, member) VALUES (?, ?, ?, ?)";
  return db.query(sql,[name,"//Hello World!",pass,member], function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
    result = JSON.parse(JSON.stringify(result));
    // console.log(result.insertId);
    return result.insertId;
  });
});
};
// createDataCode("dsdada", "dsadadad","dấdas");
function updateDataCode(id, data,lang){
  var sql = "UPDATE dataCode set data =?  WHERE id = ?";
  var sql2 = "UPDATE datacode set lang = ? WHERE id = ?"
  var query = db.query(sql, [data, id], function(err, result) {
    console.log("Record-1 Updated!!");
    // console.log(result);
});
var query2 = db.query(sql2, [lang, id], (err, result) => {
    console.log("Record-2 Updated!!");
});
};
function getDataCode(id, socket){
  var res;
  var sql = "SELECT * FROM dataCode WHERE id = ?";
  var query = db.query(sql,[id], (err, result) => {
    if(err) return console.error(err);
    // console.log(result);
    result = JSON.parse(JSON.stringify(result));
    socket.emit('dataOld',result);
  });
}


//**********Route**********//

app.get('/', (req,res) => {
  // res.cookie('name','tudaica').send('dsdamalkll');
  console.log(req.cookies.name);
  if(req.cookies.name) return res.render('homePage',{user:req.cookies.name});
  res.render('resiter',{id:0});
});
app.post('/',(req,res) => {
  console.log(req.body.name);
  var userName = req.body.name;
  res.cookie('name',userName);
  if(req.body.id != 0) return res.redirect('/coding/'+ req.body.id);
  res.render('homePage',{user:userName});
});
app.get('/newCode', (req,res) => {
  res.render('newCode', {user:req.cookies.name});
});
app.post('/newCode', (req,res) => {
  var name = req.body.name;
  var pass = req.body.pass;
  var member = req.body.mem;
  var lang = req.body.lang;

	db.connect(function(err) {
  if (err) return err;
  console.log("Connected!");
  var sql = "INSERT INTO dataCode (nameCode, data, passWord, member, lang) VALUES (?, ?, ?, ?, ?)";
  var helloworld = "";
  switch (lang) {
    case "c_cpp": helloworld = "#include <iostream>\n\
using namespace std;\n \
 \n\
int main()\n\
{\n\
	cout << 'Hello World' << endl;\n\
 \n\
	cin.get();\n\
	return 0;\n\
}";
      break;
    case "csharp": helloworld = "// A Hello World! program in C#.\n\
using System;\n\
namespace HelloWorld\n\
{\n\
    class Hello \n\
    {\n\
        static void Main() \n\
        {\n\
            Console.WriteLine('Hello World!');\n\
\n\
            // Keep the console window open in debug mode.\n\
            Console.WriteLine('Press any key to exit.');\n\
            Console.ReadKey();\n\
        }\n\
    }\n\
}\n";
        break;
      case "python": helloworld = "# This program prints Hello, world!\n\
\n\
print('Hello, world!')\n";
        break;
      case "html": helloworld = "<html>\n\
<header><title>This is title</title></header>\n\
<body>\n\
Hello world\n\
</body>\n\
</html>\n";
        break;
      case "css": helloworld = "<style type='text/css'>\n\
h1 {\n\
        color: DeepSkyBlue;\n\
}\n\
</style>\n\
\n\
<h1>Hello, world!</h1>\n";
        break;
      case "javascript": helloworld = "<!DOCTYPE HTML>\n\
<html>\n\
\n\
<body>\n\
\n\
  <p>Before the script...</p>\n\
\n\
  <script>\n\
    alert( 'Hello, world!' );\n\
  </script>\n\
\n\
  <p>...After the script.</p>\n\
\n\
</body>\n\
\n\
</html>\n";
break;
case "java": helloworld = "public class HelloWorld {\n\
\n\
    public static void main(String[] args) {\n\
        // Prints 'Hello, World' to the terminal window.\n\
        System.out.println('Hello, World');\n\
    }\n\
\n\
}\n";
break;
case "php": helloworld = "<html>\n\
 <head>\n\
  <title>PHP Test</title>\n\
 </head>\n\
 <body>\n\
 <?php echo '<p>Hello World</p>'; ?>\n \
 </body>\n\
</html>\n";
break;
  }
  return db.query(sql,[name,helloworld,pass,member,lang], function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
    result = JSON.parse(JSON.stringify(result));
    // console.log(result.insertId);
    var id = result.insertId;
    console.log(id);
    res.redirect('/coding/' + id);
    });
  });
});
app.get('/coding/:id', (req,res) => {
  if(!req.cookies.name) return res.render('resiter', {id:req.params.id});
  tam = false;
  if(tam){
    return res.render('xuli',{id: req.params.id});
  }
  var sql = "SELECT * FROM dataCode WHERE id = ?";
  var id = req.params.id;
  var query = db.query(sql,[id], (err, result) => {
    if(err) return console.error(err);
    // console.log(result);
    result = JSON.parse(JSON.stringify(result));
    console.log(result);
    res.render('coding',{data:result,user:req.cookies.name});
    tam=true;
  });
});
app.post('/coding/:id', (req,res) => {
  var pass = req.body.pass;
  var sql = "SELECT passWord FROM dataCode WHERE id = ?";
  var id = req.params.id;
  var query = db.query(sql,[id], (err, result) => {
    if(err) return console.error(err);
    // console.log(result);
    result = JSON.parse(JSON.stringify(result));
    var hihi = result[0].passWord;
    console.log(hihi);
    if(hihi === pass){
      tam = false;
      return res.redirect('/coding/'+ id);
    }
    return res.redirect('/false');
  });
});
app.get('/false', (req, res) => {
  res.render('sai');
});
app.get('/find',(req,res) => {
  res.render('find');
})



var allUser = [];
const arrUserInfo = [];

//**********Videocall**********//

io.on('connection', socket => {
  
    var room = "";
		console.log(socket.id);
    // getDataCode(1,socket);
    socket.on('join',data => {
      console.log(data.id);
      room ='Room' + data.id;
      socket.join(room);
      // socket.user = data.user;
      // console.log(data.user);
      // socket.broadcast.to(room).emit('add',{user:data.user,allUser:allUser});
    });
    socket.on('haha', (data) => {
      fullData = {dt: data, name: data.user};
      updateDataCode(data.id, data.data, data.lang);
      socket.broadcast.to(room).emit('nes',fullData);
      // socket.broadcast.emit('nes',fullData);
    });
    socket.on('NGUOI_DUNG_DANG_KY', user => {
      socket.peerId = user.peerId;
      // socket.emit('DANH_SACH_ONLINE', arrUserInfo);
      socket.broadcast.to(room).emit('CO_NGUOI_DUNG_MOI', user);
    });

    socket.on('disconnect', () => {
        io.emit('AI_DO_NGAT_KET_NOI', socket.peerId);
    });

});
