(function() {
    'use strict';

    angular
        .module('wishes')
        .factory('WishesForm', factory);

    function factory() {

      var getFormFields = function(disabled) {

        var fields = [
  				{
  					key: 'contains',
  					type: 'input',
  					validation: {
              show: true
            },
  					templateOptions: {
  					  required: true,
  			      label: 'Contains:',
  						disabled: disabled
  			    }
  				},
  				{
  					key: 'email',
  					type: 'input',
  					templateOptions: {
              type: 'email',
              label: 'Email'
            },
  				},
  				{
  					key: 'phone',
  					type: 'input',
  					templateOptions: {
  			      label: 'Phone:',
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
