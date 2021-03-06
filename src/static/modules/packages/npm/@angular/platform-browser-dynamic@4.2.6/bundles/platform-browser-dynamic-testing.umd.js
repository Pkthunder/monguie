/* */ 
"format cjs";
(function(global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/compiler/testing'), require('@angular/core'), require('@angular/core/testing'), require('./platform-browser-dynamic.umd'), require('@angular/platform-browser/testing'), require('@angular/platform-browser')) : typeof define === 'function' && define.amd ? define(['exports', '@angular/compiler/testing', '@angular/core', '@angular/core/testing', '@angular/platform-browser-dynamic', '@angular/platform-browser/testing', '@angular/platform-browser'], factory) : (factory((global.ng = global.ng || {}, global.ng.platformBrowserDynamic = global.ng.platformBrowserDynamic || {}, global.ng.platformBrowserDynamic.testing = global.ng.platformBrowserDynamic.testing || {}), global.ng.compiler.testing, global.ng.core, global.ng.core.testing, global.ng.platformBrowserDynamic, global.ng.platformBrowser.testing, global.ng.platformBrowser));
}(this, (function(exports, _angular_compiler_testing, _angular_core, _angular_core_testing, _angular_platformBrowserDynamic, _angular_platformBrowser_testing, _angular_platformBrowser) {
  'use strict';
  var extendStatics = Object.setPrototypeOf || ({__proto__: []} instanceof Array && function(d, b) {
    d.__proto__ = b;
  }) || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
  };
  function __extends(d, b) {
    extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  }
  var DOMTestComponentRenderer = (function(_super) {
    __extends(DOMTestComponentRenderer, _super);
    function DOMTestComponentRenderer(_doc) {
      var _this = _super.call(this) || this;
      _this._doc = _doc;
      return _this;
    }
    DOMTestComponentRenderer.prototype.insertRootElement = function(rootElId) {
      var rootEl = _angular_platformBrowser.ɵgetDOM().firstChild(_angular_platformBrowser.ɵgetDOM().content(_angular_platformBrowser.ɵgetDOM().createTemplate("<div id=\"" + rootElId + "\"></div>")));
      var oldRoots = _angular_platformBrowser.ɵgetDOM().querySelectorAll(this._doc, '[id^=root]');
      for (var i = 0; i < oldRoots.length; i++) {
        _angular_platformBrowser.ɵgetDOM().remove(oldRoots[i]);
      }
      _angular_platformBrowser.ɵgetDOM().appendChild(this._doc.body, rootEl);
    };
    return DOMTestComponentRenderer;
  }(_angular_core_testing.TestComponentRenderer));
  DOMTestComponentRenderer.decorators = [{type: _angular_core.Injectable}];
  DOMTestComponentRenderer.ctorParameters = function() {
    return [{
      type: undefined,
      decorators: [{
        type: _angular_core.Inject,
        args: [_angular_platformBrowser.DOCUMENT]
      }]
    }];
  };
  var platformBrowserDynamicTesting = _angular_core.createPlatformFactory(_angular_compiler_testing.platformCoreDynamicTesting, 'browserDynamicTesting', _angular_platformBrowserDynamic.ɵINTERNAL_BROWSER_DYNAMIC_PLATFORM_PROVIDERS);
  var BrowserDynamicTestingModule = (function() {
    function BrowserDynamicTestingModule() {}
    return BrowserDynamicTestingModule;
  }());
  BrowserDynamicTestingModule.decorators = [{
    type: _angular_core.NgModule,
    args: [{
      exports: [_angular_platformBrowser_testing.BrowserTestingModule],
      providers: [{
        provide: _angular_core_testing.TestComponentRenderer,
        useClass: DOMTestComponentRenderer
      }]
    }]
  }];
  BrowserDynamicTestingModule.ctorParameters = function() {
    return [];
  };
  exports.platformBrowserDynamicTesting = platformBrowserDynamicTesting;
  exports.BrowserDynamicTestingModule = BrowserDynamicTestingModule;
  exports.ɵDOMTestComponentRenderer = DOMTestComponentRenderer;
  Object.defineProperty(exports, '__esModule', {value: true});
})));
