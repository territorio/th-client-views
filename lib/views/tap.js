
Th.Tap = Ember.Mixin.create({

	action: null,
	actionContent: null,

	tap: function() {
    this.manager.send( this.get('action'), this.get('actionContent') );
  },

  tapEnd: function(recognizer) {
    this.tap();
  }


});

Th.TapView = Em.View.extend(Th.Tap, {

});
