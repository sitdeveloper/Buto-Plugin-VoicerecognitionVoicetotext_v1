function plugin_voicerecognition_voicetotext_v1(){
  var self      = this;
  var started   = false;
  var target_id = null;
  var lang      = 'en-US';
  var recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition)();
  var onstart =      function(){}
  var onend =        function(){}
  var onsoundstart = function(){}
  var onsoundend =   function(){}
  var onaudiostart = function(){}
  var onaudioend =   function(){}
  var onresult =     function(){}
  var command = [{word: ['speech'], method: function(){alert('You said speech!');}}, {word: ['buto'], method: function(){alert('You said buto!');}}]
  var text = "";
  this.setTargetId =  function(v){target_id = v;}
  this.setLang =      function(v){lang=v;}
  this.onstart =      function(v){onstart=v;}
  this.onend =        function(v){onend=v;}
  this.onsoundstart = function(v){onsoundstart=v;}
  this.onsoundend =   function(v){onsoundend=v;}
  this.onaudiostart = function(v){onaudiostart=v;}
  this.onaudioend =   function(v){onaudioend=v;}
  this.onresult =     function(v){onresult=v;}
  this.setCommand =   function(v){command = v;}
  this.start =        function(){
    if(started){
      // Already started!
    }else{
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = lang;
      recognition.onstart      = function(event) {onstart(); started = true;}
      recognition.onend        = function(event) {onend();   recognition.start();} //
      recognition.onsoundstart = function(event) {onsoundstart();}
      recognition.onsoundend   = function(event) {onsoundend(); text += "<hr>"; }
      recognition.onaudiostart = function(event) {onaudiostart();}
      recognition.onaudioend   = function(event) {onaudioend();}
      recognition.onresult   = function(event) {self.handle_result(); onresult();}
      recognition.start();
    }
  }
  this.handle_result = function(){
    if(started){
      /**
       * Run methods depending on last word.
       */
      var word = event.results[event.results.length-1][0].transcript.trim().toLowerCase();
      for(var i=0;i<command.length;i++){
        for(var j=0;j<command[i].word.length;j++){
          if(command[i].word[j]==word){
            command[i].method();
            break;
          }
        }
      }
      /**
       * Set words in a element.
       */
      if(target_id){
        var text_last = "";
        for(var i=event.resultIndex; i<event.results.length; i++){
          var transcript = event.results[i][0].transcript;
          transcript.replace("\n", "<br>");
          if(event.results[i].isFinal){
            text += " "+transcript;
          }
          else{
            text_last += transcript;
          }
          document.getElementById(target_id).innerHTML = text + ' <span style="color: #999;">' + text_last + '</span>';
        }
      }
    }
  }
}
