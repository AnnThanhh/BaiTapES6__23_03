import Person from "./person.js";
export default class Employee extends Person {
  constructor(_id, _name, _diaChi, _email, _loai, _tongNgay, _luongNgay) {
    super(_id, _name, _diaChi, _email, _loai);
    this.tongNgay = _tongNgay;
    this.luongNgay = _luongNgay;
    this.tongLuong = 0
  }
  tinhTongLuong() {
    this.tongLuong = this.tongNgay * this.luongNgay;
  }
}
