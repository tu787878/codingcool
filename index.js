const express = require("express");
const app = express();
var io = require("socket.io")(server);
var session = require("express-session");
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var Promise = require('promise');
const fileUpload = require('express-fileupload');
var tam = true;
var compiler = require('compilex');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(fileUpload());
const fs = require('fs')
app.use(session({
  secret : 'tudc'
}));

var option = {stats : true};
compiler.init(option);
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
const { stringify } = require("querystring");

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

function getMusic(userId){
  var sql = "SELECT * FROM music WHERE user_id = ?";

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

function saveMusic(user_id, name, link){
  var sql = "INSERT INTO music (user_id, name, link) VALUES (?, ?, ?)";
  return new Promise((resolve, reject) => {
    db.query(sql,[user_id, name, link], (err,result) => {
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
function updateLibrary(userId,nameCode,dess){
  var sql = "UPDATE user_code set dess = ? WHERE user_id = ? AND name_code = ?";
  return new Promise((resolve, reject) => {
    db.query(sql,[dess, userId, nameCode], (err,result) => {
        if(err) reject(err);
        resolve("success");
      // console.log(result)
    });
})
}

function deleteLibrary(userId, nameCode){
  var sql = "DELETE FROM user_code WHERE user_id = ? AND name_code = ?";
  return new Promise((resolve, reject) => {
    db.query(sql,[userId, nameCode], (err,result) => {
        if(err) reject(err);
        resolve("success");
      // console.log(result)
    });
})

}

function updateMusic(userId, name, link){
  var sql = "UPDATE music set name = ? WHERE user_id = ? AND link = ?";
  return new Promise((resolve, reject) => {
    db.query(sql,[name, userId, link], (err,result) => {
        if(err) reject(err);
        resolve("success");
      // console.log(result)
    });
})
}

function deleteMusic(userId, link){
  var sql = "DELETE FROM music WHERE user_id = ? AND link = ?";
  return new Promise((resolve, reject) => {
    db.query(sql,[userId, link], (err,result) => {
        if(err) reject(err);
        resolve("success");
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

app.post('/user/upload/:nameCode', function(req, res) {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }

  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  let sampleFile = req.files.sampleFile;
  let name = req.body.name;
  let nameCode = req.params.nameCode;

  // Use the mv() method to place the file somewhere on your server
  var nameLink = 'mp3-upload/' +  new Date().getTime().toString() + "-" + req.files.sampleFile.name;
  var link = __dirname + '/public/' + nameLink;
  if(!req.session.userId)
    return res.redirect('/user/login/' + nameCode); 
  sampleFile.mv(link, function(err) {
    if (err)
      return res.status(500).send(err);
    saveMusic(req.session.userId, name, nameLink).then(()=>{
      res.redirect('/' + nameCode);
    })
  });
});
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
          getMusic(req.session.userId).then(musics =>{
            return res.render('coding',{data:result,user:req.session.name,linkCodes:null,musics:musics,login:login, library:library});

          })
        })
        
      })
    } else{
      return res.render('coding',{data:result,user:req.session.name,linkCodes:null,musics:null,login:null, library:null});
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
app.get('/user/login',(req,res)=>{
  res.render('login',{nameCode:""});
})

app.post('/user/login',(req,res)=>{
  var email = req.body.email;
  var password = req.body.password;
  var nameCode = req.body.nameCode;
  if(nameCode===0)
    nameCode ="";
  checkLogin(email,password).then(data=>{
    if(data[0]!=undefined){
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
  }).catch(err=>{
    console.log(err)
  })
})

app.get('/user/signup/:nameCode',(req,res)=>{
  res.render('signup',{nameCode:req.params.nameCode});
})

app.get('/user/signup',(req,res)=>{
  res.render('signup',{nameCode:""});
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
  res.redirect('/');
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
app.post('/user/edit-library', (req,res) => {
  var dess = req.body.dess;
  var nameCode = req.body.nameCode;
  if(req.session.userId){
    var userId = req.session.userId;
    updateLibrary(userId, nameCode, dess).then(()=>{
      res.redirect('/' + nameCode);
    })

  }else{
    res.redirect('/user/login/' + nameCode);
  }
})

app.post('/user/edit-music/:nameCode', (req,res) => {
  var name = req.body.name;
  var link = req.body.link;
  var nameCode = req.params.nameCode;
  if(req.session.userId){
    var userId = req.session.userId;
    updateMusic(userId, name, link).then(()=>{
      res.redirect('/' + nameCode);
    })

  }else{
    res.redirect('/user/login/' + nameCode);
  }
})

app.post('/user/delete-music/:nameCode', (req,res) => {
  var link = req.body.link;
  var nameCode = req.params.nameCode;
  if(req.session.userId){
    var userId = req.session.userId;
    deleteMusic(userId, link).then(()=>{
      try {
        fs.unlinkSync(__dirname + '/public/' + link)
        res.redirect('/' + nameCode);
        //file removed
      } catch(err) {
        console.error(err)
        res.redirect('/' + nameCode);
      }
      
    })

  }else{
    res.redirect('/user/login/' + nameCode);
  }
})

app.post('/user/delete-library', (req,res) => {
  var nameCode = req.body.nameCode;
  if(req.session.userId){
    var userId = req.session.userId;
    deleteLibrary(userId, nameCode).then(()=>{
      res.redirect('/' + nameCode);
    }).catch(err =>{
      console.log(err)
      })

  }else{
    res.redirect('/user/login/' + nameCode);
  }
})

// app.post('/user/share-library', (req,res) => {
//   var nameCode = req.body.nameCode;
//   var email = req.body.email;
//   if(req.session.userId){
//     var userId = req.session.userId;
//     deleteLibrary(userId, nameCode, email).then(()=>{
//       res.redirect('/' + nameCode);
//     })

//   }else{
//     res.redirect('/user/login/' + nameCode);
//   }
// })

app.post('/user/compilecode' , function (req , res ) {
    console.log(req.body)
  var code = req.body.code;	
  console.log("code: " +code);
  var input = req.body.input;
  console.log(input)
    var inputRadio = req.body.inputRadio;
    var lang = req.body.lang;
    console.log("lang: " + lang);
    if(lang === "c_cpp")
    {        
        if(inputRadio === "true")
        {    
        	var envData = { OS : "linux" , cmd : "gcc"};	   	
        	compiler.compileCPPWithInput(envData , code ,input , function (data) {
        		if(data.error)
        		{
        			res.send(data.error);    		
        		}
        		else
        		{
        			res.send(data.output);
        		}
        	});
	   }
	   else
	   {
	   	
	   	var envData = { OS : "linux" , cmd : "gcc"};	   
        	compiler.compileCPP(envData , code , function (data) {
        	if(data.error)
        	{
        		res.send(data.error);
        	}    	
        	else
        	{
        		res.send(data.output);
        	}
    
            });
	   }
    }else
    if( lang === "python")
    {
        if(inputRadio === "true")
        {
            var envData = { OS : "linux"};
            compiler.compilePythonWithInput(envData , code , input , function(data){
                res.send(data);
            });            
        }
        else
        {
            var envData = { OS : "linux"};
            compiler.compilePython(envData , code , function(data){
                res.send(data);
            });
        }
    }else 
    if(lang === "java")
    {
      console.log("hiwww");
        if(inputRadio === "true")
        {
            var envData = { OS : "linux" };     
            console.log("input" + code);
            compiler.compileJavaWithInput( envData , code,input , function(data){
                res.send(data);
            });
        }
        else
        {
            var envData = { OS : "linux" };     
            console.log(code);
            compiler.compileJava( envData , code , function(data){
              res.send(data);
          });    

        }

    }else {
      var obj = { error:"language is not supported" };
      res.send(JSON.stringify(obj));
    }
    
});
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
