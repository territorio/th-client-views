
Ember.Handlebars.registerHelper('humanize', function(property, options){

  var currentContext = this,
      path = property,
      templateData = options.data,
      normalized = Ember.Handlebars.normalizePath(currentContext, path, templateData);
  
  // TODO: improve Ember Internal View to re-use this view
  var MomentView = Ember.View.extend(Ember._Metamorph, {
    path: null,
    pathRoot: null,
    templateData: null,

    valueForRender: function() {
      var date = Ember.Handlebars.get(this.pathRoot, this.path, { data: this.templateData });
      if ( !!date ) {
        return moment( date ).format('dddd DD MMMM');
      } else {
        return "";
      }
    },

    render: function(buffer){
      buffer.push(this.valueForRender());
    }
  
  });

  var view = options.data.view;
  var bindView = view.createChildView(MomentView, { pathRoot: currentContext,
    path: property,
    templateData: templateData 
  });
  view.appendChild(bindView);


  view.registerObserver(normalized.root, normalized.path, function() {
    Ember.run.scheduleOnce('render', bindView, 'rerender');
  });
  return false;

});
