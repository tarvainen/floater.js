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
		var container = document.createElement('div');
		container.className = 'floater-container';
		el.parentNode.insertBefore(container, el.nextSibling);
		var lbl = this.createLabel(el);
		container.appendChild(lbl);
		container.appendChild(el);
		this.bindEvent(el, lbl);
	}
}

Floater.prototype.createLabel = function (element) {
	var node = document.createElement('span');
	node.className = 'floater-label';
	node.innerHTML = this.getText(element);
	return node;
}

Floater.prototype.bindEvent = function (element, label) {
	element.addEventListener('focus', (function () {
		if (label.className.match(/visible/g)) {
			return;
		}

		label.className = label.className.replace(/hidden/g, '');
		label.className += ' visible';
	}).bind(label, element));

	element.addEventListener('blur', (function () {
		if (element.value.length > 0) {
			return;
		}

		label.className = label.className.replace(/visible/g, '');
		label.className += 'hidden';
	}).bind(label, element));
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
}