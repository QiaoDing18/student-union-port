// -------- mysql配置 ---------- //

var mysql = require('mysql');
var options = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'xupt',
};

var connection = mysql.createConnection(options);

connection.connect(function(err){
  if(err){
    console.log('connect false');
  }else{
    console.log('connect success');
  }
});


// -------- 添加 -------- //
var add = function(data, callback){
  var inserSQL = "insert into user(name, class, num, first, second, third, whether, message, state) value(?, ?, ?, ?, ?, ?, ?, ?, ?)";
  var localData = [data.name, data.class, data.num, data.first, data.second, data.third, data.whether, data.message, data.state];

  connection.query(inserSQL, localData, function(err, result){
    if(err){
      callback(true, err);
    }
    if(callback){
      callback(false, "add success");
    }
  });
};

// -------- 按学号找 -------- //
var findNum = function(num, callback){
  var localData = [num];

  connection.query("select * from user where num=?", localData, function(err, result){
    if(err){
      callback(true, err);
    }
    if(callback){
      callback();
    }
  });
};

// -------- 删除 -------- //
var iDelete = function(num, callback){
  var localData = [num];

  connection.query("delete from user where num=?", localData, function(err, result){
    if(err){
      callback(true, err);
    }
    if(callback){
      callback();
    }
  });
};

// -------- 更新 -------- //
var update = function(num, state, callback){
  var localData = [state, num];

  connection.query("update user set state=? where num=?", localData, function(err, result){
    if(err){
      callback(true, err);
    }
    if(callback){
      callback();
    }
  });
};

// -------- 查所有 -------- //
var findAll = function(callback){
  connection.query("select * from user", function(err, result){
    if(err){
      callback(true, err);
    }
    if(callback){
      callback();
    }
  });
};


exports.add = add;
exports.iDelete = iDelete;
exports.update = update;
exports.findAll = findAll;
exports.findNum = findNum;