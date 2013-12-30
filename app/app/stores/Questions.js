/*
questionData = 
	questions: [
		{
			'id': 1
			'text': 'Hello World'
			'group': 'Alpha'
			}
		{
			'id': 2
			'text': 'Hello World Again'
			'group': 'Alpha'
			}
		]
	

Ext.regStore "QuestionsAlt", {
	model: "Question"
	autoLoad: true
	data: questionData

	proxy:
		type: 'memory'
		reader:
			type: 'json'
			root: 'questions'
}
*/
var questionsJSON;
questionsJSON = {
  questions: [
    {
      "id": 1,
      "text": "The attack can be completed with common skills",
      "group": "a"
    }, {
      "id": 2,
      "text": "The attack can be completed without significant resources",
      "group": "a"
    }, {
      "id": 3,
      "text": "The asset is undefended",
      "group": "b"
    }, {
      "id": 4,
      "text": "There are known weaknesses in the current defences",
      "group": "b"
    }, {
      "id": 5,
      "text": "The vulnerability is always present in the asset",
      "group": "c"
    }, {
      "id": 6,
      "text": "The attack can be performed w/o meeting pre-conditions",
      "group": "c"
    }, {
      "id": 7,
      "text": "There will be consequences from internal sources",
      "group": "d"
    }, {
      "id": 8,
      "text": "There will be consequences from external sources",
      "group": "d"
    }, {
      "id": 9,
      "text": "The asset has or creates significant business value",
      "group": "e"
    }, {
      "id": 10,
      "text": "The repair or replacement costs will be significant",
      "group": "e"
    }
  ]
};
Ext.regStore("Questions", {
  model: "Question",
  data: questionsJSON,
  autoLoad: true,
  /*
  	listeners:
  		datachanged: ->
  			console.log "questions changed"
  		scope: this
  	*/
  /*
  	proxy:
  		type: 'ajax'
  		url: '/resources/data/Questions.json'
  		reader:
  			type: 'json'
  			root: ''
  	*/
  proxy: {
    type: 'memory',
    reader: {
      type: 'json',
      root: 'questions'
    }
  }
});