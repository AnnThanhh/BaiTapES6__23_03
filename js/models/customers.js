import Person from "./person.js";
export default class Customer extends Person {
  constructor(name, address, id, email, loai, congTy, giaTriDon, danhGia) {
    super(name, address, id, email, loai);
    this.congTy = congTy;
    this.giaTriDon = giaTriDon;
    this.danhGia = danhGia;
  }
}
