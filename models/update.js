// -------- 更新 -------- //
var sql = require('./mySqlConfig.js');

var update = function(num, state, password, callback){
  if(password !== 'xupt@123456'){
    callback(true, "no permission");
    return;
  }
  if(!num){
    callback(true, "miss data");
    return;
  }
  if(!state){
    callback(true, "miss state data");
    return;
  }

  sql.update(num, state, function(err, result){
    if(err){
      callback(true, err);
      return;
    }
    if(callback){
      callback(false, 'update success');
      return;
    }
  });
};

module.exports = update;