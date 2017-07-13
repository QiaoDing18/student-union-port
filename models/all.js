// ----- 查找所有 ----- //

var sql = require('./mySqlConfig.js');

var all = function(password, callback){
  if(password !== 'xupt@123456'){
    callback(true, "no permission");
    return;
  }

  sql.findAll(function(err, result){
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

module.exports = all;