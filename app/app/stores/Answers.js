var defaultAnswers;
defaultAnswers = {
  answers: [
    {
      id: 0,
      state: false
    }, {
      id: 1,
      state: false
    }, {
      id: 2,
      state: false
    }, {
      id: 3,
      state: false
    }, {
      id: 4,
      state: false
    }, {
      id: 5,
      state: false
    }, {
      id: 6,
      state: false
    }, {
      id: 7,
      state: false
    }, {
      id: 8,
      state: false
    }, {
      id: 9,
      state: false
    }
  ]
};
Ext.regStore("Answers", {
  model: "Answer",
  data: defaultAnswers,
  autoLoad: true,
  /*
  	listeners:
  		datachanged: ->
  			console.log "answers changed"
  		scope: this
  	*/
  proxy: {
    type: 'memory',
    reader: {
      type: 'json',
      root: 'answers'
    }
  }
});