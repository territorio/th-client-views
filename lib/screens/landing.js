Th.SelectionAllType = "todos";

Th.SearchInputView = Em.View.extend({
  
  value: "",
  attributeBindings: ['placeholder', 'type'],

  keyUp: function(event) {
    
    if ( !App.isNative ) {
      if(event.keyCode === 13){
        this._fireSearch();
      }
    }

  },

  change: function(event) {
    
    // not tested on iOS
    if ( App.isAndroid ) {
      this._fireSearch();
    }
  },

  focusOut: function(event) {

    if ( !App.isAndroid ) {
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

  didInsertElement: function() {

    this._super();
    this.hammer.get('tap').set('enable', true);

  },

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
//Th.LandingAsideFrontView = Em.View.extend({
	elementId: "landing-aside-front",

  canRecognizeTap: function() {
    // TODO: improve it 
    return App.applicationController.get('isMenuCategoryEnded');
  },

	didInsertElement: function() {
		this._super();

    var self = this;

    var swipe = new Hammer.Swipe({
      //direction: Hammer.DIRECTION_RIGHT
    });
    swipe.set('enable', this.canRecognizeTap); 
    this.hammer.add(swipe);
    
    // TODO: test and improve
    this.hammer.on('swipe', function() {
      self.swipeLeft();
    });

	},

	swipeLeft: function() {
    this.doAction();
	}

  /*
  doAction: function() {
    console.log('doAction FRONTASIDE');
		this.manager.send( this.get('action'), this.get('actionContent') );
  }
	swipeOptions: {
		direction: Em.OneGestureDirection.Left,
		cancelPeriod: 100,
		swipeThreshold: 10
	},
  tap: function() {
    if ( !App.isAndroid ) {
      this.doAction();
    }
  },

  click: function() {
    
    var ac = App.applicationController;

    // because PreventTouchStream
    if ( App.isAndroid && ac.get('isMenuCategory') ) {
      this.doAction();
    }

  },
  */

});

Th.MenuTabView = Th.PolyfillTapView.extend({

});

Th.EventView = Th.PolyfillTapView.extend({

  classNameBindings: ['isContentVisible'],
  isContentVisible: false,

  doAction: function() {
    this.manager.send( 'toggleEvent', this);
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
