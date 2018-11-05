'use babel';

import AtomP5ref from '../lib/atom-p5ref';

// Use the command `window:run-package-specs` (cmd-alt-ctrl-p) to run specs.
//
// To run a specific `it` or `describe` block add an `f` to the front (e.g. `fit`
// or `fdescribe`). Remove the `f` to unfocus the block.

describe('AtomP5ref', () => {
  let workspaceElement, activationPromise;

  beforeEach(() => {
    workspaceElement = atom.views.getView(atom.workspace);
    activationPromise = atom.packages.activatePackage('atom-p5ref');
  });

  describe('when the atom-p5ref:toggle event is triggered', () => {
    it('hides and shows the modal panel', () => {
      // Before the activation event the view is not on the DOM, and no panel
      // has been created
      expect(workspaceElement.querySelector('.atom-p5ref')).not.toExist();

      // This is an activation event, triggering it will cause the package to be
      // activated.
      atom.commands.dispatch(workspaceElement, 'atom-p5ref:toggle');

      waitsForPromise(() => {
        return activationPromise;
      });

      runs(() => {
        expect(workspaceElement.querySelector('.atom-p5ref')).toExist();

        let atomP5refElement = workspaceElement.querySelector('.atom-p5ref');
        expect(atomP5refElement).toExist();

        let atomP5refPanel = atom.workspace.panelForItem(atomP5refElement);
        expect(atomP5refPanel.isVisible()).toBe(true);
        atom.commands.dispatch(workspaceElement, 'atom-p5ref:toggle');
        expect(atomP5refPanel.isVisible()).toBe(false);
      });
    });

    it('hides and shows the view', () => {
      // This test shows you an integration test testing at the view level.

      // Attaching the workspaceElement to the DOM is required to allow the
      // `toBeVisible()` matchers to work. Anything testing visibility or focus
      // requires that the workspaceElement is on the DOM. Tests that attach the
      // workspaceElement to the DOM are generally slower than those off DOM.
      jasmine.attachToDOM(workspaceElement);

      expect(workspaceElement.querySelector('.atom-p5ref')).not.toExist();

      // This is an activation event, triggering it causes the package to be
      // activated.
      atom.commands.dispatch(workspaceElement, 'atom-p5ref:toggle');

      waitsForPromise(() => {
        return activationPromise;
      });

      runs(() => {
        // Now we can test for view visibility
        let atomP5refElement = workspaceElement.querySelector('.atom-p5ref');
        expect(atomP5refElement).toBeVisible();
        atom.commands.dispatch(workspaceElement, 'atom-p5ref:toggle');
        expect(atomP5refElement).not.toBeVisible();
      });
    });
  });
});
