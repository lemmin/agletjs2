function Aglet (element, name, prefix) {
	this._dom;
	this._element; // Alias for _dom.
	this._name;
	this._prefix;

	this._constructor(element, name, prefix);

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
		return this._appendAglet(new Aglet(newdom, null, this._prefix), 1);
	}
}

Aglet.prototype._constructor = function (element, name, prefix) {
	this._dom = this._element = element;
	this._name = name || element.getAttribute('ag-name') || element.id;
	this._prefix = prefix ? prefix : '$';

	// Create a passthrough function for all HTMLElement methods.
	// Define all properties with an overridden setters and getters.
	for (let prop in element) {
		if (typeof element[prop] == 'function') {
			this[prop] = function (...args) {
				return this._dom[prop].apply(this._dom, args);
			};
		}
		else {
			Object.defineProperty(this, prop, {
				get: function () {
					return this._dom[prop];
				},
				set: function (val) {
					this._dom[prop] = val;
				}
			});
		}
	}

	this._findAglets(element, this);
}

Aglet.prototype._findAglets = function (element, parent) {
	for (let child of element.children) {
		let id = child.getAttribute('ag-name') || child.id;
		if (id) {
			parent._appendAglet(new Aglet(child, id, this._prefix));
		}
		else if (child.children.length) {
			this._findAglets(child, parent);
		}
	}
}

Aglet.prototype._appendAglet = function (aglet, appendDOM) {
	let name = this._prefix + aglet._name || 'anonymous_aglet';

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
