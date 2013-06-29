Th.FontIconView = Em.View.extend({

	category: null,
	event: null,
	classNames: ['category-icon'],

	didInsertElement: function() {

		var category = this.get('category');
		if (!category) {
			var event = this.get('event');
			var categories = event.get('categories');
			category = categories.get('firstObject');
		}
		
		if (!!category) {
			var slug = category.get('slug');
			if ( !!slug ) {
				this.$().addClass('icon-'+slug);
			}
		}
	}

});
