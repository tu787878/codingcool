const express = require("express");
const app = express();
var io = require("socket.io")(server);
var session = require("express-session");
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var Promise = require('promise');

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
//   user: "root",
//   password: "",
//   database: "dbs314838"
// });
var db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "dbs314838"
});


function createNewCode(name, pass, member, lang){
    // console.log("Connected!");
    var sql = "INSERT INTO datacode (nameCode, data, passWord, member, lang) VALUES (?, ?, ?, ?, ?)";
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
    db.query(sql,[name,helloworld,pass,member,lang], function (err, result) {
      if (err) {
        // console.log(err);
        return false;
      }
      else{
        // console.log("1 record inserted");
        return "ok"; 
      } 
      // 
    });

}
// createDataCode("dsdada", "dsadadad","dấdas");
function updateDataCode(id, data,lang){
  var sql = "UPDATE datacode set data =?  WHERE id = ?";
  var sql2 = "UPDATE datacode set lang = ? WHERE id = ?"
  var query = db.query(sql, [data, id], function(err, result) {
    console.log("Record-1 Updated!!");
    // console.log(result);
});
var query2 = db.query(sql2, [lang, id], (err, result) => {
    console.log("Record-2 Updated!!");
});
};
function getDataCode(nameCode){
  var sql = "SELECT * FROM datacode WHERE nameCode = ?";

  return new Promise((resolve, reject) => {
    db.query(sql,[nameCode], (err,result) => {
        if(err) reject(err);
        resolve(JSON.parse(JSON.stringify(result)));
      // console.log(result)
    });
})
}
function getDataUser(user){
  var sql = "SELECT soluong FROM datauser WHERE nameOfType = ?";

  return new Promise((resolve, reject) => {
    db.query(sql,[user], (err,result) => {
        if(err) reject(err);
        resolve(JSON.parse(JSON.stringify(result)));
      // console.log(result)
    });
})
}

function checkLogin(email,password){
  var sql = "SELECT * FROM user WHERE email = ? and password = ?";

  return new Promise((resolve, reject) => {
    db.query(sql,[email,password], (err,result) => {
        if(err) reject(err);
        resolve(JSON.parse(JSON.stringify(result)));
      // console.log(result)
    });
})
}

function checkEmail(email){
  var sql = "SELECT email FROM user WHERE email = ?";

  return new Promise((resolve, reject) => {
    db.query(sql,[email], (err,result) => {
        if(err) reject(err);
        resolve(JSON.parse(JSON.stringify(result)));
      // console.log(result)
    });
})
}

function getUserDetails(userId){
  var sql = "SELECT * FROM user_details WHERE user_id = ?";

  return new Promise((resolve, reject) => {
    db.query(sql,[userId], (err,result) => {
        if(err) reject(err);
        resolve(JSON.parse(JSON.stringify(result)));
      // console.log(result)
    });
})
}

function getLibrary(userId){
  var sql = "SELECT * FROM user_code WHERE user_id = ?";

  return new Promise((resolve, reject) => {
    db.query(sql,[userId], (err,result) => {
        if(err) reject(err);
        resolve(JSON.parse(JSON.stringify(result)));
      // console.log(result)
    });
})
}
function saveUser(user_id, name, email, pasword, active){
  var sql = "INSERT INTO user (user_id, name, email, password, active) VALUES (?, ?, ?, ?, ?)";
  return new Promise((resolve, reject) => {
    db.query(sql,[user_id, name, email, pasword, active], (err,result) => {
        if(err) reject(err);
        resolve(JSON.parse(JSON.stringify(result)));
      // console.log(result)
    });
})
}

function saveUserDetails(user_id, name){
  var sql = "INSERT INTO user_details (user_id, name, social_link, image_url, title) VALUES (?, ?, ?, ?, ?)";
  return new Promise((resolve, reject) => {
    db.query(sql,[user_id, name, "", "", "hello"], (err,result) => {
        if(err) reject(err);
        resolve(JSON.parse(JSON.stringify(result)));
      // console.log(result)
    });
})
}
function saveCodeToLibrary(user_id, nameCode, dess){
  var sql = "INSERT INTO user_code (user_id, name_code, dess) VALUES (?, ?, ?)";
  return new Promise((resolve, reject) => {
    db.query(sql,[user_id, nameCode, dess], (err,result) => {
        if(err) reject(err);
        resolve(JSON.parse(JSON.stringify(result)));
      // console.log(result)
    });
})
}
function makeNameCode(length) {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
     result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
function updatePassCode(nameCode, pass){
  var sql = "UPDATE datacode set passWord = ?  WHERE nameCode = ?";
  var query = db.query(sql, [pass, nameCode], function(err, result) {
    console.log("Record-3 Updated!!");
    // console.log(result);
});
}
function updateViewsCode(nameCode, views){
  var sql = "UPDATE datacode set views = ?  WHERE nameCode = ?";
  var query = db.query(sql, [views, nameCode], function(err, result) {
    console.log("Record-4 Updated!!");
    // console.log(result);
});
}
function updateViewsUser(user, views){
  var sql = "UPDATE datauser set soluong = ?  WHERE nameOfType = ?";
  var query = db.query(sql, [views, user], function(err, result) {
    console.log("Record-5 Updated!!");
    // console.log(result);
});
}
//**********Route**********//

app.get('/', (req,res) => {
  // res.cookie('name','tudaica').send('dsdamalkll');
  // console.log(req.cookies.name);
  var nameCode;
  var out = false;
  if(req.session.name){
    while(!out){
      nameCode = makeNameCode(8);
      let pass = '';
      let member = 5;
      let lang = "c_cpp";
      createNewCode(nameCode, pass, member, lang);
      out = true;
      let sql = "SELECT * FROM datacode WHERE nameCode = ?";
      let query = db.query(sql,[nameCode], (err, result) => {
        if(err) return console.error(err);
        result = JSON.parse(JSON.stringify(result));
        // console.log(result.length);
        if(result.length == 0){
          out = false;
        }
       });
    }
    return res.redirect('/'+ nameCode);
  }else
    return res.render('resiter',{nameCode:0});
});


app.post('/',(req,res) => {
  // console.log(req.body.name);
  var nameCode;
  var out = false;
  var userName = req.body.name;
  req.session.name = userName;
  // res.cookie('name',userName);
  if(req.body.nameCode != 0) return res.redirect('/'+ req.body.nameCode);
    while(!out){
      nameCode = makeNameCode(6);
      let pass = "";
      let member = 5;
      let lang = "c_cpp";
      createNewCode(nameCode, pass, member, lang);
      out = true;
      let sql = "SELECT * FROM datacode WHERE nameCode = ?";
      let query = db.query(sql,[nameCode], (err, result) => {
        if(err) return console.error(err);
        result = JSON.parse(JSON.stringify(result));
        // console.log(result.length);
        if(result.length == 0){
          out = false;
        }
       });
  }
    return res.redirect('/'+ nameCode);
});
/////////*******************Can Sua quyen */
app.post('/setPassword/:nameCode',(req,res) => {
  var pass = req.body.pass;
  var nameCode = req.params.nameCode;
  console.log("pass: " + pass)
  console.log("code: " + nameCode)

  updatePassCode(nameCode,pass);
  return res.redirect('/' + nameCode);
});
//*******CAn viet them************* */
app.post('/newCode', (req,res) => {
  var name = req.body.name;
  var pass = req.body.pass;
  var member = req.body.mem;
  var lang = req.body.lang;

  createNewCode(name, pass, member, lang);

});

app.get('/false', (req, res) => {
  res.render('sai');
});
app.get('/find',(req,res) => {
  res.render('find');
})


//***********nang cap *********/
app.get('/:nameCode', (req,res) => {
  var nameCode = req.params.nameCode;
  if(!req.session.name) return res.render('resiter', {nameCode:nameCode});
  // getDataUser("user").then(function(result){
  //   let soluong = result[0].soluong + 1;
  //   updateViewsUser("user",soluong);
  // })
  getDataCode(nameCode).then(function(result){
    // console.log(result.length);
    
    if(result.length == 0){
      let pass = '';
      let member = 5;
      let lang = "c_cpp";
      createNewCode(nameCode, pass, member, lang);
      return res.redirect('/' + nameCode);
    }
    // else {
    //   let views = result[0].views + 1;
    //   updateViewsCode(nameCode,views);
    // }

    if((result[0].passWord != "") && req.session[nameCode] !== "true"){
      return res.render('xuli',{nameCode: nameCode});
    }
    var login;
    if(req.session.userId){
      getUserDetails(req.session.userId).then((data) => {
        login = data[0];
        getLibrary(req.session.userId).then(library=>{
          return res.render('coding',{data:result,user:req.session.name,linkCodes:null,musiks:null,login:login, library:library});
        })
        
      })
    } else{
      return res.render('coding',{data:result,user:req.session.name,linkCodes:null,musiks:null,login:null, library:null});
    }
  })
    
});
//**********Xu ly mat khau */
app.post('/testPass/:nameCode', (req,res) => {
  var pass = req.body.pass;
  var sql = "SELECT passWord FROM datacode WHERE nameCode = ?";
  var nameCode = req.params.nameCode;
  var query = db.query(sql,[nameCode], (err, result) => {
    if(err) return console.error(err);
    // console.log(result);
    result = JSON.parse(JSON.stringify(result));
    var hihi = result[0].passWord;
    // console.log(hihi);
    if(hihi === pass){
      req.session[nameCode]="true";
      return res.redirect('/'+ nameCode);
    }
    return res.redirect('/false');
  });
});

app.post('/newUsername/:nameCode', (req,res) => {
  var username = req.body.newUsername;
  var nameCode = req.params.nameCode;
  req.session.name=username;
  return res.redirect('/'+ nameCode);

});

app.get('/user/login/:nameCode',(req,res)=>{
  res.render('login',{nameCode:req.params.nameCode});
})

app.post('/user/login',(req,res)=>{
  var email = req.body.email;
  var password = req.body.password;
  var nameCode = req.body.nameCode;
  checkLogin(email,password).then(data=>{
    console.log("user_id " + data[0].user_id);
    if(data[0].user_id!=""){
      req.session.userId = data[0].user_id;
      req.session.name = data[0].name;
      if(nameCode)
        res.redirect('/' + nameCode);
      else
        res.redirect('/');

    }
    else{
      res.redirect('/user/login?err');
    }
  })
})

app.get('/user/signup/:nameCode',(req,res)=>{
  res.render('signup',{nameCode:req.params.nameCode});
})

app.post('/user/signup',(req,res)=>{
  var email = req.body.email;
  var password = req.body.password;
  var name = req.body.name;
  var nameCode = req.body.nameCode;
console.log("email " + email)
  checkEmail(email).then((data,err)=>{
    if(data != "" && data != undefined){
      res.redirect('/user/signup?err=email');
    }
    
    else{
      console.log("hihihih");

      var user_id = new Date().getTime().toString();
      var active = 1;
      saveUser(user_id, name, email, password, active).then(()=>{
        saveUserDetails(user_id, name).then(()=>{
          req.session.userId = user_id;
          req.session.name = name;
          if(nameCode)
            res.redirect('/' + nameCode);
          else
            res.redirect('/');
        });
      });
      
    }
  }).catch(err => {
    console.log(err)
    res.redirect('/user/signup?err=undefine');
  })
})

app.get('/user/logout', (req,res)=>{
  req.session.destroy(); 
  res.redirect('/user/login/');
})

app.post('/user/add-code/:nameCode', (req,res) => {
  var dess = req.body.dess;
  var nameCode = req.params.nameCode;
  if(req.session.userId){
    var userId = req.session.userId;
    saveCodeToLibrary(userId, nameCode, dess).then(()=>{
      res.redirect('/' + nameCode);
    })

  }else{
    res.redirect('/user/login/' + nameCode);
  }
})
var allUser = [];
const arrUserInfo = {};

//**********socketio**********//

io.on('connection', socket => {
  
    var room = "";
		// console.log(socket.id);
    // getDataCode(1,socket);
    socket.on('join',data => {
      // console.log(data.id);
      room ='Room' + data.id;
      socket.join(room);
      // socket.user = data.user;
      // console.log(data.user);
      // socket.broadcast.to(room).emit('add',{user:data.user,allUser:allUser});
    });
    socket.on('haha', (data) => {
      fullData = {dt: data, name: data.user, line:data.line};
      updateDataCode(data.id, data.data, data.lang);
      socket.broadcast.to(room).emit('nes',fullData);
      // socket.broadcast.emit('nes',fullData);
    });
    socket.on('lang', (data) => {
      updateDataCode(data.id, data.data, data.lang);
      // socket.broadcast.emit('nes',fullData);
    });
    socket.on('NGUOI_DUNG_DANG_KY', user => {
      console.log(user.dataId)
      arrUserInfo[user.peerId] = user.ten;
      // console.log(arrUserInfo)
      io.in(room).emit('DANH_SACH_ONLINE', arrUserInfo);
      socket.peerId = user.peerId;
      // socket.emit('DANH_SACH_ONLINE', arrUserInfo);
      socket.broadcast.to(room).emit('CO_NGUOI_DUNG_MOI', user, socket.id);
    });

    socket.on('disconnect', () => {
      delete arrUserInfo[socket.peerId]
        io.emit('AI_DO_NGAT_KET_NOI', socket.peerId);
    });

});
///////////TURN SERRVER//////////////////////
