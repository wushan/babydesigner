/**
 * Size.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
  	category: {
  		model: 'category'
  	},
  	slug: {
  		type: 'string',
  		required: true
  	},
  	width: {
  		type: 'string',
  		required: true
  	},
    height: {
      type: 'string',
      required: true
    },
    works: {
      collection: 'works',
      via: 'subcategory'
    }
  }
};

