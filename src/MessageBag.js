class MessageBag {
    _items = [];

    constructor() {
    }

    add(bag, message) {
        this._items.push({bag, message});
    }

    first(bag) {
        if(this.has(bag)) {
            return this._filterBag(bag)[0].message;
        }
        throw new Error;
    }

    has(bag) {
        return this._filterBag(bag).length > 0;
    }

    get(bag) {
        return this._filterBag(bag).map(item => item.message);
    }

    _filterBag(bag) {
        return this._items.filter(item => item.bag === bag);
    }

    clear(bag) {
        this._items = this._items.filter(item => item.bag !== bag);
    }

    clearAll() {
        this._items = [];
    }
}

export default MessageBag;