function Floater (opts) {
	this.defaults = {
		class: 'floater',
		attribute: 'label',
		usePlaceholder: true
	};

	this.opts = opts || this.defaults;
	return this;
}

Floater.prototype.createLabels = function () {
	var elements = document.getElementsByClassName(this.opts.class);
	if (!elements || elements.length <= 0) {
		return;
	}

	
}

Floater.prototype.float = function () {
	this.createLabels();
}

