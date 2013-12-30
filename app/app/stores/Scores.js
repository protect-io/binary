var defaultScores;
defaultScores = [
  {
    id: 'likelihood',
    score: 1
  }, {
    id: 'impact',
    score: 1
  }, {
    id: 'risk',
    score: 1
  }
];
Ext.regStore("Scores", {
  model: "Score",
  data: defaultScores,
  /*
  	listeners:
  		datachanged: ->
  			console.log "risk scores changed"
  			#this.fireEvent 'test' # can't call fireEvent inside the listener as the method does not exist for some reason
  			null
  		scope: this
  	*/
  proxy: {
    type: 'localstorage',
    id: 'io.protect.binary.scores'
  }
  /*
  	proxy:
  		type: 'memory'
  		reader:
  			type: 'json'
  			root: 'scores'
  	*/
});