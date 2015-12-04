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
  				},
  				{
  					key: 'original',
  					type: 'input',
  					templateOptions: {
  			      label: 'Original price:',
  						disabled: disabled
  			    }
  				},
  				{
  					key: 'sales',
  					type: 'input',
  					templateOptions: {
  			      label: 'Sales price:',
  						disabled: disabled
  			    }
  				},
  				{
  					key: 'discount',
  					type: 'input',
  					templateOptions: {
  			      label: 'Discount:',
  						disabled: disabled
  			    }
  				},
  				{
  					key: 'period',
  					type: 'input',
  					templateOptions: {
  			      label: 'Sales period:',
  						disabled: disabled
  			    }
  				},
  				{
  					key: 'active',
  					type: 'checkbox',
  					templateOptions: {
  			      label: 'Acive:',
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
