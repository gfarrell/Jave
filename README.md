Jave, a jQuery Behaviour API
============================

Many libraries have plugins that are designed to automatically be applied to all elements of a certain attribute (normally a class). This sort of hooking is often done in a variety of ways, which makes having a lot of libraries doing this a bit inefficient (not to mention non-standard).

Jave aims to fix this by introducing a simple API for defining behaviours, which hook into a specific element attribute. These are then applied to all the elements at once after the DOM has loaded.

In short: Jave applies behaviour filters to bind javascript and DOM without additional scripting on page, thus decoupling layout and script.

Usage
-----

### Defining behaviours

A behaviour is basically a function that normally triggers the instantiation and attachment of other classes (but can contain anything really). Behaviours are defined using `$.jave.define`, for example:

    $.jave.define('my-behaviour', function($el, api) {
        // do some stuff here
    });

The first argument, the behaviour name, is the data-behaviour attribute that this behaviour will be associated with. The second argument is the behaviour itself.

All behaviours should have the function signature `function($el, api)`. The first argument is just the jQuery'd element, but the second argument is an instance of the JaveAPI applied to this element.

### The JaveAPI object

An instance of JaveAPI is attached to a particular element/behaviour combination and is used for retrieving specific values from the element.

Behaviours can have options defined in the HTML tag's attributes. These should take the form `data-my-behaviour-options`, as a serialised JSON object, or `data-my-behaviour-opt1`, which take individual options.

The JaveAPI can then be used to retrieve the values of these options, and to define default options if those aren't present. For example:

    api.get('option_name'); // retrieves the value of data-my-behaviour-option_name
    api.getAs('option_name', 'boolean'); // retrieves the value as a boolean

    api.get('option_name', 'hello'); // default value is hello
    api.getAs('option_name', 'boolean', true); // default value is true

### A working example

I have a validation class that I wish to apply to all inputs of a certain type. Each input can have specific validation criteria.

In HTML:

    <form action="/myform">
        <input type="text" name="email" data-behaviour="validate" data-validate-type="email" data-validate-required="true" />
        <input type="password" name="password" />

        <button type="submit">Submit</button>
    </form>

My behaviour definition:

    $.jave.define('validate', function($el, api) {
        var v = new Validator($el, {
            type:     api.get('type'),
            required: api.getAs('required', 'boolean', false)
        });
        // ...
    });

Now, when the DOM is ready, my *validate* filter will be applied to all elements with the attribute `data-behaviour="validate"`.


Prerequisites
-------------

Jave is defined as an AMD module, with [http://www.requirejs.org](require.js) in mind. You can remove the module definition to have it as a simple class file, but I would recommend leaving it as is and just getting to grips with require.js. Jave requires a JSON library of your choice (as long as `JSON.decode()` exists).

It also requires jQuery, of course.

Inspiration
-----------

Jave was inspired by Anutron's Mootools-Behavior.