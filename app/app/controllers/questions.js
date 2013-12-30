/*
 class questions
 extends Ext.Controller
 The questions controller
*/Ext.regController("questions", {
  answer: function(options) {
    Ext.dispatch({
      controller: 'answers',
      action: 'set',
      questionAnswered: options.questionAnswered,
      answerState: options.answerState
    });
    /*
    		Ext.dispatch
    			controller: 'risk'
    			action: 'getBinary'
    		*/
    return null;
  },
  resetUi: function() {
    BinaryRisk.Viewport.QuestionPanel.resetAllUi();
    return null;
  }
});