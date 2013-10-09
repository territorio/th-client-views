Th.SelectionAllType = "todos";



Th.CategoryView = Th.TapView.extend({

  content: null,
  selected: null,
  classNameBindings: ['isSelected'],

  isSelected: Em.computed(function() {
    var content = this.get('content'),
        selected = this.get('selected');

    if (content === Th.SelectionAllType || selected === Th.SelectionAllType ) {
      return content === selected;
    }
    //else if ( !!content && !!selected && content.get('isLoaded') && selected.get('isLoaded') ) {
    else if ( !!content && !!selected ) {
      return content === selected;
    } else {
      return false;
    }

  }).property('content', 'selected'),

  actionContentBinding: Em.Binding.oneWay('content'),
  action: 'selectCategory'

});



Th.LandingAsideFrontView = Th.TapView.extend({
	elementId: "landing-aside-front",

	swipeOptions: {
		direction: Em.OneGestureDirection.Left,
		cancelPeriod: 100,
		swipeThreshold: 10
	},

	swipeEnd: function(recognizer, evt) {
		this.tap();
	}

});

Th.EventView = Th.TapView.extend({

  classNameBindings: ['isContentVisible'],
  isContentVisible: false,
  tap: function() {

    var self = this;
    self.$().addClass('is-tap');
    var visible = this.get('isContentVisible');
    this.set('isContentVisible', !visible);

    Em.run.next(function() {
      self.$().removeClass('is-tap');
    });

  }

});



Th.LandingScreenView = Em.View.extend({
  elementId: 'landing-screen',

  classNames: ['aside-container', 'has-aside-left'],
  classNameBindings: ['isAsideRight', 'isAsideLeft'],

  isAsideLeft: false,
  isAsideRight: false,

  selectedCategory: null,
  categories: null,

  selectedPlace: null,
  places: null,

  events: null,

  selectedDate: null,

  selectionName: Em.computed(function() {

		var selectedCategory = this.get('selectedCategory'),
				selectedPlace,
				result;

		if (!!selectedCategory) {
			if ( selectedCategory !== Th.SelectionAllType ) {
				result = selectedCategory.name;
			}

		} else {
			selectedPlace = this.get('selectedPlace');
			if (!!selectedPlace) {
				result = selectedPlace.name;
			}
		}
		return result;

  }).property('selectedPlace', 'selectedCategory'),

  isEventLoaded: Em.computed(function() {
    var events = this.get('events');
    return ( events !== undefined ) && ( events !== null );
  }).property('events'),

  templateName: 'landing_screen'

});
