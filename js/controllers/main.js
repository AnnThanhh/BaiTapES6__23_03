import Person from "./../models/person.js";
import Student from "./../models/students.js";
import Employee from "./../models/employee.js";
import Customer from "./../models/customers.js";
import Api from "./../services/callAPI.js";

const api = new Api();
const validation = new Validation();

const getListPerson = () => {
  api
    .callApi(`NhanVien`, "GET", null)
    .then((result) => {
      renderUI(result.data);
    })
    .catch((error) => {
      console.log(error);
    });
};
getListPerson();

const resetModal = () => {
  document.getElementById("spID").value = "";
  document.getElementById("Ten").value = "";
  document.getElementById("diaChi").value = "";
  document.getElementById("email").value = "";
  document.getElementById("Toan").value = "";
  document.getElementById("Ly").value = "";
  document.getElementById("Hoa").value = "";
  document.getElementById("soNgayLam").value = "";
  document.getElementById("luongNgay").value = "";
  document.getElementById("congTy").value = "";
  document.getElementById("triGia").value = "";
  document.getElementById("danhGia").value = "";
};

const disa = () => {
  const disab = document.querySelectorAll(".row");
  disab.forEach((div) => {
    const inputs = div.querySelectorAll("input, select");
    inputs.forEach((input) => {
      input.disabled = true;
    });
  });
};

document.getElementById("btnThem").onclick = function () {
  resetModal();
  document.getElementsByClassName("modal-title")[0].innerHTML =
    "Thêm Mới Thông Tin";
  const btnAdd = `<button class="btn btn-success" onclick="themNg()">Thêm</button>`;
  document.getElementsByClassName("modal-footer")[0].innerHTML = btnAdd;
  disa();
};

document.getElementById("loai").addEventListener("change", () => {
  const selectedType = document.getElementById("loai").value;

  if (selectedType === "Student") {
    disa();
    document.getElementById("Ten").disabled = false;
    document.getElementById("diaChi").disabled = false;
    document.getElementById("email").disabled = false;
    document.getElementById("Toan").disabled = false;
    document.getElementById("Ly").disabled = false;
    document.getElementById("Hoa").disabled = false;
  } else if (selectedType === "Employee") {
    disa();
    document.getElementById("Ten").disabled = false;
    document.getElementById("diaChi").disabled = false;
    document.getElementById("email").disabled = false;
    document.getElementById("soNgayLam").disabled = false;
    document.getElementById("luongNgay").disabled = false;
  } else if (selectedType === "Customer") {
    disa();
    document.getElementById("Ten").disabled = false;
    document.getElementById("diaChi").disabled = false;
    document.getElementById("email").disabled = false;
    document.getElementById("congTy").disabled = false;
    document.getElementById("triGia").disabled = false;
    document.getElementById("danhGia").disabled = false;
  } else {
    disa();
  }
});

const themNg = () => {
  const name = document.getElementById("Ten").value;
  const diaChi = document.getElementById("diaChi").value;
  const email = document.getElementById("email").value;
  const loai = document.getElementById("loai").value;
  const Toan = parseFloat(document.getElementById("Toan").value);
  const Ly = parseFloat(document.getElementById("Ly").value);
  const Hoa = parseFloat(document.getElementById("Hoa").value);
  const tongNgay = parseFloat(document.getElementById("soNgayLam").value);
  const luongNgay = parseFloat(document.getElementById("luongNgay").value);
  const congTy = document.getElementById("congTy").value;
  const giaTriDon = document.getElementById("triGia").value;
  const danhGia = document.getElementById("danhGia").value;

  let isValid = true;

  isValid &=
    validation.kiemTraTong(
      name,
      "invalidTen",
      "(*)Vui lòng nhập tên nhân viên"
    ) &&
    validation.kiemTraChuoiKiTu(
      name,
      "invalidTen",
      "(*) Vui lòng nhập chuỗi kí tự"
    );

  isValid &=
    validation.kiemTraTong(
      email,
      "invalidEmail",
      "(*)Vui lòng nhập email nhân viên"
    ) &&
    validation.kiemTraEmail(
      email,
      "invalidEmail",
      "(*) Vui lòng nhập email đúng định dạng"
    );

  isValid &= validation.kiemTraTong(
    diaChi,
    "invalidDiaChi",
    "(*) Thông tin không được rỗng"
  );

  if (!isValid) return null;

  let person = "";
  if (document.getElementById("loai").value === "Student") {
    person = new Student("", name, diaChi, email, loai, Toan, Ly, Hoa);
    person.tinhDTB();
  } else if (document.getElementById("loai").value === "Employee") {
    person = new Employee("", name, diaChi, email, loai, tongNgay, luongNgay);
    person.tinhTongLuong();
  } else if (document.getElementById("loai").value === "Customer") {
    person = new Customer(
      "",
      name,
      diaChi,
      email,
      loai,
      congTy,
      giaTriDon,
      danhGia
    );
  } else {
    person = new Person(name, diaChi, email, loai);
  }

  api
    .callApi(`NhanVien`, "POST", person)
    .then(() => {
      getListPerson();
      document.getElementsByClassName("close")[0].click();
    })
    .catch((error) => {
      console.log(error);
    });
};
window.themNg = themNg;

const renderUI = (data) => {
  const contentHTML = data.reduce((content, person) => {
    return (content += `
            <tr>
                <td>${person.id}</td>
                <td>${person.loai}</td>
                <td>${person.name}</td>
                <td>${person.diaChi}</td>
                <td>${person.email}</td>
                <td>${typeof person.dtb === "undefined" ? "" : person.dtb}</td>
                <td>${
                  typeof person.tongLuong === "undefined"
                    ? ""
                    : `$${person.tongLuong.toLocaleString()}`
                }</td>
                <td>${
                  typeof person.congTy === "undefined" ? "" : person.congTy
                }</td>
                <td>${
                  typeof person.giaTriDon === "undefined"
                    ? ""
                    : person.giaTriDon
                }</td>
                <td>${
                  typeof person.danhGia === "undefined" ? "" : person.danhGia
                }</td>

                <td>
                    <button  style="font-size: 20px;" class="btn btn-info" data-toggle="modal" data-target="#myModal" onclick="editPerson(${
                      person.id
                    })">Edit</button>
                    <button  style="font-size: 20px;" class="btn btn-danger" onclick="deletePerson(${
                      person.id
                    })">Delete</button>
                </td>
            </tr>
        `);
  }, "");
  document.getElementById("tblDanhSachQL").innerHTML = contentHTML;
};

const editPerson = (id) => {
  document.getElementsByClassName("modal-title")[0].innerHTML =
    "Chỉnh Sửa Thông Tin";
  const btnUpdate = `<button class="btn btn-success" onclick="updatePerson(${id})">Cập Nhật</button>`;
  document.getElementsByClassName("modal-footer")[0].innerHTML = btnUpdate;

  api
    .callApi(`NhanVien/${id}`, "GET", null)
    .then((result) => {
      const person = result.data;
      document.getElementById("loai").value = person.loai;
      document.getElementById("spID").value = person.id;
      document.getElementById("Ten").value = person.name;
      document.getElementById("diaChi").value = person.diaChi;
      document.getElementById("email").value = person.email;
      document.getElementById("Toan").value = person.Toan;
      document.getElementById("Ly").value = person.Ly;
      document.getElementById("Hoa").value = person.Hoa;
      document.getElementById("soNgayLam").value = person.tongNgay;
      document.getElementById("luongNgay").value = person.luongNgay;
      document.getElementById("congTy").value = person.congTy;
      document.getElementById("triGia").value = person.giaTriDon;
      document.getElementById("danhGia").value = person.danhGia;

      const selectedType = document.getElementById("loai").value;

      if (selectedType === "Student") {
        disa();
        document.getElementById("Ten").disabled = false;
        document.getElementById("diaChi").disabled = false;
        document.getElementById("email").disabled = false;
        document.getElementById("Toan").disabled = false;
        document.getElementById("Ly").disabled = false;
        document.getElementById("Hoa").disabled = false;
      } else if (selectedType === "Employee") {
        disa();
        document.getElementById("Ten").disabled = false;
        document.getElementById("diaChi").disabled = false;
        document.getElementById("email").disabled = false;
        document.getElementById("soNgayLam").disabled = false;
        document.getElementById("luongNgay").disabled = false;
      } else if (selectedType === "Customer") {
        disa();
        document.getElementById("Ten").disabled = false;
        document.getElementById("diaChi").disabled = false;
        document.getElementById("email").disabled = false;
        document.getElementById("congTy").disabled = false;
        document.getElementById("triGia").disabled = false;
        document.getElementById("danhGia").disabled = false;
      } else {
        disa();
      }
    })
    .catch();
};
window.editPerson = editPerson;

const updatePerson = () => {
  const loai = document.getElementById("loai").value;
  const id = document.getElementById("spID").value;
  const name = document.getElementById("Ten").value;
  const diaChi = document.getElementById("diaChi").value;
  const email = document.getElementById("email").value;
  const Toan = parseFloat(document.getElementById("Toan").value);
  const Ly = parseFloat(document.getElementById("Ly").value);
  const Hoa = parseFloat(document.getElementById("Hoa").value);
  const tongNgay = parseFloat(document.getElementById("soNgayLam").value);
  const luongNgay = parseFloat(document.getElementById("luongNgay").value);
  const congTy = document.getElementById("congTy").value;
  const giaTriDon = document.getElementById("triGia").value;
  const danhGia = document.getElementById("danhGia").value;

  let person = "";
  if (loai === "Student") {
    person = new Student(id, name, diaChi, email, loai, Toan, Ly, Hoa);
    person.tinhDTB();
  } else if (loai === "Employee") {
    person = new Employee(id, name, diaChi, email, loai, tongNgay, luongNgay);
    person.tinhTongLuong();
  } else if (loai === "Customer") {
    person = new Customer(
      id,
      name,
      diaChi,
      email,
      loai,
      congTy,
      giaTriDon,
      danhGia
    );
  } else {
    person = new Person(id, name, diaChi, email, loai);
  }

  api
    .callApi(`NhanVien/${person.id}`, "PUT", person)
    .then(() => {
      getListPerson();
      document.getElementsByClassName("close")[0].click();
    })
    .catch();
};
window.updatePerson = updatePerson;

const deletePerson = (id) => {
  api
    .callApi(`NhanVien/${id}`, "DELETE", null)
    .then((result) => {
      alert(`Delete ${result.data.name} Success`);
      getListPerson();
    })
    .catch((error) => {
      console.log(error);
    });
};
window.deletePerson = deletePerson;

document.getElementById("sortByName").onclick = () => {
  api
    .callApi(`NhanVien`, "GET", null)
    .then((result) => {
      const person = result.data;
      person.sort((a, b) => {
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
        return 0;
      });
      renderUI(person);
    })
    .catch((error) => {
      console.log(error);
    });
};

const filtedPerson = () => {
  const type = document.getElementById("selLoai").value;

  api
    .callApi(`NhanVien`, "GET", null)
    .then((result) => {
      const personData = result.data;
      let filtedcontent = [];

      if (type === "all") {
        filtedcontent = personData;
      } else {
        filtedcontent = personData.filter(function (person) {
          return person.loai === type;
        });
      }

      renderUI(filtedcontent);
    })
    .catch((error) => {
      console.log(error);
    });
};

window.filtedPerson = filtedPerson;
