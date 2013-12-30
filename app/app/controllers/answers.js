/*
 class risk
 extends Ext.Controller
 The risk controller
*/Ext.regController("answers", {
  set: function(options) {
    var answerStore;
    answerStore = Ext.StoreMgr.get('Answers');
    this._set(answerStore, options.questionAnswered, options.answerState);
    this._dispatchToScore();
    return null;
  },
  _set: function(store, questionID, state) {
    store.getById(questionID).set('state', state);
    return null;
  },
  _dispatchToScore: function() {
    Ext.dispatch({
      controller: 'score',
      action: 'set',
      binaryScore: this._getBinary()
    });
    return null;
  },
  get: function(options) {
    var answerStore, state;
    answerStore = Ext.StoreMgr.get('Answers');
    state = answerStore.getById(options.questionAnswered).get('state');
    return state;
  },
  reset: function(questionId) {
    var answerStore;
    answerStore = Ext.StoreMgr.get('Answers');
    answerStore.getById(questionId).set('state', false);
    return null;
  },
  resetAll: function() {
    var answer, answerList, answerStore, _i, _len;
    answerStore = Ext.StoreMgr.get('Answers');
    answerList = answerStore.getRange(0, 9);
    for (_i = 0, _len = answerList.length; _i < _len; _i++) {
      answer = answerList[_i];
      answer.set('state', false);
    }
    this._dispatchToScore();
    Ext.dispatch({
      controller: 'questions',
      action: 'resetUi'
    });
    return null;
  },
  _getBinary: function() {
    var answer, answerList, answerStore, binaryString, compactNumber, _i, _len;
    answerStore = Ext.StoreMgr.get('Answers');
    answerList = answerStore.getRange(0, 9);
    binaryString = "";
    for (_i = 0, _len = answerList.length; _i < _len; _i++) {
      answer = answerList[_i];
      binaryString = Number(answer.data.state) + binaryString;
    }
    compactNumber = parseInt(binaryString, 2);
    return compactNumber;
  }
});