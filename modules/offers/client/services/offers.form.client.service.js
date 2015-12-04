(function() {
    'use strict';

    angular
        .module('offers')
        .factory('OffersForm', factory);

    function factory() {

      var getFormFields = function(disabled) {

        var fields = [
  				{
  					key: 'title',
  					type: 'input',
  					templateOptions: {
  			      label: 'Name:',
  						disabled: disabled
  			    }
  				},
  				{
  					key: 'site',
  					type: 'input',
  					templateOptions: {
  			      label: 'Site:',
  						disabled: disabled
  			    }
  				},
  				{
  					key: 'url',
  					type: 'input',
  					templateOptions: {
  			      label: 'URL:',
  						disabled: disabled
  			    }
  				}

  			];

        return fields;

      };

      var service = {
        getFormFields: getFormFields
      };

      return service;

  }

})();
