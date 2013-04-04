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
        var applied_behaviours  = el.data('applied-behaviours'),
            behaviours          = el.data('behaviour').split(' ');

        if(typeOf(applied_behaviours) != 'array') {
            applied_behaviours = [];
        }

        $.each(behaviours, function(i, b) {
            if(applied_behaviours.contains(b) !== true) {
                $.jave.__makeBehave(b, el);

                applied_behaviours.push(b);
                el.data('applied-behaviours', applied_behaviours);
            }
        });
    };

    /**
     * Make an element use a behaviour.
     * @param  {jQuery} $el       the element in question.
     * @param  {string} behaviour the behaviour name.
     * @return {void}
     */
    jave.__makeBehave = function($el, behaviour) {
        var api = new JaveAPI($el, behaviour);
        if (!this._behaviours.hasOwnProperty(behaviour)) {
            throw new Error('Jave: no such behaviour "' + behaviour + '" has been defined.');
        }
        this._behaviours[behaviour].call(this, $el, api);
    };
});