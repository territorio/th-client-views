Th.CategoryAllType = "todos";

Th.CategoryView = Th.TapView.extend({

  content: null,
  selected: null,
  classNameBindings: ['isSelected'],

  isSelected: Em.computed(function() {
    var content = this.get('content'),
        selected = this.get('selected');

    if (content === Th.CategoryAllType || selected === Th.CategoryAllType ) {
      return content === selected;
    }
    else if ( !!content && !!selected && content.get('isLoaded') && selected.get('isLoaded') ) {
      return content === selected;
    } else {
      return false;
    }


  }).property('content.isLoaded', 'selected.isLoaded'),

  action: 'selectCategory',
  actionContentBinding: Em.Binding.oneWay('content')

});

Th.EventView = Th.TapView.extend({
  classNameBindings: ['isContentVisible'],
  isContentVisible: false,
  tap: function() {

    var visible = this.get('isContentVisible');
    this.set('isContentVisible', !visible);

  }

});


Th.LandingScreenView= Em.View.extend({
  elementId: 'landing-screen',

  classNames: ['aside-container', 'has-aside-left'],
  classNameBindings: ['isAsideRight', 'isAsideLeft'],

  isAsideLeft: false,
  isAsideRight: false,

  templateName: 'landing_screen'

});
