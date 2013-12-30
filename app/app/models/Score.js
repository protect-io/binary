/*
 @class Score
 @extends Ext.data.Model
 The Score model
*/Ext.regModel("Score", {
  fields: [
    {
      name: "id",
      type: "string"
    }, {
      name: "score",
      type: "int"
    }
  ],
  toWord: function() {
    var WORDS, index, numericScore, scoreAsWord;
    WORDS = ['Low', 'Medium', 'High'];
    numericScore = this.get('score');
    index = (Math.log(numericScore)) / (Math.log(2));
    scoreAsWord = WORDS[index];
    return scoreAsWord;
  }
});