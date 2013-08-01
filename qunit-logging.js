/*
 * QUnit Logging
 * Copyright (c) 2013 Martin Knopf Licensed under the MIT license.
 *
 * jQuery, QUnit
 * Copyright 2013 The jQuery Foundation.
 */
 
 $(document).ready(function() {

  var isMSIE = /msie/.test(navigator.userAgent.toLowerCase());
  
  QUnit.moduleStart = function(module) {
    if(!isMSIE) console.group('Module: ' + module.name);
  };
  
  QUnit.moduleDone = function(test) {
    if(!isMSIE) console.groupEnd();
  };
  
  QUnit.done = function(details) {
    console.log('failed: ' + details.failed + ', passed: ' + details.passed + ', total: ' + details.total + ', run time: ' + details.runtime + 'ms');
  };
  
  /**
   * Logging of QUnit assertions.
   */
  QUnit.log(function(details) {
    var colorCSS = 'background:' + (details.result ? 'green' : 'red') + ';color:white';

    details.message = details.message ? ': ' + details.message : ' ';
    if(details.result) {
      if(isMSIE) {
        console.log('[+++] %s: %s %s', details.module, details.name, details.message);
      } else {
        console.log('%c[+++]', colorCSS, details.name, details.message);
      }
    } else {
      if(isMSIE) {
        if(details.actual && details.expected)
          console.error('[---] %s: %s %s\n   (actual = %s, expected = %s)\n%s', details.module, details.name, details.message, details.actual, details.expected, details.source);
        else
          console.error('[---] %s: %s %s\n%s', details.module, details.name, details.message, details.source);
      } else {
        console.group('%c[---]', colorCSS, details.name, details.message);
        if(details.actual && details.expected)
          console.log('(actual = %s, expected = %s)', details.actual, details.expected);
        console.log(details.source);
        console.groupEnd();
      }
    }
  });
});