
Th.ScrollerView = Em.View.extend({
	classNames: ['scroller'],

	exclude: null,

	didInsertElement: function() {

		this._super();
    this._setHeight();

	},

  _setHeight: function() {

    var elementHeights = 0;
    var excludeHeights;
    var self = this;
    
    // this allows some binding to work and their views to be appended
    // mainly because addExcludeExtra implementation
    elementHeights += self._getSum(self.get('exclude'));

    var height = $('#init-app').outerHeight(true)-elementHeights;

    self.$().height(height); 

  },

  _getSum: function(heights, isGlobal) {

    var result = 0;
		if ( !!heights ) {

      heights.split(' ').forEach(function(item) {
        result += $('#'+item).outerHeight(true);
      });

    }
    return result;

  }

});

