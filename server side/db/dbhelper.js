var mysql= require('promise-mysql');

var myDbHelper={
    pool:null,
    connectToDb:function()
    {
        this.pool= mysql.createPool({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'manage_meetings',
            connectionLimit: 10
          }); 
          console.log('pool created');
    }
}

module.exports = myDbHelper;



