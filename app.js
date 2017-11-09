RaumfeldManager = require('node-raumfeld');

var manager = new RaumfeldManager();


var express = require('express');
var app = express();


app.set('port', process.env.PORT || 3001);



var performSimpleRendererAction = function(controllingRenderer, oAction){

	// starts discovering devices asynchronously
	manager.discover("all",0);
	// fetch a device and do something with it. Method calls on a device return a promise object
	manager.on("rendererFound", function(renderer) {
    		renderer.getVolume().then(function(value) {
			var id=controllingRenderer;
			if(renderer.name === id){
        			console.log('found renderer \"'+renderer.name + '\". Volume is ' + value);
				console.log('sending '+oAction.action+' to Renderer \"'+id+'\"');
				//actionToPerform.call();
				switch(oAction.action){
					case 'pause': renderer.pause(); break;
					case 'play' : renderer.play(); break;
					case 'stop' : renderer.stop(); break;
					case 'setVolume' : renderer.setVolume(oAction.volume); break;
					case 'getVolume' : return renderer.getVolume();
				}
				return;
			}
    		});
	});
};


app.get('/raumfeld/renderer/:name/:action', function(req,res){
	performSimpleRendererAction(req.params.name,{ action : req.params.action });
	res.send('Renderer \"'+req.params.name+'\" has been '+req.params.action+'ed');
});



app.get('/raumfeld/renderer/:name/setVolume/:volume', function(req,res){
	performSimpleRendererAction(req.params.name,{ action : "setVolume", volume : req.params.volume+"" });
	res.send('Renderer \"'+req.params.name+'\" has been '+req.params.action+'ed');
});

app.listen(app.get('port'), function(){
console.log('listening on port '+ app.get('port'));
console.log('use "localhost/raumfeld/renderer/stop/:id" to stop renderer');
console.log('example: http://localhost:3001/raumfeld/renderer/Wohnbereich/stop ');
console.log('use "localhost/raumfeld/renderer/start/:id" to start renderer');
});


