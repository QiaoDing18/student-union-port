// ----- 返回查找信息 ----- //

var sql = require('./mySqlConfig.js');

var returnInf = function(num, callback){
  if(!num){
    callback(true, "miss data");
    return;
  }

  sql.findNum(num, function(err, result){
    if(err){
      callback(true, err);
      return;
    }
    if(callback){
      callback(false, result);
      return;
    }
  });
};

module.exports = returnInf;