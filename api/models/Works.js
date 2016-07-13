/**
 * Works.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
  	//Asscociate to User
  	author: {
  		model: 'user'
  	},
  	thumbnail: {
  		type: 'string'
  	},
  	data: {
  		type: 'json',
      required: true
  	},
  	tags: {
  		type: 'array'
  	},
  	public: {
  		type: 'boolean',
  		required: true,
  		defaultsTo: false
  	},
  	workid: {
  		type: 'string',
  		required: true,
  		unique: true
  	},
  	workwidth: {
  		type: 'string',
  		defaultsTo: '640'
  	},
    workheight: {
      type: 'string',
      defaultsTo: '480'
    },
    worktitle: {
      type: 'string',
      defaultsTo: 'untitled'
    },
    category: {
      model: 'category',
      defaultsTo: 1
    },
    subcategory: {
      model: 'size'
    },
  	likes: {
  		type: 'number'
  	}
  }
};

