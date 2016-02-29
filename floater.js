function Floater (opts) {
	this.opts = {
		class: 'floater',
		attribute: 'label',
		usePlaceholder: true,
	};

	this.combineOpts(opts);

	if (this.opts.usePlaceholder) {
		this.opts.attribute = 'placeholder';
	}

	return this;
}

Floater.prototype.combineOpts = function (opts) {
	opts = opts || {};
	for (var attr in opts) {
		this.opts[attr] = opts[attr];
	}
}

Floater.prototype.getElements = function () {
	this.elements = document.getElementsByClassName(this.opts.class);
}

Floater.prototype.createElements = function () {
	for (var i = 0; i < this.elements.length; i++) {
		var el = this.elements[i];
		var container = this.createContainer(el);
		el.parentNode.insertBefore(container, el.nextSibling);

		var lbl = this.createLabel('floater-label', el);
		var error = this.createLabel('floater-message');
		container.appendChild(lbl);
		container.appendChild(error);
		container.appendChild(el);

		if (el.value) {
			this.show(lbl);
		} else {
			this.hide(lbl);
		}

		this.bindEvent(el, lbl);
	}
}

Floater.prototype.createContainer = function (el) {
	var container = document.createElement('div');
	container.setAttribute('floater-id', el.getAttribute('floater-id'));
	el.removeAttribute('floater-id');
	container.className = el.className.replace(/floater/g, '');
	container.className += ' floater-container';
	return container;
}

Floater.prototype.createLabel = function (className, element) {
	var node = document.createElement('span');
	node.className = className;
	if (element) {
		node.innerHTML = this.getText(element);
	}
	return node;
}

Floater.prototype.bindEvent = function (element, label) {
	element.addEventListener('focus', (function () {
		if (label.className.match(/visible/g)) {
			return;
		}

		this.show(label);
	}).bind(this));

	element.addEventListener('blur', (function () {
		if (element.value.length > 0) {
			return;
		}

		this.hide(label);
	}).bind(this));
}

Floater.prototype.getText = function (element) {
	return element.getAttribute(this.opts.attribute);
}

Floater.prototype.hasElements = function () {
	return this.elements && this.elements.length > 0;
}

Floater.prototype.float = function () {
	this.getElements();

	if (!this.hasElements()) {
		return;
	}

	this.createElements();
	return this;
}

Floater.prototype.message = function (opts) {
	if (!opts || !opts.id || !opts.text) {
		return;
	}

	opts.type = opts.type || 'good';

	var container = document.querySelector('[floater-id="' + opts.id + '"]');
	var textField = container.getElementsByClassName(this.opts.class)[0];
	var el = container.getElementsByClassName('floater-message')[0];

	if (!el) {
		return;
	}

	el.innerHTML = this.escapeHtml(opts.text);
	this.show(el);
	el.className += ' ' + opts.type;

	textField.addEventListener('keyup', (function () {
		this.hide(el);
	}).bind(this));
}

Floater.prototype.hide = function (el) {
	el.className = el.className.replace(/visible/g, '') + ' hidden';
}

Floater.prototype.show = function (el) {
	el.className = el.className.replace(/hidden/g, '') + ' visible';
}

Floater.prototype.escapeHtml = function (html) {
	return html
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;")
		.replace(/'/g, "&#039;");
}
