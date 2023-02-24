export default class Popups {
    private btnText: string;

    constructor(btnText: string) {
        this.btnText = btnText;
    }

    draw() {
        console.log(this.btnText);
    }
}
