Th.SelectionAllType = "todos";

Th.SearchInputView = Em.View.extend({
  
  value: "",
  attributeBindings: ['placeholder', 'type'],

	didInsertElement: function() {
		this._super();
		this.assignProperties();
		this.applyGestureDelegate();
	},

	assignProperties: function() {
		var context = this.nearestOfType(Th.Context);
		if ( context ) {
			this.manager = context.container.lookup('manager:application');
			this.gestureDelegate = context.gestureDelegate;
		}
	},

  applyGestureDelegate: function() {
    if (!!this.gestureDelegate){
      var self = this;
      this.get('eventManager.gestures').forEach(function(gesture) {
        gesture.set('delegate', self.gestureDelegate); 
      });
    }
  },

  keyUp: function(event) {

    if(event.keyCode === 13){
      this._fireSearch();
    }

  },

  _fireSearch: function() {

    this.manager.send('search', this.$().val());
    this.$().val('');
  }
});



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
    this.set('isContentVisible', !this.get('isContentVisible'));
		this.manager.send( 'toggleEvent' );
  }

});



Th.LandingScreenView = Em.View.extend({
  elementId: 'landing-screen',

  classNames: ['aside-container', 'has-aside-left'],
  classNameBindings: ['isAsideRight', 'isAsideLeft'],

  isAsideLeft: false,
  isAsideRight: false,
  isSearch: true,
  selectingComingEvents: false,

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

    if ( this.get('isSearch') ) {
      result = '';
    } else {

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
    }
		return result;

  }).property('isSearch', 'selectedPlace', 'selectedCategory'),

  isEventLoaded: Em.computed(function() {
    var events = this.get('events');
    return ( events !== undefined ) && ( events !== null );
  }).property('events'),

  templateName: 'landing_screen'

});
