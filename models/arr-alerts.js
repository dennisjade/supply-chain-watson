(function(){
  
  var ibmdb = require("ibm_db");
  var config= require("../config");

  module.exports.getAlertCount = function(partNumber, callback){
    try{
      if (!global.dbConn.connected)
        global.dbConn = ibmdb.openSync(config.dbConnString);

      var query= "select ALERTS_SUMMARY from ARR_ALERTS where IBMPN='"+partNumber.toUpperCase()+"'"
      
      global.dbConn.query(query, function (err, rows, docs) {
        if (err) {
          console.log('Error getting ARR_ALERTS: ', err);
          callback(err,null)
        } else {
          console.log(err, rows, docs)
          callback(null, rows[0])
        }
      });

    } catch(e){
      console.log(e.message);
    }
  }

}).call(this)