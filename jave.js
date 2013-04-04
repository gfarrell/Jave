define(['jquery', './jave_api'], function($, JaveAPI) {
    var behaviours = {},
    jave       = function(options) {
        var defaults = {
            selector: '[data-behaviour]',
            auto:     true
        };

        /* todo: merge defaults */
    };

    /**
     * Define a behaviour
     * @param  {string}   name the data-behaviour attribute (behaviour name)
     * @param  {Function} fn   the function that will be run. Should take ($el, api) as arguments (see README for more info).
     * @return {void}
     */
    jave.define = function(name, fn) {
        // todo: define a behaviour
    };

    /**
     * Runs Jave, optionally on a particular element containing behaving elements.
     * @param  {jQuery} $root the root element containing elements with behaviours.
     * @return {void}
     */
    jave.run = function($root) {
        // todo: run all behaviours
    };

    /**
     * Process an element and apply behaviours.
     * @param  {jQuery} $el the element to process
     * @return {void}
     */
    jave.process = function($el) {
        // todo: process an element, choose behaviour and apply it
    };
});