class Contact {
    get id() {
        return this._id;
    }
    set id(id) {
        this._id = id;
    }
    get name() {
        return this._name;
    }
    set name(name) {
        let nameRegex = RegExp("^([A-Z]{1}[A-Za-z]{2,}[ ]?){1,}$");
        if (nameRegex.test(name))
            this._name = name;
        else throw "Invalid Name!";
    }
    get phone() {
        return this._phone;
    }
    set phone(phone) {
        let phoneRegex = RegExp("^[+]?([0-9]{2})?[1-9]{1}[0-9]{9}$");
        if (phoneRegex.test(phone))
            this._phone = phone;
        else throw "Invalid Phone!"
    }
    get address() {
        return this._address;
    }
    set address(address) {
        let addressRegex = RegExp("^([A-Za-z0-9/,-]{3,}[ ]?)+$");
        if (addressRegex.test(address))
            this._address = address;
        else throw "Invalid Address!";
    }
    get city() {
        return this._city;
    }
    set city(city) {
        this._city = city;
    }
    get state() {
        return this._state;
    }
    set state(state) {
        this._state = state;
    }
    get zip() {
        return this._zip;
    }
    set zip(zip) {
        this._zip = zip;
    }
    toString() {
        return "Name: " + this.name + ", Address: " + this.address + ", City: " + this.city + ", State: " +
            this.state + ", Zip: " + this.zip + ", Phone: " + this.phone;
    }
}