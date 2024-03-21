import Person from "./person.js";
export default class Student extends Person {
    constructor(name, diaChi, id, email, loai, Toan, Ly, Hoa) {
        super(name, diaChi, id, email, loai);
        this.Toan = Toan;
        this.Ly = Ly;
        this.Hoa = Hoa;
    }

    dtb() {
        return (this.Toan + this.Ly + this.Hoa) / 3;
    }
}