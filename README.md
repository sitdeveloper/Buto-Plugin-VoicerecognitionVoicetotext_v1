# Buto-Plugin-VoicerecognitionVoicetotext_v1
Javascript plugin to put users voice in an element.

## Features
- Add text if standing in input or textarea.
- Run method on words.

## Browser support
### MacOS
- Chrome, 118.0.


## Include
Include in page head section.
````
type: widget
data:
  plugin: voicerecognition/voicetotext_v1
  method: include
````

## Usage
````
var voice = new plugin_voicerecognition_voicetotext_v1();
voice.setCommand([
  {word: ['password'], method: function(){document.getElementById('password').focus();}}, 
  {word: ['decrypted text'], method: function(){document.getElementById('text_decrypted').focus();}}, 
  {word: ['encrypted text'], method: function(){document.getElementById('text_encrypted').focus();}}, 
  {word: ['encrypt'], method: function(){document.getElementById('btn_encrypt').click();}}, 
  {word: ['decrypt', 'the crypt'], method: function(){document.getElementById('btn_decrypt').click();}}, 
  {word: ['upload'], method: function(){document.getElementById('wfUploadFile1').click();}}, 
  {word: ['reload', 'home'], method: function(){document.getElementById('btn_home').click();}}, 
  {word: ['account'], method: function(){document.getElementById('btn_account').click();}}, 
  {word: ['clear password'], method: function(){document.getElementById('password').value='';}}, 
  {word: ['clear voice'], method: function(){document.getElementById('voice').innerHTML='';}}, 
  {word: ['yes'], method: function(){alert('You said yes!');}}
]);
voice.setTargetId('voice');
voice.setFormInput(true);
voice.onresult(function(){
  //var word = event.results[event.results.length-1][0].transcript.trim().toLowerCase();
  //console.log(word);
});
voice.start();
````
