function Aglet (element, name) {
	this._dom;
	this._name;

	this._constructor(element, name);
}

Aglet.prototype._constructor = function (element, name) {
	this._dom = element;
	this._name = name || element.getAttribute('ag-name') || element.id;

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
}
