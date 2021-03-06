/* */ 
(function(Buffer) {
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
  var Subscriber_1 = require('../Subscriber');
  function bufferCount(bufferSize, startBufferEvery) {
    if (startBufferEvery === void 0) {
      startBufferEvery = null;
    }
    return this.lift(new BufferCountOperator(bufferSize, startBufferEvery));
  }
  exports.bufferCount = bufferCount;
  var BufferCountOperator = (function() {
    function BufferCountOperator(bufferSize, startBufferEvery) {
      this.bufferSize = bufferSize;
      this.startBufferEvery = startBufferEvery;
      if (!startBufferEvery || bufferSize === startBufferEvery) {
        this.subscriberClass = BufferCountSubscriber;
      } else {
        this.subscriberClass = BufferSkipCountSubscriber;
      }
    }
    BufferCountOperator.prototype.call = function(subscriber, source) {
      return source.subscribe(new this.subscriberClass(subscriber, this.bufferSize, this.startBufferEvery));
    };
    return BufferCountOperator;
  }());
  var BufferCountSubscriber = (function(_super) {
    __extends(BufferCountSubscriber, _super);
    function BufferCountSubscriber(destination, bufferSize) {
      _super.call(this, destination);
      this.bufferSize = bufferSize;
      this.buffer = [];
    }
    BufferCountSubscriber.prototype._next = function(value) {
      var buffer = this.buffer;
      buffer.push(value);
      if (buffer.length == this.bufferSize) {
        this.destination.next(buffer);
        this.buffer = [];
      }
    };
    BufferCountSubscriber.prototype._complete = function() {
      var buffer = this.buffer;
      if (buffer.length > 0) {
        this.destination.next(buffer);
      }
      _super.prototype._complete.call(this);
    };
    return BufferCountSubscriber;
  }(Subscriber_1.Subscriber));
  var BufferSkipCountSubscriber = (function(_super) {
    __extends(BufferSkipCountSubscriber, _super);
    function BufferSkipCountSubscriber(destination, bufferSize, startBufferEvery) {
      _super.call(this, destination);
      this.bufferSize = bufferSize;
      this.startBufferEvery = startBufferEvery;
      this.buffers = [];
      this.count = 0;
    }
    BufferSkipCountSubscriber.prototype._next = function(value) {
      var _a = this,
          bufferSize = _a.bufferSize,
          startBufferEvery = _a.startBufferEvery,
          buffers = _a.buffers,
          count = _a.count;
      this.count++;
      if (count % startBufferEvery === 0) {
        buffers.push([]);
      }
      for (var i = buffers.length; i--; ) {
        var buffer = buffers[i];
        buffer.push(value);
        if (buffer.length === bufferSize) {
          buffers.splice(i, 1);
          this.destination.next(buffer);
        }
      }
    };
    BufferSkipCountSubscriber.prototype._complete = function() {
      var _a = this,
          buffers = _a.buffers,
          destination = _a.destination;
      while (buffers.length > 0) {
        var buffer = buffers.shift();
        if (buffer.length > 0) {
          destination.next(buffer);
        }
      }
      _super.prototype._complete.call(this);
    };
    return BufferSkipCountSubscriber;
  }(Subscriber_1.Subscriber));
})(require('buffer').Buffer);
