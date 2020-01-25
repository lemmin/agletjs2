function Aglet (element, name) {
	this._dom;
	this._name;

	this._constructor(element, name);

	this.setText = function (text, before) {
		if (!this._dom.childNodes.length) {
			this._dom.innerText = text;
			return;
		}
		else if (this._dom.childNodes[0].nodeType == 3) {
			this._dom.childNodes[0].textContent = text;
			return;
		}
		else {
			this._dom.innerText = text;
		}
	}

	this.setHTML = function (html, before) {
		this._dom.innerHTML = html;
	}

	this.newAglet = function (aglet) {
		let newdom = aglet.cloneNode(1);
		return this._appendAglet(new Aglet(newdom), 1);
	}
}

Aglet.prototype._constructor = function (element, name) {
	this._dom = element;
	this._name = name || element.getAttribute('ag-name') || element.id;

	// Create a passthrough function for all HTMLElement methods.
	// Note: This should use HTMLElement, but HTMLElement.prototype[prop] throws an error?
	var test = document.createElement('div');
	for (let prop in test) {
		if (typeof test[prop] == 'function') {
			this[prop] = function (...args) {
				return this._dom[prop].apply(this._dom, args);
			};
		}
	}

	this._findAglets(element, this);
}

Aglet.prototype._findAglets = function (element, parent) {
	for (let child of element.children) {
		let id = child.getAttribute('ag-name') || child.id;
		if (id) {
			parent._appendAglet(new Aglet(child, id));
		}
		else if (child.children.length) {
			this._findAglets(child, parent);
		}
	}
}

Aglet.prototype._appendAglet = function (aglet, appendDOM) {
	let name = aglet._name || 'anonymous_aglet';

	if (Array.isArray(this[name])) {
		this[name].push(aglet);
	}
	else if (this[name]) {
		this[name] = [this[name], aglet];
	}
	else {
		this[name] = aglet;
	}

	if (appendDOM) {
		this._dom.appendChild(aglet._dom);
	}

	return aglet;
}
