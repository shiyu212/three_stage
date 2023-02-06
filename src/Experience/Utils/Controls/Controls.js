import OribitControl from "./OribitControl";

let instance = null

export default class Control {
    constructor() {
        if (instance) {
            return instance
        }
        instance = this
        this.control = new OribitControl()
        this.control.use()
    }

    update() {
        this.control.update()
    }
}