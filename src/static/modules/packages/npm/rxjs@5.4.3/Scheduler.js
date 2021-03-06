/* */ 
(function(process) {
  "use strict";
  var Scheduler = (function() {
    function Scheduler(SchedulerAction, now) {
      if (now === void 0) {
        now = Scheduler.now;
      }
      this.SchedulerAction = SchedulerAction;
      this.now = now;
    }
    Scheduler.prototype.schedule = function(work, delay, state) {
      if (delay === void 0) {
        delay = 0;
      }
      return new this.SchedulerAction(this, work).schedule(state, delay);
    };
    Scheduler.now = Date.now ? Date.now : function() {
      return +new Date();
    };
    return Scheduler;
  }());
  exports.Scheduler = Scheduler;
})(require('process'));
