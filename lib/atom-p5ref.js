'use babel';

import AtomP5refView from './atom-p5ref-view';
import { CompositeDisposable } from 'atom';

export default {

  atomP5refView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.atomP5refView = new AtomP5refView(state.atomP5refViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.atomP5refView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'atom-p5ref:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.atomP5refView.destroy();
  },

  serialize() {
    return {
      atomP5refViewState: this.atomP5refView.serialize()
    };
  },

  toggle() {
    console.log('AtomP5ref was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
