require=function t(e,i,o){function s(a,c){if(!i[a]){if(!e[a]){var r="function"==typeof require&&require;if(!c&&r)return r(a,!0);if(n)return n(a,!0);var u=new Error("Cannot find module '"+a+"'");throw u.code="MODULE_NOT_FOUND",u}var h=i[a]={exports:{}};e[a][0].call(h.exports,function(t){var i=e[a][1][t];return s(i?i:t)},h,h.exports,t,e,i,o)}return i[a].exports}for(var n="function"==typeof require&&require,a=0;a<o.length;a++)s(o[a]);return s}({BaseDialog:[function(t,e,i){"use strict";cc._RFpush(e,"94549jc6dBM/rbt2uPYm7U4","BaseDialog");t("GameStatus");cc.Class({"extends":cc.Component,properties:{bg:cc.Node,plane:cc.Node},init:function(t){this.game=t},closeClick:function(){this.dimiss()},show:function(){this.node.setLocalZOrder(210),this.node.active=!0,this.node.opacity=255,this._doStartAnim()},dimiss:function(){this._doEndAnim()},_doStartAnim:function(){this.plane.scale=.8;var t=cc.scaleTo(.5,1,1);this.plane.runAction(t.easing(cc.easeElasticOut(0)))},_doEndAnim:function(){this.node.active=!1}}),cc._RFpop()},{GameStatus:"GameStatus"}],CollisionBox:[function(t,e,i){"use strict";cc._RFpush(e,"87dc10p2CdDyKXE7z1Y19vn","CollisionBox"),cc.Class({"extends":cc.Component,getLeft:function(){return this.node.x-this.node.width/2},getRight:function(){return this.node.x+this.node.width/2},getWorldPoint:function(t){return t.convertToWorldSpaceAR(this.node.getPosition())}}),cc._RFpop()},{}],DialogManager:[function(t,e,i){"use strict";cc._RFpush(e,"b9b1borJH1DQJMB3dGN5XuW","DialogManager");var o=t("RuleDialog"),s=t("GuideDialog"),n=t("GameOverDialog");cc.Class({"extends":cc.Component,properties:{ruleDialog:cc.Prefab,guideDialog:cc.Prefab,gameOverDialog:cc.Prefab},init:function(t){this.game=t,this._ruleDialog=this._getDialogNode(this.ruleDialog).getComponent(o),this._guideDialog=this._getDialogNode(this.guideDialog).getComponent(s),this._gameOverDialog=this._getDialogNode(this.gameOverDialog).getComponent(n),this._ruleDialog.init(t),this._guideDialog.init(t),this._gameOverDialog.init(t)},_getDialogNode:function(t){var e=cc.instantiate(t);return this.node.parent.addChild(e),e.active=!1,e},getRuleDialog:function(){return this._ruleDialog},getGuideDialog:function(){return this._guideDialog},getGameOverDialog:function(){return this._gameOverDialog}}),cc._RFpop()},{GameOverDialog:"GameOverDialog",GuideDialog:"GuideDialog",RuleDialog:"RuleDialog"}],Dog:[function(t,e,i){"use strict";function o(t,e,i){return e in t?Object.defineProperty(t,e,{value:i,enumerable:!0,configurable:!0,writable:!0}):t[e]=i,t}cc._RFpush(e,"8a5dcb4HgFDv7gT37dGucmi","Dog");var s,n={NONE:-1,CLOSE:0,OPEN:1};cc.Class((s={"extends":cc.Component,properties:{open:cc.Node,close:cc.Node,left:cc.Node,right:cc.Node,resetPot:cc.Vec2,rawSpeed:0,limit:cc.Vec2},init:function(t){this.game=t,this._direction=1,this._isMove=!1,this.speed=this.rawSpeed,this._resetState()},startMove:function(){this._isMove=!0},stopMove:function(){this._isMove=!1,this._resetPosition(),this._resetState()},_resetState:function(){this.preState=n.NONE,this.currState=n.OPEN},openMouth:function(){this.preState=this.currState,this.currState=n.OPEN,this.open.active=!0,this.close.active=!1},closeMouth:function(){this.preState=this.currState,this.currState=n.CLOSE,this.open.active=!1,this.close.active=!0},_resetPosition:function(){this.node.setPosition(this.resetPot)}},o(s,"_resetState",function(){this.preState=n.NONE,this.currState=n.OPEN}),o(s,"_levelUp",function(){var t=cc.moveBy(2.5,cc.p(0,-200)),e=cc.moveBy(2.5,cc.p(0,200)),i=cc.repeatForever(cc.sequence(t,e));this.node.runAction(i)}),o(s,"update",function(t){this._isMove&&this._updateDogPot(t)}),o(s,"upSpeed",function(){this.speed*=3}),o(s,"_updateDogPot",function(t){var e=t*this.speed;this.node.x+e>=this.limit.y?this._direction=-1:this.node.x+e<=this.limit.x&&(this._direction=1),this.node.x+=e*this._direction}),s)),cc._RFpop()},{}],Food:[function(t,e,i){"use strict";cc._RFpush(e,"1f5efNsushCyrotwoTmfvWt","Food");var o=t("GameStatus"),s=cc.Enum({BEGEN:-1,ENDED:-1,CANCEL:-1}),n=cc.Enum({FLY:-1,DOWN:-1,NONE:-1});cc.Class({"extends":cc.Component,properties:{emitSpeed:0,gravity:0,scale:0,ratio:0,showTime:0,foodSF0:cc.SpriteFrame,foodSF1:cc.SpriteFrame},init:function(t){this.game=t,this.ballSFs=[this.foodSF0,this.foodSF1],this.node.getComponent(cc.Sprite).spriteFrame=this.ballSFs[parseInt(Math.random()*this.ballSFs.length)],this.node.opacity=255,this.valid=!1,this.status=s.CANCEL,this.currentHorSpeed=0,this.currentVerSpeed=0,this.target=cc.p(0,0),this.node.setScale(1),this.node.rotation=0,this.hitIn=!1,this.enableInput(!1),this.game.addFoodNum()},enableInput:function(t){t?cc.eventManager.resumeTarget(this.node):cc.eventManager.pauseTarget(this.node)},ballStart:function(){this.enableInput(!0),this.registerInput()},ballStop:function(){this.enableInput(!1)},registerInput:function(){this.listener={event:cc.EventListener.TOUCH_ONE_BY_ONE,onTouchBegan:function(t,e){if(this.game.getGameState()!==o.GAMEOVER)return this.began=t.getLocation(),this.status=s.BEGEN,this.game.switchGameStatus(o.PLAYING),!0}.bind(this),onTouchEnded:function(t,e){this.ended=t.getLocation();var i=cc.pDistance(this.began,this.ended);i>100&&this.began.y<this.ended.y?(this.status=s.ENDED,this.enableInput(!1),this.currentVerSpeed=this.emitSpeed,this.target=this.node.parent.convertToNodeSpaceAR(this.ended),this.currentHorSpeed=3*this.target.x,this.game.soundMng.playFlySound(),this.doAnim(),this.game.newFood()):this.status=s.CANCEL}.bind(this),onTouchCancelled:function(t,e){this.status=s.CANCEL}.bind(this)},cc.eventManager.addListener(this.listener,this.node)},doAnim:function(){var t=cc.scaleTo(1,this.scale),e=cc.randomMinus1To1(),i=cc.rotateBy(2,1080*e),o=cc.spawn(t,i);this.node.runAction(o)},_updatePosition:function(t){this.node.x+=t*this.currentHorSpeed,this.currentVerSpeed-=t*this.gravity,this.node.y+=t*this.currentVerSpeed,this._changeFoodStatus(this.currentVerSpeed),this.node.y<-100&&this.foodStatus===n.DOWN&&(this.node.opacity-=.3*this.node.opacity),this.foodStatus===n.NONE&&this._isOutScreen()&&this.hidFood()},hidFood:function(){this.node.stopAllActions(),this.node.removeFromParent(),this.game.removeFoodNum(),this.valid=!1,cc.pool.putInPool(this)},_changeFoodStatus:function(t){0===t||this._isOutScreen()?this.foodStatus=n.NONE:t>0?this.foodStatus=n.FLY:(this.foodStatus=n.DOWN,this.node.setLocalZOrder(0))},_isOutScreen:function(){return this.node.y<-800},_checkValid:function(){if(this.foodStatus===n.DOWN&&!this.valid){var t=this.node.parent;if(null!==t){var e=this.game.dog,i=e.left,o=e.right,s=this.node.getBoundingBoxToWorld().width/2,a=t.convertToWorldSpaceAR(this.node.getPosition()).x,c=t.convertToWorldSpaceAR(this.node.getPosition()).y,r=e.node.convertToWorldSpaceAR(i.getPosition()).y+s,u=e.node.convertToWorldSpaceAR(i.getPosition()).x,h=e.node.convertToWorldSpaceAR(o.getPosition()).x,d=e.node.convertToWorldSpaceAR(i.getPosition()).y-s;c<r&&c>d&&a>u&&a<h&&(this.valid=!0,this.game.score.addScore(),this.hidFood())}}},update:function(t){this.status===s.ENDED&&(this._updatePosition(t),this._checkValid())},onCollisionEnter:function(t,e){if(this.foodStatus!==n.FLY){console.log("碰撞了！！");var i=t.node.getComponent("CollisionBox"),o=i.getLeft(),s=i.getRight(),a=e.world,c=a.radius,r=this.node.parent.convertToWorldSpaceAR(e.node.getPosition()),u=this.game.dog.node.convertToWorldSpaceAR(t.node.getPosition()),h=0,d=0;d=(r.y-u.y)/c+.5,h=Math.abs(u.x-r.x)/c+.5;var l=this.currentHorSpeed/Math.abs(this.currentHorSpeed)*150;("right"===t.node.name&&this.node.x<=o||"left"===t.node.name&&this.node.x>=s)&&(this.hitIn?this.currentHorSpeed=this.currentHorSpeed*this.ratio*h+l:(this.currentHorSpeed=this.currentHorSpeed*-1*this.ratio*h+l,this.hitIn=!0)),("right"===t.node.name&&this.node.x>s||"left"===t.node.name&&this.node.x<o)&&(this.currentHorSpeed=this.currentHorSpeed*this.ratio*h+l),this.currentVerSpeed=this.currentVerSpeed*-1*d*.8}}}),cc._RFpop()},{GameStatus:"GameStatus"}],GameOverDialog:[function(t,e,i){"use strict";cc._RFpush(e,"7dca1sJRqRPoLoWOUh91CdF","GameOverDialog");var o=t("BaseDialog");t("GameStatus");cc.Class({"extends":o,properties:{feed:cc.Label,money:cc.Label},clickReplay:function(){location.assign("http://www.chouduck.com/happydog/share.html?score="+this.game.score.getScore())},setResult:function(t){this.feed.string="为TA喂食："+t+"g",this.money.string="为TA募捐：¥"+t/10}}),cc._RFpop()},{BaseDialog:"BaseDialog",GameStatus:"GameStatus"}],GameStatus:[function(t,e,i){"use strict";cc._RFpush(e,"9d3c2125z9ImLQ6QjQSpgpO","GameStatus");var o=cc.Enum({SHOWRULE:-1,READY:-1,PLAYING:-1,GAMEOVER:-1});e.exports=o,cc._RFpop()},{}],GuideDialog:[function(t,e,i){"use strict";cc._RFpush(e,"6ac51tTfT5N4ogECVH2cnWY","GuideDialog");var o=t("BaseDialog"),s=t("GameStatus");cc.Class({"extends":o,properties:{},clickStart:function(){this.game.switchGameStatus(s.PLAYING),this.dimiss()}}),cc._RFpop()},{BaseDialog:"BaseDialog",GameStatus:"GameStatus"}],MainSence:[function(t,e,i){"use strict";cc._RFpush(e,"280c3rsZJJKnZ9RqbALVwtK","MainSence");var o=t("Food"),s=t("GameStatus"),n=t("Score"),a=t("Dog"),c=t("DialogManager"),r=t("SoundManager"),u=t("TimerManager");cc.Class({"extends":cc.Component,properties:{food:cc.Prefab,dog:a,score:n,startPosition:cc.Vec2,leftCount:cc.Label,rightCount:cc.Label,dialogMng:c,timeMng:u,soundMng:r},onLoad:function(){this.newFood(),this.initCollisionSys(),this.dialogMng.init(this),this.dog.init(this),this.timeMng.init(this),this.score.init(this),this.switchGameStatus(s.SHOWRULE)},newFood:function(){var t=null;t=cc.pool.hasObject(o)?cc.pool.getFromPool(o).node:cc.instantiate(this.food),t.setLocalZOrder(101),this.node.addChild(t),t.setPosition(this.startPosition);var e=t.getComponent("Food");this.currFood=e,e.init(this),this._gameStatus===s.PLAYING&&e.ballStart()},switchGameStatus:function(t){switch(t){case s.SHOWRULE:this._enableInput(!1),this.dialogMng.getRuleDialog().show();break;case s.READY:this._enableInput(!1),this.soundMng.playBGMSound(),this.dialogMng.getGuideDialog().show(),this._foodNum=0;break;case s.PLAYING:this._enableInput(!0),this.currFood.ballStart(),this._gameStatus!==t&&this.timeMng.oneSchedule();break;case s.GAMEOVER:this._enableInput(!1),this.dialogMng.getGameOverDialog().setResult(this.score.getScore()),this.dialogMng.getGameOverDialog().show()}this._gameStatus=t},_enableInput:function(t){t?cc.eventManager.resumeTarget(this.node):cc.eventManager.pauseTarget(this.node)},initCollisionSys:function(){this.collisionManager=cc.director.getCollisionManager(),this.collisionManager.enabled=!0},getGameState:function(){return this._gameStatus},_checkBallNum:function(){this.hasFood()?this.dog.openMouth():this.dog.closeMouth()},startMoveDog:function(){this.dog.startMove()},stopMoveDog:function(){this.dog.stopMove()},addFoodNum:function(){this._foodNum+=1},removeFoodNum:function(){this._foodNum-=1},hasFood:function(){return 0!==this._foodNum},gameOver:function(){this.switchGameStatus(s.GAMEOVER)},update:function(t){this._gameStatus===s.PLAYING&&this._checkBallNum()}}),cc._RFpop()},{DialogManager:"DialogManager",Dog:"Dog",Food:"Food",GameStatus:"GameStatus",Score:"Score",SoundManager:"SoundManager",TimerManager:"TimerManager"}],RuleDialog:[function(t,e,i){"use strict";cc._RFpush(e,"32f52rD0w9KG7iHryHwHz+i","RuleDialog");var o=t("BaseDialog"),s=t("GameStatus");cc.Class({"extends":o,properties:{},clickStart:function(){this.game.switchGameStatus(s.READY),this.dimiss()}}),cc._RFpop()},{BaseDialog:"BaseDialog",GameStatus:"GameStatus"}],Score:[function(t,e,i){"use strict";cc._RFpush(e,"c746eHGBV9JZo9rPOqryZbr","Score");var o=t("GameStatus");t("Utils");cc.Class({"extends":cc.Component,properties:{scoreText:cc.Label,upLeveCount:0},init:function(t){this.game=t,this._score=0},getScore:function(){return this._score},setScore:function(t){this._score=t,this._updateScore()},addScore:function(){this.game.getGameState()===o.PLAYING&&(this._score+=1,this._updateScore(),this._checkShouldLevelChange())},_checkShouldLevelChange:function(){this.upLeveCount==this._score&&this.game.dog.upSpeed()},_updateScore:function(){this.scoreText.string=this._score}}),cc._RFpop()},{GameStatus:"GameStatus",Utils:"Utils"}],SoundManager:[function(t,e,i){"use strict";cc._RFpush(e,"df3c4Lk7VNMCrznGHIXMInY","SoundManager"),cc.Class({"extends":cc.Component,properties:{toggleAudio:!0,flyAudio:{"default":null,url:cc.AudioClip},bgmAudio:{"default":null,url:cc.AudioClip}},playFlySound:function(){this.playSound(this.flyAudio)},playSound:function(t){this.toggleAudio&&t&&cc.audioEngine.playEffect(t,!1)},playBGMSound:function(){this.toggleAudio&&this.bgmAudio&&cc.audioEngine.playEffect(this.bgmAudio,!0)}}),cc._RFpop()},{}],TimerManager:[function(t,e,i){"use strict";cc._RFpush(e,"9c623XO2iVCI7YRdfZtY5x3","TimerManager");var o=(t("GameStatus"),t("Utils"));cc.Class({"extends":cc.Component,properties:{maxTime:0,timeToMove:0},init:function(t){this.game=t,this.time=this.maxTime,this.isTimeToMove=!1},_countCallback:function(){this.counting=!1,this.isTimeToMove=!1,this.game.leftCount.string="30",this.game.rightCount.string="00",this.game.stopMoveDog(),this.game.gameOver()},stopCounting:function(){this.unschedule(this._countCallback),this.time=this.maxTime},oneSchedule:function(){this.stopCounting(),this.scheduleOnce(this._countCallback,this.maxTime),this.counting=!0},update:function(t){if(this.counting&&this.time>0){this.time-=t,this.maxTime-this.timeToMove>=this.time&&!this.isTimeToMove&&(this.isTimeToMove=!0,this.game.startMoveDog());var e=this.time.toFixed(2);4===e.length&&(e="0"+e);var i=e.split(".");this.game.leftCount.string=o.prefixInteger(i[0],2),this.game.rightCount.string=o.prefixInteger((.6*i[1]).toFixed(0),2)}}}),cc._RFpop()},{GameStatus:"GameStatus",Utils:"Utils"}],Utils:[function(t,e,i){"use strict";cc._RFpush(e,"9c3bbWft9BCw4cX5OutIkWX","Utils"),e.exports={prefixInteger:function(t,e){return(Array(e).join("0")+t).slice(-e)},preLoadSpriteFrame:function(t,e){cc.loader.loadRes(t,cc.SpriteFrame,function(t,i){e.spriteFrame=i})},shouldRender:function(){return this.isWeChatBrowser()||cc.sys.os===cc.sys.OS_IOS}},cc._RFpop()},{}]},{},["BaseDialog","CollisionBox","DialogManager","Dog","Food","GameOverDialog","GameStatus","GuideDialog","MainSence","RuleDialog","Score","SoundManager","TimerManager","Utils"]);