const initialState = {
    audioActive: true,
    videoActive: true,
    chatActive: true,
    messageLimit: 50,
    nickname: ''
};

export default class LocStorageClass {
    constructor() {
        this.name = 'app/settings';
        if (!localStorage.getItem(this.name))
            localStorage.setItem(this.name, JSON.stringify(initialState))
    }

    addValue(key, value) {
        let obj = JSON.parse(localStorage.getItem(this.name));
        obj[key] = value;
        localStorage.setItem(this.name, JSON.stringify(obj));
    }

    rewriteObjectValue(value) {
        localStorage.setItem(this.name, JSON.stringify(value));
    }

    getValue(key) {
        let obj = JSON.parse(localStorage.getItem(this.name));
        return obj[key];
    }

    getAllValues(){
        return JSON.parse(localStorage.getItem(this.name));
    }

    deleteValue(key) {
        let obj = JSON.parse(localStorage.getItem(this.name));
        if (key in obj) {
            delete obj[key];
            localStorage.setItem(this.name, JSON.stringify(obj));
            return true;
        } else return false;
    }

    clearStorage(){
        localStorage.setItem(this.name, JSON.stringify(initialState));
    }

    getKeys() {
        let obj = JSON.parse(localStorage.getItem(this.name));
        return Object.keys(obj);
    }
}