var scriptPath = '',
	scripts = [
		"bower_components/handlebars/handlebars.js",
		"bower_components/underscore/underscore.js",
		"bower_components/backbone/backbone.js",
		"bower_components/backbone-localstorage/backbone-localstorage.js",
		"bower_components/marionette/lib/backbone.marionette.js",
		"js/App.js",
		"js/Router.js",
		"js/Entities/Event/EventModel.js",
		"js/Entities/Event/EventCollection.js",
		"js/Apps/Events/EventController.js",
		"js/Apps/Events/EventViews.js"
	],
	scriptPromises = [];

function loadNextScript(i){
	$.getScript(scriptPath + scripts[i]).done(function(){
		if(scripts[i + 1]){
			loadNextScript(i+1);
		}else{
			initializeApplication();
		}
	});
}
loadNextScript(0);

function initializeApplication(){
	App.events = new App.Entities.Event.EventCollection();
	App.listenTo(App.events, 'sync', App.start);
	App.events.fetch();
}