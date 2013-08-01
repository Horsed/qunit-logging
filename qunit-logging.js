$(document).ready(function() {
  
  QUnit.moduleStart = function(module) {
    console.group('Module: ' + module.name);
  };
  
  QUnit.moduleDone = function(test) {
    console.groupEnd();
  };
  
  QUnit.done = function(details) {
    console.log('failed: ' + details.failed + ', passed: ' + details.passed + ', total: ' + details.total + ', run time: ' + details.runtime + 'ms');
  };
  
  /**
   * Logging of QUnit assertions.
   */
  QUnit.log(function(details) {
    var isMSIE = /msie/.test(navigator.userAgent.toLowerCase()),
      colorCSS = 'background:' + (details.result ? 'green' : 'red') + ';color:white';

    details.message = details.message ? ': ' + details.message : ' ';
    if(details.result) {
      if(isMSIE) {
        console.log('[+++] %s: %s %s', details.module, details.name, details.message);
      } else {
        console.log('%c[+++]', colorCSS, details.module, ':',  details.name, details.message);
      }
    } else {
      if(isMSIE) {
        if(details.actual && details.expected)
          console.error('[---] %s: %s %s\n   (actual = %s, expected = %s)\n%s', details.module, details.name, details.message, details.actual, details.expected, details.source);
        else
          console.error('[---] %s: %s %s\n%s', details.module, details.name, details.message, details.source);
      } else {
        console.group('%c[---]', colorCSS, details.module, ':', details.name, details.message);
        if(details.actual && details.expected)
          console.log('(actual = %s, expected = %s)', details.actual, details.expected);
        console.log(details.source);
        console.groupEnd();
      }
    }
  });
});