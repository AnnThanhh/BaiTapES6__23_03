import Person from "./person.js";
export default class Student extends Person {
    constructor(_id, _name, _diaChi, _email, _loai, _Toan, _Ly, _Hoa) {
        super(_id, _name, _diaChi, _email, _loai);
        this.Toan = _Toan;
        this.Ly = _Ly;
        this.Hoa = _Hoa;
        this.dtb = 0
    }
    tinhDTB() {
        this.dtb = (this.Toan + this.Ly + this.Hoa) / 3;
      }
}