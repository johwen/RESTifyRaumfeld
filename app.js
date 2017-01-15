RaumfeldManager = require('node-raumfeld');

var manager = new RaumfeldManager();


var express = require('express');
var app = express();


app.set('port', process.env.PORT || 3001);



app.get('/raumfeld/renderer/stop/:name', function(req,res){

	// starts discovering devices asynchronously
	manager.discover("all",0);
	// fetch a device and do something with it. Method calls on a device return a promise object
	manager.on("rendererFound", function(renderer) {
    		renderer.getVolume().then(function(value) {
			var id='Bad';
			if(renderer.name === id){
        			console.log('found renderer \"'+renderer.name + '\". Volume is ' + value);
				console.log('sending stop to Renderer \"'+id+'\"');
				renderer.pause();
				return;
			}
    		});
	});
res.send('Renderer \"'+req.params.name+'\" has been stopped');
});

app.get('/raumfeld/renderer/start/:name', function(req,res){

	// starts discovering devices asynchronously
	manager.discover("all",0);
	// fetch a device and do something with it. Method calls on a device return a promise object
	manager.on("rendererFound", function(renderer) {
    		renderer.getVolume().then(function(value) {
			var id = 'Bad';
			if(renderer.name === id){
        			console.log('found renderer \"'+renderer.name + '\". Volume is ' + value);
				console.log('sending start to Renderer \"'+id+'\"');
				renderer.play();
				return;			
			}
    		});
	});
res.send('Renderer \"'+req.params.name+'\" has been started');
})

app.listen(app.get('port'), function(){
console.log('listening on port '+ app.get('port'));
console.log('use "localhost/raumfeld/renderer/stop/:id" to stop renderer');
console.log('use "localhost/raumfeld/renderer/start/:id" to start renderer');
});
