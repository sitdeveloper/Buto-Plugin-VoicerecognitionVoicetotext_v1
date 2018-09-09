function plugin_voicerecognition_voicetotext_v1(){
  var self      = this;
  var started   = false;
  var target_id = null;
  var lang      = 'en-US';
  var last_word = null;
  var counter = 0;
  this.getCounter = function(){return counter;}
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
  var form_input = false;
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
  this.setFormInput =  function(v){form_input = v;}
  this.start =        function(){
    if(started){
      // Already started!
    }else{
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = lang;
      recognition.onstart      = function(event) {onstart(); started = true;}
      recognition.onend        = function(event) {onend();   recognition.start();}
      recognition.onsoundstart = function(event) {onsoundstart();}
      recognition.onsoundend   = function(event) {
        onsoundend();
        text += "<hr>";
      }
      recognition.onaudiostart = function(event) {onaudiostart();}
      recognition.onaudioend   = function(event) {onaudioend();}
      recognition.onresult   = function(event) {self.handle_result(); onresult();}
      recognition.start();
    }
  }
  this.handle_result = function(){
    if(started){
      var last_word = null;
      var text_last = "";
      for(var i=event.resultIndex; i<event.results.length; i++){
        var transcript = event.results[i][0].transcript;
        transcript.replace("\n", "<br>");
        if(event.results[i].isFinal){
          counter++;
          text += counter+": "+transcript+"<br>";
          last_word = transcript.trim().toLowerCase();
        }
        else{
          text_last += transcript;
        }
        /**
         * Set words in a element.
         */
        if(target_id){
          document.getElementById(target_id).innerHTML = text + ' <span style="color: #999;">' + text_last + '</span>';
        }
      }
      /**
       * Run methods depending on last word.
       */
      if(last_word){
        for(var i=0;i<command.length;i++){
          for(var j=0;j<command[i].word.length;j++){
            if(command[i].word[j]==last_word){
              command[i].method();
              break;
            }
          }
        }
      }
      /**
       * Set last word in field.
       */
      if(form_input && last_word){
        if(document.activeElement.tagName=='INPUT'){
          if(document.activeElement.value.length==0){
            document.activeElement.value = last_word;
          }
        }
        if(document.activeElement.tagName=='TEXTAREA'){
          if(document.activeElement.innerHTML.length){
            document.activeElement.innerHTML += " "+last_word;
          }else{
            document.activeElement.innerHTML = last_word;
          }
        }
      }
      this.last_word = last_word;
    }
  }
}