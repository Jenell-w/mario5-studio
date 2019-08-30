
var mario = new Vue({
    el: 'main',
    data: function() {
        return {
            heightStr: 0,
            height: 5
        }
    },
        computed: {
            rows: function() {
               return pyramidRows(this.height)
            // TODO 5
            // Fill out this computed property by calling
            // pyramidRows on this.height.
        },
        error: function() {
            return checkForErrors() 
        }
        // Make a new computed property 'error'.
        // It should be the result of calling checkForErrors on this.heightStr.
        

    },
    methods: {
        clearAndRedraw(evt) {
            // Stop the form from causing a page refresh.
            evt.preventDefault();

            if (this.error) {
                // Stop drawing, we've got errors.
                return;
            }

            this.height = parseInt(this.heightStr);

            var pyramid = document.querySelector('#pyramid');
            pyramid.innerHTML = '';

            // Again, isn't Vue supposed to help with this...
            var rows = pyramidRows(this.rows); // TODO 5: Use this.rows instead (the computed property you just made)
            for (var ix = 0; ix < rows.length; ix++) {
                var row = document.createElement('p');
                row.innerHTML = rows[ix];
                pyramid.appendChild(row);
            }
        },
    },
});


/**
 * checkForErrors
 *
 * Check the row input for the following cases, and return an
 * appropriate error (as a string):
 *
 * 1. No height provided (empty string)
 * 2. Height is not a number, or is less than 1
 * 3. Height is more than 100.
 *
 * If there is no error, return null
 */
function checkForErrors(heightStr) {
    // TODO 1
    if (heightStr === '') {
        let error = "Please enter a height"
        return error;
    }
    if (isNaN(heightStr)) {
        let error = "Height is not a number"
        return error;
    }
    if (heightStr < 1 || heightStr >100) {
        let error = "Height must be greater than 1 and less than 100"
        return error;
    }
    return null;
    
  }


/**
 * drawPyramid
 *
 * Renders, as a list of html strings, a Mario pyramid of the specified height
 */
function pyramidRows(height) {

    var rowStrings = [];
    // for each row....
    for (var row = 0; row < height; row++) {

        // figure out number of bricks and spaces
        var numBricks = row + 2;
        var numSpaces = height - row - 1;

        // build up a string for this row
        var rowStr = "";
        for (var i = 0; i < numSpaces; i++) {
            var spaceChar = "&nbsp";
            rowStr += spaceChar;
        }
        for (var i = 0; i < numBricks; i++) {
            rowStr += "#";
        }

        rowStrings.push(rowStr);
    }
    return rowStrings;
}
