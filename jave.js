define(['jquery', 'jave_api'], function($, JaveAPI) {
    $.jave = {
        /**
         * Dictionary of behaviours
         * @type {Object}
         */
        _behaviours: {},

        init: function(options) {
            var defaults = {
                selector: '[data-behaviour]',
                auto:     true,
                root:     document.body
            };

            this.options = (typeof options == 'object') ? $.merge(defaults, options) : defaults;

            if(this.options.auto) this.run();
        },

        /**
         * Define a behaviour
         * @param  {string}   name the data-behaviour attribute (behaviour name)
         * @param  {Function} fn   the function that will be run. Should take ($el, api) as arguments (see README for more info).
         * @return {void}
         */
        define: function(name, fn) {
            if(typeof fn == 'function') {
                if(!this._behaviours.hasOwnProperty(name)) {
                    this._behaviours[name] = fn;
                } else {
                    throw new Error('Jave: behaviour "' + name + '" is already defined.');
                }
            } else {
                throw new Error('Jave: behaviour definitions must be functions ("' + name + '").');
            }
        },

        /**
         * Runs Jave, optionally on a particular element containing behaving elements.
         * @param  {jQuery} $root the root element containing elements with behaviours.
         * @return {void}
         */
        run: function($root) {
            if($root === undefined || $root === null) {
                $root = $(this.options.root);
            } 

            var children = $root.find(this.options.selector);
            $.each(children, function(i, el) {
                $.jave.process($(el));
            });
        },

        /**
         * Process an element and apply behaviours.
         * @param  {jQuery} $el the element to process
         * @return {void}
         */
        process: function($el) {
            var applied_behaviours  = $el.data('applied-behaviours'),
                behaviours          = $el.data('behaviour').split(' ');

            if(typeof applied_behaviours != 'object') {
                applied_behaviours = [];
            }

            $.each(behaviours, function(i, b) {
                if(applied_behaviours.indexOf(b) == -1) {
                    $.jave.__makeBehave($el, b);

                    applied_behaviours.push(b);
                    $el.data('applied-behaviours', applied_behaviours);
                }
            });
        },

        /**
         * Make an element use a behaviour.
         * @param  {jQuery} $el       the element in question.
         * @param  {string} behaviour the behaviour name.
         * @return {void}
         */
        __makeBehave: function($el, behaviour) {
            var api = new JaveAPI($el, behaviour);
            if (!this._behaviours.hasOwnProperty(behaviour)) {
                throw new Error('Jave: no such behaviour "' + behaviour + '" has been defined.');
            }
            this._behaviours[behaviour].call(this, $el, api);
        }
    };

    // define shortcut as a jQuery plugin
    $.fn.extend({
        jave: function() {
            $.jave.process($(this));
        }
    });

    return $.jave;
});