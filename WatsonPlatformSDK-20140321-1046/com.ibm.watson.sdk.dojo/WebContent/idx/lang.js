//>>built
define("idx/lang",["dojo/_base/lang","idx/main"],function(_1,_2){var _3=_1.getObject("lang",true,_2);_2.startsWith=_3.startsWith=function(_4,_5){return (_1.isString(_4)&&_1.isString(_5)&&_4.indexOf(_5)===0);};_2.endsWith=_3.endsWith=function(_6,_7){return (_1.isString(_6)&&_1.isString(_7)&&_6.indexOf(_7)===_6.length-_7.length);};_2.equalsIgnoreCase=_3.equalsIgnoreCase=function(s1,s2){return (_1.isString(s1)&&_1.isString(s2)&&s1.toLowerCase()===s2.toLowerCase());};_2.isNumber=_3.isNumber=function(n){return (typeof n=="number"&&isFinite(n));};_2.getByteLengthInUTF8=_3.getByteLengthInUTF8=function(s){if(!s){return null;}var _8=encodeURIComponent(s);_8=_8.replace(/%[0-9A-F][0-9A-F]/g,"*");return _8.length;};return _3;});