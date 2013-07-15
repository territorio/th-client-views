Th.FontIconView = Em.View.extend({

	category: null,
	event: null,
	categories: null,
	classNames: ['category-icon'],

	didInsertElement: function() {
		
		// this work for DS Model and JSON objects
		// is not well done at all
		var category = this.get('category'),
				categoriesAll,
				categories,
				categoryID,
				event,
				slug;

		if (!category) {
			event = this.get('event');

			if ( event instanceof DS.Model ) {
				categories = event.get('categories');
				category = categories.get('firstObject');
			}  else {
				categories = event.categories;
				if ( !!categories ) {
					categoryID = categories[0];
				}

				if ( !!categoryID ) {
					categoriesAll = App.categoryController.get('content');


					if ( !!categoriesAll ) {
						categoriesAll.forEach(function(el) {

							if (categoryID === el.id) {
								category = el;
							}
						});
					}

				}


			}
		}
		
		if (!!category) {
			slug = (category instanceof DS.Model) ? category.get('slug') : category.slug;
		}

		if ( !!slug ) {
			this.$().addClass('icon-'+slug);
		}
	}

});