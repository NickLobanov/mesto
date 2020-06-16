export class Section {
    constructor({data, renderer}, containerSelecrot) {
        this._renderedItems = data;
        this._renderer = renderer;
        this._container = document.querySelector(containerSelecrot);
    }

    renderItems() {
        this._renderedItems.forEach(item => this._renderer(item))
    }

    setItem(element) {
        this._container.append(element)
    }
}