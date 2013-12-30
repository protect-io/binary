/**
 * @class Question
 * @extends Ext.data.Model
 * The Question model
 */
Ext.regModel("Question", {
    fields: [

        {name: "id", type: "int"},
        {name: "text", type: "string"},
        {name: "group", type: "string"},
		{name: "state", type: "boolean"}
    ]

});

/*
Ext.regModel("QuestionAlt", {
    fields: [

        {name: "id", type: "int"},
        {name: "text", type: "string"},
        {name: "group", type: "string"}
    ],
	
	proxy: {
		type: 'ajax',
		url: 'app/test.json'
	}
});
*/