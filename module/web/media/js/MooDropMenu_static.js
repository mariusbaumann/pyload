/*
---
description: This provides a simple Drop Down menu with infinit levels

license: MIT-style

authors:
- Arian Stolwijk

requires:
  - Core/Class.Extras
  - Core/Element.Event
  - Core/Selectors

provides: [MooDropMenu, Element.MooDropMenu]

...
*/

var MooDropMenu = new Class({

	Implements: [Options, Events],

	options: {
		onOpen: function(el){
			el.removeClass('open').addClass('open');
		},
		onClose: function(el){
			el.removeClass('open').addClass('open');
		},
		onInitialize: function(el){
			el.removeClass('open').addClass('open');
		},
		mouseoutDelay: 200,
		mouseoverDelay: 0,
		listSelector: 'ul',
		itemSelector: 'li'
	},

	initialize: function(menu, options, level){
		this.setOptions(options);
		options = this.options;

		var menu = this.menu = document.id(menu);

		menu.getElements(options.itemSelector + ' > ' + options.listSelector).each(function(el){
                        

			this.fireEvent('initialize', el);
                        
			var parent = el.getParent(options.itemSelector),
				timer;

			parent.addEvents({

				'mouseenter': function(){
					parent.store('DropDownOpen', true);

					clearTimeout(timer);
					if (options.mouseoverDelay) timer = this.fireEvent.delay(options.mouseoverDelay, this, ['open', el]);
					else this.fireEvent('open', el);

				}.bind(this),

				'mouseleave': function(){
					parent.store('DropDownOpen', true);

					clearTimeout(timer);
					timer = (function(){
						if (!parent.retrieve('DropDownOpen')) this.fireEvent('open', el);
					}).delay(options.mouseoutDelay, this);

				}.bind(this)
			});

		}, this);
	},

	toElement: function(){
		return this.menu
	}

});

/* So you can do like this $('nav').MooDropMenu(); or even $('nav').MooDropMenu().setStyle('border',1); */
Element.implement({
	MooDropMenu: function(options){
		return this.store('MooDropMenu', new MooDropMenu(this, options));
	}
});
