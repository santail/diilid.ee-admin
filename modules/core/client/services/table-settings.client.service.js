(function() {
    'use strict';

    angular
        .module('core')
        .factory('TableSettings', factory);

    factory.$inject = ['ngTableParams'];

    function factory(ngTableParams) {

      var getData = function(Entity) {
        return function($defer, params) {
  				Entity.get(params.url(), function(response) {
  					params.total(response.total);
  					$defer.resolve(response.results);
  				});
  			};
      };

      var params = {
        page: 1,
        count: 50
      };

      var settings = {
        total: 0,
        counts: [10, 25, 50, 100],
        filterDelay: 300,
      };

      var entityTableParams = {};

      var getParamsFactory = function (name, Entity) {
        if (!entityTableParams[name]) {
          /* jshint ignore:start */
          var tableParams = new ngTableParams(params, settings);
          tableParams.settings({getData: getData(Entity)});

          /* jshint ignore:end */

          entityTableParams[name] = tableParams;
        }

        return entityTableParams[name];
      };

      return {
        getParamsFactory: getParamsFactory
      };
  }

})();
