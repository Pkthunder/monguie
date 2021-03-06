/* */ 
(function(process) {
  "use strict";
  var __extends = (this && this.__extends) || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var OuterSubscriber_1 = require('../OuterSubscriber');
  var subscribeToResult_1 = require('../util/subscribeToResult');
  function exhaustMap(project, resultSelector) {
    return this.lift(new SwitchFirstMapOperator(project, resultSelector));
  }
  exports.exhaustMap = exhaustMap;
  var SwitchFirstMapOperator = (function() {
    function SwitchFirstMapOperator(project, resultSelector) {
      this.project = project;
      this.resultSelector = resultSelector;
    }
    SwitchFirstMapOperator.prototype.call = function(subscriber, source) {
      return source.subscribe(new SwitchFirstMapSubscriber(subscriber, this.project, this.resultSelector));
    };
    return SwitchFirstMapOperator;
  }());
  var SwitchFirstMapSubscriber = (function(_super) {
    __extends(SwitchFirstMapSubscriber, _super);
    function SwitchFirstMapSubscriber(destination, project, resultSelector) {
      _super.call(this, destination);
      this.project = project;
      this.resultSelector = resultSelector;
      this.hasSubscription = false;
      this.hasCompleted = false;
      this.index = 0;
    }
    SwitchFirstMapSubscriber.prototype._next = function(value) {
      if (!this.hasSubscription) {
        this.tryNext(value);
      }
    };
    SwitchFirstMapSubscriber.prototype.tryNext = function(value) {
      var index = this.index++;
      var destination = this.destination;
      try {
        var result = this.project(value, index);
        this.hasSubscription = true;
        this.add(subscribeToResult_1.subscribeToResult(this, result, value, index));
      } catch (err) {
        destination.error(err);
      }
    };
    SwitchFirstMapSubscriber.prototype._complete = function() {
      this.hasCompleted = true;
      if (!this.hasSubscription) {
        this.destination.complete();
      }
    };
    SwitchFirstMapSubscriber.prototype.notifyNext = function(outerValue, innerValue, outerIndex, innerIndex, innerSub) {
      var _a = this,
          resultSelector = _a.resultSelector,
          destination = _a.destination;
      if (resultSelector) {
        this.trySelectResult(outerValue, innerValue, outerIndex, innerIndex);
      } else {
        destination.next(innerValue);
      }
    };
    SwitchFirstMapSubscriber.prototype.trySelectResult = function(outerValue, innerValue, outerIndex, innerIndex) {
      var _a = this,
          resultSelector = _a.resultSelector,
          destination = _a.destination;
      try {
        var result = resultSelector(outerValue, innerValue, outerIndex, innerIndex);
        destination.next(result);
      } catch (err) {
        destination.error(err);
      }
    };
    SwitchFirstMapSubscriber.prototype.notifyError = function(err) {
      this.destination.error(err);
    };
    SwitchFirstMapSubscriber.prototype.notifyComplete = function(innerSub) {
      this.remove(innerSub);
      this.hasSubscription = false;
      if (this.hasCompleted) {
        this.destination.complete();
      }
    };
    return SwitchFirstMapSubscriber;
  }(OuterSubscriber_1.OuterSubscriber));
})(require('process'));
