BinaryRisk.Viewport = Ext.extend(Ext.Panel, {
  id: 'viewport',
  layout: 'card',
  fullscreen: true,
  initComponent: function() {
    var i, impactScore, likelihoodScore, question, questionItemArray, questionList, riskScore, scoreItemArray, scoreStore, _len;
    Ext.apply(this, {
      layout: {
        type: "hbox",
        align: "stretch",
        pack: "start"
      },
      dockedItems: [
        {
          xtype: 'toolbar',
          dock: 'top',
          title: 'Binary Risk Analysis',
          layout: {
            pack: "end"
          },
          items: [
            new Ext.Button({
              iconMask: true,
              iconCls: 'trash',
              handler: function() {
                Ext.dispatch({
                  controller: 'answers',
                  action: 'resetAll'
                });
                return null;
              }
            }), new Ext.Spacer({
              width: 100
            })
          ]
        }
      ]
    });
    if (!window.navigator.standalone && 'standalone' in window.navigator && Ext.is.iPad) {
      if (!this.installBar) {
        this.installBar = new Ext.Panel({
          html: '<div class="binaryrisk-installtext">tap here to save this free app to your ipad</div>',
          height: 50
        });
        this.installBar.addListener({
          el: {
            tap: function() {
              var instructions;
              instructions = new Ext.Panel({
                floating: true,
                modal: true,
                centered: true,
                width: 300,
                height: 200,
                styleHtmlContent: true,
                scroll: 'vertical',
                html: '<p>To install the app on your iPad, click the "action" icon and then then choose "add to home screen".</p>',
                dockedItems: {
                  dock: 'top',
                  xtype: 'toolbar',
                  title: 'Installation instructions'
                }
              });
              instructions.show('pop');
              return null;
            },
            scope: this
          }
        });
      }
      this.dockedItems.push(this.installBar);
    }
    BinaryRisk.Viewport.superclass.initComponent.apply(this, arguments);
    questionList = Ext.StoreMgr.get('Questions').data.items;
    questionItemArray = [];
    for (i = 0, _len = questionList.length; i < _len; i++) {
      question = questionList[i];
      questionItemArray.push(new BinaryRisk.Viewport.Question({
        questionID: i,
        questionText: question.data.text
      }));
    }
    BinaryRisk.Viewport.QuestionPanel = new BinaryRisk.Viewport.Questions({
      items: questionItemArray
    });
    scoreItemArray = [];
    scoreStore = Ext.StoreMgr.get('Scores');
    likelihoodScore = scoreStore.getById('likelihood').toWord();
    impactScore = scoreStore.getById('impact').toWord();
    riskScore = scoreStore.getById('risk').toWord();
    scoreItemArray.push(new BinaryRisk.Viewport.Score({
      title: "Risk",
      score: riskScore
    }));
    scoreItemArray.push(new BinaryRisk.Viewport.Score({
      title: "Likelihood",
      score: likelihoodScore
    }));
    scoreItemArray.push(new BinaryRisk.Viewport.Score({
      title: "Impact",
      score: impactScore
    }));
    scoreStore = Ext.StoreMgr.get('Scores');
    BinaryRisk.Viewport.ScorePanel = new BinaryRisk.Viewport.Scores({
      items: scoreItemArray,
      listeners: {
        datachanged: function() {
          this.updateScores();
          return null;
        }
      },
      store: scoreStore
    });
    scoreStore.addEvents('test');
    /*
    		scoreStore.addListener
    				test: ->
    					console.log 'please update the ui'
    					null
    					
    				datachanged: ->
    					console.log "risk scores changed"
    					#this.fireEvent 'test'
    					null
    		*/
    BinaryRisk.Viewport.ScorePanel.relayEvents(scoreStore, ['datachanged']);
    this.add([BinaryRisk.Viewport.QuestionPanel, BinaryRisk.Viewport.ScorePanel]);
    this.doLayout();
    return null;
  }
});
BinaryRisk.Viewport.Scores = Ext.extend(Ext.Panel, {
  initComponent: function() {
    Ext.apply(this, {
      id: 'scorePanel',
      flex: 1,
      style: "background-color: #fff;",
      width: "400"
    });
    BinaryRisk.Viewport.Scores.superclass.initComponent.apply(this, arguments);
    return null;
  },
  _getScores: function() {
    return this.items.items;
  },
  updateScores: function() {
    var newScore, score, scores, _i, _len;
    scores = this._getScores();
    for (_i = 0, _len = scores.length; _i < _len; _i++) {
      score = scores[_i];
      newScore = this.store.getById(score.id).toWord();
      score.updateScore(newScore);
    }
    return null;
  }
});
BinaryRisk.Viewport.Score = Ext.extend(Ext.Panel, {
  initComponent: function() {
    Ext.apply(this, {
      layout: {
        type: 'hbox',
        pack: 'center'
      },
      cls: "binaryrisk-score-base",
      width: 300,
      items: [
        new Ext.Panel({
          flex: 1,
          width: 150,
          height: 43,
          layout: {
            type: 'vbox',
            align: 'center',
            pack: 'justify'
          },
          html: this.title,
          cls: "binaryrisk-score-title",
          id: this.title.toLowerCase() + '_name'
        }), new Ext.Panel({
          width: 150,
          centered: true,
          cls: "binaryrisk-score-score",
          data: {
            riskName: this.title.toLowerCase(),
            "class": "binaryrisk-score-score-" + this.score.toLowerCase(),
            riskScore: this.score
          },
          tpl: new Ext.Template('<div id="{riskName}_value" class="{class}">{riskScore}</div>'),
          id: this.title.toLowerCase() + '_score'
        })
      ]
    });
    /*
    		riskTemplate = new Ext.Template '<div id="{riskName}_value" class="{class}">{riskScore}</div>',
    			compiled: true
    		
    		riskTemplate.apply
    			riskName: this.title.toLowerCase()
    			class: "binaryrisk-score-score-" + this.score
    			riskScore: this.score
    		*/
    this.id = this.title.toLowerCase();
    BinaryRisk.Viewport.Score.superclass.initComponent.apply(this, arguments);
    return null;
  },
  updateScore: function(newScore) {
    var scoreIdentifier, scoreObject, templateData;
    scoreIdentifier = this.id;
    scoreObject = this.items.get(1);
    templateData = {
      riskName: this.title.toLowerCase(),
      "class": "binaryrisk-score-score-" + newScore.toLowerCase(),
      riskScore: newScore
    };
    scoreObject.update(templateData);
    return null;
  }
});
BinaryRisk.Viewport.Questions = Ext.extend(Ext.Panel, {
  initComponent: function() {
    Ext.apply(this, {
      id: 'questionPanel',
      flex: 1,
      layout: {
        type: "vbox",
        align: "left",
        pack: "start"
      },
      style: "background-color: #fff;",
      html: "<b>Check all that apply:</b>"
    });
    BinaryRisk.Viewport.Questions.superclass.initComponent.apply(this, arguments);
    return null;
  },
  resetAllUi: function() {
    var question, questionList, _i, _len;
    questionList = this.items.items;
    for (_i = 0, _len = questionList.length; _i < _len; _i++) {
      question = questionList[_i];
      question.resetUI();
    }
    return null;
  }
});
BinaryRisk.Viewport.Question = Ext.extend(Ext.Panel, {
  initComponent: function() {
    Ext.apply(this, {
      margin: 10,
      height: 50,
      layout: {
        type: "hbox",
        align: "center",
        pack: "start"
      },
      items: [
        new BinaryRisk.Viewport.QuestionButton({
          buttonID: this.questionID
          /*
          					listeners:
          						wookie: ->
          							this.wookied()
          							null
          					*/
        }), new Ext.Spacer({
          width: 10
        }), new Ext.Panel({
          flex: 1,
          html: this.questionText,
          layout: {
            type: "vbox",
            align: "left"
          }
        })
      ]
    });
    this.id = "question" + this.questionID;
    BinaryRisk.Viewport.Question.superclass.initComponent.apply(this, arguments);
    this.button = this.items.get(0);
    return null;
  },
  resetUI: function() {
    this.button.resetUI();
    return null;
  }
});
BinaryRisk.Viewport.QuestionButton = Ext.extend(Ext.Panel, {
  initComponent: function() {
    Ext.apply(this, {
      width: 40,
      height: 40,
      cls: 'binaryrisk-size binaryrisk-back-unchecked',
      items: [
        new BinaryRisk.Viewport.QuestionCheck({
          buttonID: this.buttonID
        })
      ]
    });
    this.addListener({
      el: {
        tap: this.tapped,
        scope: this
      }
    });
    BinaryRisk.Viewport.QuestionButton.superclass.initComponent.apply(this, arguments);
    this.checkMark = this.items.get(0);
    return null;
  },
  tapped: function() {
    if (!this.checkMark.checked) {
      this.removeCls('binaryrisk-back-unchecked');
      this.addCls('binaryrisk-back-checked');
    } else {
      this.removeCls('binaryrisk-back-checked');
      this.addCls('binaryrisk-back-unchecked');
    }
    this.checkMark.handled();
    return null;
  },
  resetUI: function() {
    this.removeCls('binaryrisk-back-checked');
    this.addCls('binaryrisk-back-unchecked');
    this.checkMark.resetUI();
    return null;
  }
});
BinaryRisk.Viewport.QuestionCheck = Ext.extend(Ext.Panel, {
  initComponent: function() {
    Ext.apply(this, {
      width: 10,
      height: 30,
      cls: 'binaryrisk-base binaryrisk-unchecked'
    });
    BinaryRisk.Viewport.QuestionCheck.superclass.initComponent.apply(this, arguments);
    return null;
  },
  handled: function() {
    this.toggle();
    Ext.dispatch({
      controller: 'answers',
      action: 'set',
      questionAnswered: this.buttonID,
      answerState: this.checked
    });
    return null;
  },
  toggle: function() {
    if (!this.checked) {
      this.checked = true;
    } else {
      this.checked = false;
    }
    this._switchUI();
    this.doLayout();
    return null;
  },
  resetUI: function() {
    this.removeCls('binaryrisk-checked');
    this.addCls('binaryrisk-unchecked');
    return this.checked = false;
  },
  _switchUI: function() {
    if (this.checked) {
      this.removeCls('binaryrisk-unchecked');
      this.addCls('binaryrisk-checked');
    } else {
      this.removeCls('binaryrisk-checked');
      this.addCls('binaryrisk-unchecked');
    }
    return null;
  },
  checked: false
});