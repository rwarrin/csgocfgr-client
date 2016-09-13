import Ember from 'ember';

const defaultValues = {
  volume: 1,
  sndMusicvolume: 0.7,
  windowsSpeakerConfig: -1,
  sndMixahead: 0.1,
  sndHeadphonePanExponent: 2,
  sndHeadphonePanRadialWeight: 1,
  sndLegacySurround: false,
  sndMuteLosefocus: true,
  voiceScale: 1,
  voiceEnable: true,
  lobbyVoiceChatEnabled: true,
};

export default Ember.Component.extend({
  data: defaultValues,
  speakerOptions: [
    {optionName: 'Default, Automatically Pick Best', id: -1},
    {optionName: 'Headphones', id: 1},
    {optionName: '4 Speakers', id: 3},
    {optionName: '2 Speakers', id: 4},
    {optionName: '5.1 Surround', id: 6},
  ],
  isOpen: false,
  actions: {
    toggleDisplay() {
      this.toggleProperty('isOpen');
    }
  }
});
