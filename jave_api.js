define(function() {

    /**
     * JaveApi Constructor
     * @param {jQuery} $el            the element being queried.
     * @param {string} behaviour_name the name of the behaviour in question.
     */
    var JaveApi = function($el, behaviour_name) {
        this.$el     = $el;
        this._prefix = filter.hyphenate();

        if(this._prefix.substring(0, 1) == '-') {
            this._prefix = this._prefix.substring(1);
        }

        this._prefix += '-';

        this._options = JSON.decode(this.$el.data(this._prefix + 'options'));
    };

    /**
     * Gets an option.
     * @param  {string} what option name.
     * @param  {mixed}  dflt default value.
     * @return {mixed}       the value of the option.
     */
    JaveApi.prototype.get = function(what, dflt) {
        var value = JSON.decode(this.$el.data(this._prefix+what));

        if(value === null && this._options[what] !== undefined) {
            value = this._options[what];
        }

        if(value === null && typeof dflt != 'undefined') {
            return dflt;
        } else {
            return value;
        }
    };

    /**
     * Gets an option as a specific data-type.
     * @param  {string} what option name.
     * @param  {string} type desired datatype.
     * @param  {mixed}  dflt default value.
     * @return {mixed}       the value of the option.
     */
    JaveApi.prototype.getAs = function(what, type, dflt) {
        var value = this.get(what, dflt);

        switch(type.toLowerCase()) {
            case "bool":
            case "boolean":
                value = !!value;
                break;
            case "int":
            case "integer":
                value = parseInt(value, 10);
                break;
            case "float":
                value = parseFloat(value, 10);
                break;
            case "string":
                value = "" + value;
                break;
        }

        return value;
    };

    return JaveApi;
});