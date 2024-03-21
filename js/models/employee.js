import Person from "./person.js";
export default class Employee extends Person {
  constructor(name, diaChi, id, email, loai, tongNgay, luongNgay) {
    super(name, diaChi, id, email, loai);
    this.tongNgay = tongNgay;
    this.luongNgay = luongNgay;
  }

  tongLuong() {
    return this.tongNgay * this.luongNgay;
  }
}
