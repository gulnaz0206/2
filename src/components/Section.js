export default class Section {
    constructor({items, renderer}, selectorContainer) {
        this._renderedItems = items;
        this._renderer = renderer;
        //this._callback = callback;
        this._container = document.querySelector(selectorContainer)
    }

    renderItems = (callback) => {
        this._renderedItems.forEach((item) => { 
            const newElement = this._renderer({name: item.name, link: item.link}, callback)
            this.addItem(newElement);
        })
    }

    addItem = (element) => {
        this._container.prepend(element)
    }
}