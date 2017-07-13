var express = require('express');

var app = express();
var port = process.env.PORT || 2333;

app.listen(port, function(){
  console.log('Student Union Start Success on ' + port);
});

var add = require('./models/add.js');
var all = require('./models/all.js');
var iDelete = require('./models/delete.js');
var returnInf = require('./models/returnInf.js');
var update = require('./models/update.js');

var json = function(res, err, result){
  if(err){
    res.jsonp({
      error: true,
      result: result,
    });
  }else{
    res.jsonp({
      error: false,
      result: result,
    });
  }
};

app.all('*', function(req, res, next){
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By",' 3.2.1');
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});

// -----  更新接口 ----- //
app.use('/update', function(req, res){
  res.header("Access-Control-Allow-Credentials", "true");
  var num = req.query.num;
  var state = req.query.state;
  var password = req.query.password;
  update(num, state, password, function(err, result){
    json(res, err, result);
  });
});


// -----  看信息接口 ----- //
app.use('/returnInf', function(req, res){
  res.header("Access-Control-Allow-Credentials", "true");
  var num = req.query.num;
  returnInf(num, function(err, result){
    json(res, err, result);
  });
});


// -----  删除接口 ----- //
app.use('/delete', function(req, res){
  res.header("Access-Control-Allow-Credentials", "true");
  var num = req.query.num;
  var password = req.query.password;
  iDelete(num, password, function(err, result){
    json(res, err, result);
  });
});


// -----  管理接口 ----- //
app.use('/all', function(req, res){
  res.header("Access-Control-Allow-Credentials", "true");
  var password = req.query.password;
  all(password, function(err, result){
    json(res, err, result);
  });
});


// -----  添加接口 ----- //
app.use('/add', function(req, res){
  res.header("Access-Control-Allow-Credentials", "true");
  var data = req.query.newData;
  add(data, function(err, result){
    json(res, err, result);
  });
});