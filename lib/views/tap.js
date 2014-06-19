
Th.Context = Ember.Mixin.create({

});

Th.Tap = Ember.Mixin.create({
	manager: null,
	gestureDelegate: null,

	classNames: ['is-tap'],

	action: null,
	actionContent: null,

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

	tap: function() {
		this.manager.send( this.get('action'), this.get('actionContent') );
  },

  tapEnd: function(recognizer) {
    this.tap();
  }

});

Th.TapView = Em.View.extend(Th.Tap, {

});


Th.PolyfillTapView = Th.TapView.extend({

  tap: function() {
    if ( !App.isAndroid ) {
      this.doAction();
    }
  },

  click: function() {
    
    var ac = App.applicationController;


    console.log('clicking event: '+ac.get('isClosingMenuCategory') + ' ' + ac.get('isMenuCategory'));
    // because PreventTouchStream
    if ( App.isAndroid && !ac.get('isClosingMenuCategory') && !ac.get('isMenuCategory') ) {
      this.doAction();
    }

  },

  doAction: function() {

		this.manager.send( this.get('action'), this.get('actionContent') );

  }

});
