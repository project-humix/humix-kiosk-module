
module.exports = function (app) {

    app.post('/api/display', function (req, res) {
      
      var input = req.body;
      console.log('request:'+input.value);

       this.io.sockets.emit('update', {
        type: input.type,
        value: input.value
      });

      res.end();
    });
};