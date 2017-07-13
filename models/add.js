// -------- 报名 -------- //

var sql = require('./mySqlConfig.js');

var add = function(data, callback){

  function iEscape(iString){
    return iString.replace(/[<>&"]/g, function(words){
      return{'<':'&lt;','>':'&gt;','&':'&amp;','"':'&quot;'}[words];
    });
  }

  if(!data){
    callback(true, 'no data');
    return;
  }else{
    if(data){
      sql.findNum(data.num, function(err, result){
        if(err){
          callback(true, err);
          return;
        }
        if(result.length !== 0){      //存在 报过名
          callback(true, 'already sign up');
          return;
        }
        if(result.length === 0){      //不存在 则报名
          // --- 正则 --- //
          var nameRe = /[\u4E00-\u9FA5]{2,5}(?:·[\u4E00-\u9FA5]{2,5})*/;
          var numRe = /^0416\d{4}$/;
          var telRe = /^(13[0-9]|15[0-9]|17[0-9]|18[0-9])\d{8}$/;

          if(!nameRe.test(data.name)){
            callback(true, "name err");
            return;
          }
          else if(!numRe.test(data.num)){
            callback(true, "num err");
            return;
          }
          else if(!telRe.test(data.tel)){
            callback(true, "tel err");
            return;
          }
          else if(!data.whether){
            callback(true, "miss whether data");
            return;
          }
          else{
            sql.add(data, function(err, result){
              if(err){
                callback(true, err);
                return;
              }
              if(callback){
                callback(false, "add success");
                return;
              }
            });
          }
        }
      });
    }
  }
};

module.exports = add;