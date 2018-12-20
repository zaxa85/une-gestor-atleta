'use strict';

module.exports = function(Ingreso) {
  Ingreso.getIncomesPerPeriod = function(idperiodo, estado, cb) {
    let filter = {
      where: {
        idperiodo: idperiodo,
        estado: estado,
      },
    };

    Ingreso.find(filter, function(err, trafficResults) {
      if (err) return cb(err); // error out and return err msg to client

      let graphData = {
        total: 0,
      };

      var test = 0;
      trafficResults.forEach(function(obj) {
        test += parseFloat(obj.amount);
      });

      cb(null, test);
    });
  };

  Ingreso.remoteMethod('obtenerIngresosPorPeriodo', {
    http: {path: '/obtenerIngresosPorPeriodo', verb: 'get'},
    accepts: [
      {arg: 'periodo', type: 'string'},
      {arg: 'estado', type: 'string'},
    ],
    returns: {type: 'object', root: true},
  });
};
