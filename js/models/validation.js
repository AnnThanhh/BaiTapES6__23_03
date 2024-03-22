function Validation() {
  this.kiemTraTong = function (value, spanId, message) {
    if (value === "") {
      document.getElementById(spanId).innerHTML = message;
      return false;
    }

    document.getElementById(spanId).innerHTML = "";
    return true;
  };

  this.kiemTraChuoiKiTu = function (value, spanId, message) {
    const letter =
      "^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" +
      "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" +
      "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$";
    if (value.match(letter)) {
      // hợp lệ
      document.getElementById(spanId).innerHTML = "";
      return true;
    }

    // k hợp lệ
    document.getElementById(spanId).innerHTML = message;
    return false;
  };

  this.kiemTraEmail = function (value, spanId, mess) {
    const letter = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (value.match(letter)) {
      // hợp lệ
      document.getElementById(spanId).innerHTML = "";
      return true;
    }

    // k hợp lệ
    document.getElementById(spanId).innerHTML = mess;
    return false;
  };

  this.kiemTraMaTonTai = function (value, spanId, mess, dataList) {
    let exist = false;

    for (let i = 0; i < dataList.length; i++) {
      const sv = dataList[i];
      if (sv.maSV === value) {
        exist = true;
        break;
      }
    }

    if (exist) {
      // k hợp lệ
      document.getElementById(spanId).innerHTML = mess;
      return false;
    }

    // hợp lệ
    document.getElementById(spanId).innerHTML = "";
    return true;
  };
}
