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

	return aglet;
}

Aglet.prototype._newAglet = function (aglet) {
	let newdom = aglet._dom.cloneNode(1);

	aglet = this._appendAglet(new Aglet(newdom), 1);

	return aglet;
}