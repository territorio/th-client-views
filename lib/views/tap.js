
Th.Context = Ember.Mixin.create({

});

Th.Tap = Ember.Mixin.create({
	manager: null,
	gestureDelegate: null,

	classNames: ['is-tap'],


	action: null,
	actionContent: null,

  canRecognizeTap: function() {
    
    // TODO: improve it 
    return !App.applicationController.get('isMenuCategoryEnded');

  },

	didInsertElement: function() {
		this._super();

    var self = this;

    this.manager = this.container.lookup('manager:application');

    this.hammer = new Hammer(this.get('element'), {recognizers: []});

    var tap = new Hammer.Tap();

    tap.set('enable', this.canRecognizeTap);
    this.hammer.add(tap);

    this.hammer.on('tap', function() {
      self.tap();
    });
	},

	tap: function() {
    this.doAction();
  },

  doAction: function() {
		this.manager.send( this.get('action'), this.get('actionContent') );
  },

  willDestroyElement: function() {
    this._super();

    if (this.hammer) {
      this.hammer.destroy();
      this.hammer = null;
    }

  }

});

Th.TapView = Em.View.extend(Th.Tap, {

});


