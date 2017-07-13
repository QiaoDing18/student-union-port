// ----- 删除接口 ----- //

var sql = require('./mySqlConfig.js');

var iDelete = function(num, password, callback){
  if(password !== 'xupt@123456'){
    callback(true, "no permission");
    return;
  }
  if(!num){
    callback(true, "miss data");
    return;
  }

  sql.iDelete(num, function(err, result){
    if(err){
      callback(true, err);
      return;
    }
    if(callback){
      callback(false, "delete success");
      return;
    }
  });
};

module.exports = iDelete;