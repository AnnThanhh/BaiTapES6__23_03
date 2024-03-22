import Person from "./person.js";
export default class Customer extends Person {
  constructor(
    _id,
    _name,
    _diaChi,
    _email,
    _loai,
    _congTy,
    _giaTriDon,
    _danhGia
  ) {
    super(_id, _name, _diaChi, _email, _loai);
    this.congTy = _congTy;
    this.giaTriDon = _giaTriDon;
    this.danhGia = _danhGia;
  }
}
