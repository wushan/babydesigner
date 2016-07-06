CanvasComposer.History = function() {
    /**
     * Push the current state into the undo stack and then capture the current state
     */
    this.History.Update = function() {
      console.log(undo);
      console.log(redo);
      // clear the redo stack
      redo = [];
      $('#redo').addClass('disabled');
      // initial call won't have a state
      // console.log(state);
      if (state) {
        // console.log(state);
        undo.push(state);
        $('#undo').removeClass('disabled');
      }
      state = JSON.stringify(canvas);
    }

    /**
     * Save the current state in the redo stack, reset to a state in the undo stack, and enable the buttons accordingly.
     * Or, do the opposite (redo vs. undo)
     * @param playStack which stack to get the last state from and to then render the canvas as
     * @param saveStack which stack to push current state into
     * @param buttonsOn jQuery selector. Enable these buttons.
     * @param buttonsOff jQuery selector. Disable these buttons.
     */
    this.History.rePlay = function (playStack, saveStack, buttonsOn, buttonsOff) {
      if (state) {
        saveStack.push(state);
      }
      // console.log(undo);
      // console.log(redo);
      state = playStack.pop();
      var on = $(buttonsOn);
      var off = $(buttonsOff);
      // turn both buttons off for the moment to prevent rapid clicking
      on.addClass('disabled');
      off.addClass('disabled');
      canvas.clear();
      if (state !== undefined) {
        canvas.loadFromJSON(state, function() {
          canvas.renderAll();
          // now turn the buttons back on if applicable
          on.removeClass('disabled');
          if (playStack.length) {
            off.removeClass('disabled');
          }
        });
      } else {
        console.log('Reach Limit');
      }
    }
};
console.log(CanvasComposer);