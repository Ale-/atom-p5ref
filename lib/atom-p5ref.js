'use babel';

import { CompositeDisposable } from 'atom';

export default {

  atomP5refView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
      // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
      this.subscriptions = new CompositeDisposable();

      // Register command that toggles this view
      this.subscriptions.add(atom.commands.add('atom-workspace', {
        'atom-p5ref:look': () => this.lookFor()
      }));
  },

  lookFor() {
       const editor = atom.workspace.getActiveTextEditor()
       var text = editor.getSelectedText()
       atom.workspace.open('https://processing.org/reference/' + text + '_.html')
  }

};
