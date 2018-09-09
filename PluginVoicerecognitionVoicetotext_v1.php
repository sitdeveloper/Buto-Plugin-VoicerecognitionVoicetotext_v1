<?php
/**
<p>
Voice to text.
</p>
 */
class PluginVoicerecognitionVoicetotext_v1{
  /**
  <p>
  Including Javascript in html/head.
  </p>
#code-javascript#
#load:[app_dir]/plugin/[plugin]/public/plugin_voicerecognition_voicetotext_v1.js:load#
#code#
  */
  public static function widget_include($data){
    $element[] = wfDocument::createHtmlElement('script', null, array('src' => '/plugin/voicerecognition/voicetotext_v1/plugin_voicerecognition_voicetotext_v1.js', 'type' => 'text/javascript'));
    wfDocument::renderElement($element);
  }
}