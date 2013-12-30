/*
 class score
 extends Ext.Controller
 The score controller
*/Ext.regController("score", {
  set: function(options) {
    this.calculateRisk(options.binaryScore);
    return null;
  },
  getScore: function() {
    return null;
  },
  _calculateLikelihood: function(binaryString) {
    var CALCBLOCKSIZE, CALCNAME, CALCSTART, CALCSTOP, calculatedScore, scoreStore;
    CALCNAME = 'likelihood';
    CALCSTART = 0;
    CALCSTOP = 5;
    CALCBLOCKSIZE = 2;
    calculatedScore = this._chunkScore(binaryString, CALCSTART, CALCSTOP, CALCBLOCKSIZE);
    scoreStore = Ext.StoreMgr.get('Scores');
    scoreStore.getById(CALCNAME).set('score', calculatedScore);
    return null;
  },
  _calculateImpact: function(binaryString) {
    var CALCBLOCKSIZE, CALCNAME, CALCSTART, CALCSTOP, calculatedScore, scoreStore;
    CALCNAME = 'impact';
    CALCSTART = 6;
    CALCSTOP = 9;
    CALCBLOCKSIZE = 2;
    calculatedScore = this._chunkScore(binaryString, CALCSTART, CALCSTOP, CALCBLOCKSIZE);
    scoreStore = Ext.StoreMgr.get('Scores');
    scoreStore.getById(CALCNAME).set('score', calculatedScore);
    return null;
  },
  calculateRisk: function(binaryString) {
    var CALCNAME, calculatedScore, impactScore, likelihoodScore, riskSum, scoreStore;
    CALCNAME = 'risk';
    this._calculateLikelihood(binaryString);
    this._calculateImpact(binaryString);
    scoreStore = Ext.StoreMgr.get('Scores');
    likelihoodScore = scoreStore.getById('likelihood').get('score');
    impactScore = scoreStore.getById('impact').get('score');
    riskSum = likelihoodScore + impactScore;
    switch (riskSum) {
      case 2:
      case 3:
        calculatedScore = Math.pow(2, 0);
        break;
      case 4:
      case 5:
        calculatedScore = Math.pow(2, 1);
        break;
      case 6:
      case 8:
        calculatedScore = Math.pow(2, 2);
    }
    scoreStore.getById(CALCNAME).set('score', calculatedScore);
    scoreStore.sync();
    return null;
  },
  _chunkScore: function(binaryString, startIndex, stopIndex, blockSize) {
    var BINARYMASK, BINARYMASK_BLOCK, INTMASK, INTMASK_BLOCK, scoreAccumulator, shifter, _fn;
    BINARYMASK = '0000000011';
    BINARYMASK_BLOCK = '0000000001';
    INTMASK = parseInt(BINARYMASK, 2);
    INTMASK_BLOCK = parseInt(BINARYMASK_BLOCK, 2);
    scoreAccumulator = 0;
    _fn = function(shifter) {
      var blockScore, blockScorePartA, blockScorePartB, calculatedScore;
      blockScore = (binaryString >>> shifter) & INTMASK;
      blockScorePartA = blockScore & INTMASK_BLOCK;
      blockScorePartB = (blockScore >>> 1) & INTMASK_BLOCK;
      calculatedScore = Math.pow(2, blockScorePartA + blockScorePartB);
      switch (scoreAccumulator) {
        case 0:
        case 2:
          return scoreAccumulator = calculatedScore;
        case 1:
          return scoreAccumulator = (calculatedScore === 4 ? 2 : 1);
        case 4:
          return scoreAccumulator = (calculatedScore === 1 ? 2 : 4);
      }
      /*				
      				if scoreAccumulator is 0
      					scoreAccumulator = calculatedScore
      					console.log "new accum: " + scoreAccumulator
      				else if scoreAccumulator is 2
      					scoreAccumulator = calculatedScore
      					console.log "new accum: " + scoreAccumulator
      				else
      					delta = (calculatedScore - scoreAccumulator)
      					absDelta = Math.abs(delta)
      					magnitude = absDelta - 1
      					direction = delta/absDelta
      					console.log "absTemp: " + absDelta
      					
      					#scoreAccumulator = if magnitude > 0 then (calculatedScore * (Math.pow 2, direction)) else scoreAccumulator
      					scoreAccumulator = if magnitude > 0 then (min)
      				*/
    };
    for (shifter = startIndex; startIndex <= stopIndex ? shifter <= stopIndex : shifter >= stopIndex; shifter += blockSize) {
      _fn(shifter);
    }
    return scoreAccumulator;
  }
});