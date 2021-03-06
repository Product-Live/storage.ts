"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Counter = void 0;
const time_util_1 = require("time.util");
class Counter {
    constructor(duration = 60000) {
        this._data = {};
        this._duration = {};
        this.defaultDuration = duration;
    }
    clean(key) {
        if (!this._data[key]) {
            return [];
        }
        const now = time_util_1.time.now() + (this._duration[key] ? this._duration[key] : -this.defaultDuration);
        let i = 0;
        while (this._data[key][i]) {
            if (this._data[key][i].time < now || !this._data[key][i].value) {
                i++;
            }
            else {
                break;
            }
        }
        if (i !== 0) {
            this._data[key].splice(0, i);
        }
        return this._data[key];
    }
    duration(key, duration) {
        this._duration[key] = Math.abs(duration) * -1;
    }
    add(key, value) {
        const v = Number(value) || 0;
        if (!v) {
            return;
        }
        if (!this._data[key]) {
            this._data[key] = [];
        }
        this._data[key].push({ value: v, time: time_util_1.time.now() });
    }
    get(key) {
        return this.clean(key);
    }
    reduce(key) {
        return this.get(key).reduce((a, b) => {
            return (b.value) ? a + b.value : a;
        }, 0);
    }
    all() {
        const o = {};
        for (const i in this._data) {
            o[i] = this.clean(i);
        }
        return o;
    }
}
exports.Counter = Counter;
//# sourceMappingURL=counter.js.map