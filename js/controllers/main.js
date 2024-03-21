import Person from "./../models/person.js";
import Student from "./../models/students.js";
import Employee from "./../models/employee.js";
import Customer from "./../models/customers.js";
import ListPerson from "./listPerson.js";

const listPerson = new ListPerson();
const validation = new Validation();

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
    document.getElementById("spID").disabled = false;
    document.getElementById("Ten").disabled = false;
    document.getElementById("diaChi").disabled = false;
    document.getElementById("email").disabled = false;
    document.getElementById("Toan").disabled = false;
    document.getElementById("Ly").disabled = false;
    document.getElementById("Hoa").disabled = false;
  } else if (selectedType === "Employee") {
    disa();
    document.getElementById("spID").disabled = false;
    document.getElementById("Ten").disabled = false;
    document.getElementById("diaChi").disabled = false;
    document.getElementById("email").disabled = false;
    document.getElementById("soNgayLam").disabled = false;
    document.getElementById("luongNgay").disabled = false;
  } else if (selectedType === "Customer") {
    disa();
    document.getElementById("spID").disabled = false;
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
  const loai = document.getElementById("loai").value;
  const id = document.getElementById("spID").value;
  const name = document.getElementById("Ten").value;
  const diaChi = document.getElementById("diaChi").value;
  const email = document.getElementById("email").value;
  const Toan = document.getElementById("Toan").value;
  const Ly = document.getElementById("Ly").value;
  const Hoa = document.getElementById("Hoa").value;
  const tongNgay = document.getElementById("soNgayLam").value;
  const luongNgay = document.getElementById("luongNgay").value;
  const congTy = document.getElementById("congTy").value;
  const giaTriDon = document.getElementById("triGia").value;
  const danhGia = document.getElementById("danhGia").value;

  let isValid = true;
  if (isAdd) {
    isValid &=
      validation.kiemTraTong(id, "spID", "(*)Vui lòng nhập mã nhân viên") &&
      validation.kiemTraMaTonTai(
        spID,
        "spID",
        "(*) Mã nhân viên đã tồn tại!",
        listPerson.list
      );
  }

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

  isValid &= validation.kiemTraTong(
    Toan,
    "invalidToan",
    "(*) Thông tin không được rỗng"
  );
  isValid &= validation.kiemTraTong(
    Ly,
    "invalidLy",
    "(*) Thông tin không được rỗng"
  );
  isValid &= validation.kiemTraTong(
    Hoa,
    "invalidHoa",
    "(*) Thông tin không được rỗng"
  );
  isValid &= validation.kiemTraTong(
    tongNgay,
    "invalidNgayLam",
    "(*) Thông tin không được rỗng"
  );
  isValid &= validation.kiemTraTong(
    luongNgay,
    "invalidEmail",
    "(*) Thông tin không được rỗng"
  );
  isValid &= validation.kiemTraTong(
    congTy,
    "invalidCongTy",
    "(*) Thông tin không được rỗng"
  );
  isValid &= validation.kiemTraTong(
    giaTriDon,
    "invalidTriGia",
    "(*) Thông tin không được rỗng"
  );
  isValid &= validation.kiemTraTong(
    danhGia,
    "invalidDanhGia",
    "(*) Thông tin không được rỗng"
  );

  if (!isValid) return null;

  let person = "";
  if (document.getElementById("loai").value === "Student") {
    person.dtb();
    person = new Student(id, name, diaChi, email, loai, Toan, Ly, Hoa, dtb);
  } else if (document.getElementById("loai").value === "Employee") {
    person.tongLuong();
    person = new Employee(
      id,
      name,
      diaChi,
      email,
      loai,
      tongNgay,
      luongNgay,
      tongLuong
    );
  } else if (document.getElementById("loai").value === "Customer") {
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

  listPerson.themNg(person);
  renderUI(listPerson.list);
  setLocalStorage();
};

const renderUI = (listPerson) => {
  let content = "";
  listPerson.forEach(function (person, index) {
    content += `
            <tr>
                <td>${index + 1}</td>
                <td>${person.loai}</td>
                <td>${person.name}</td>
                <td>${person.diaChi}</td>
                <td>${person.email}</td>
                <td>${person.dtb}</td>
                <td>${person.tongLuong}</td>
                <td>${person.congTy}</td>
                <td>${person.giaTriDon}</td>
                <td>${person.danhGia}</td>
                <td>
                    <button  style="font-size: 20px;" class="btn btn-info" data-toggle="modal" data-target="#myModal" onclick="editPerson(${
                      person.id
                    })">Edit</button>
                    <button  style="font-size: 20px;" class="btn btn-danger" onclick="deletePerson(${
                      person.id
                    })">Delete</button>
                </td>
            </tr>
        `;
    document.getElementById("tblDanhSachQL").innerHTML = content;
  });
};

const editPerson = (id) => {
  document.getElementsByClassName("modal-title")[0].innerHTML =
    "Chỉnh Sửa Thông Tin";
  const btnUpdate = `<button class="btn btn-success" onclick="updatePerson(${id})">Update Product</button>`;
  document.getElementsByClassName("modal-footer")[0].innerHTML = btnUpdate;

  const person = listPerson.list.find((person) => person.id === id);

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
};

const updatePerson = () => {
  const loai = document.getElementById("loai").value;
  const id = document.getElementById("spID").value;
  const name = document.getElementById("Ten").value;
  const diaChi = document.getElementById("diaChi").value;
  const email = document.getElementById("email").value;
  const Toan = document.getElementById("Toan").value;
  const Ly = document.getElementById("Ly").value;
  const Hoa = document.getElementById("Hoa").value;
  const tongNgay = document.getElementById("soNgayLam").value;
  const luongNgay = document.getElementById("luongNgay").value;
  const congTy = document.getElementById("congTy").value;
  const giaTriDon = document.getElementById("triGia").value;
  const danhGia = document.getElementById("danhGia").value;

  let updatedPerson = "";
  if (loai === "Student") {
    updatedPerson.dtb();
    updatedPerson = new Student(
      id,
      name,
      diaChi,
      email,
      loai,
      Toan,
      Ly,
      Hoa,
      dtb
    );
  } else if (loai === "Employee") {
    updatedPerson.tongLuong();
    updatedPerson = new Employee(
      id,
      name,
      diaChi,
      email,
      loai,
      tongNgay,
      luongNgay,
      tongLuong
    );
  } else if (loai === "Customer") {
    updatedPerson = new Customer(
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
    updatedPerson = new Person(id, name, diaChi, email, loai);
  }

  listPerson.capNhat(updatedPerson);
  renderUI(listPerson.list);
  setLocalStorage();
};

const deletePerson = (id) => {
  listPerson.xoaNg(id);
  renderUI(listPerson.list);
  setLocalStorage();
};

const setLocalStorage = () => {
  const arrString = JSON.stringify(listPerson.list);
  localStorage.setItem("ListPerson", arrString);
};

const getLocalStorage = () => {
  if (!localStorage.getItem("ListPerson")) return;
  const arrString = localStorage.getItem("ListPerson");
  const arrJSON = JSON.parse(arrString);
  listPerson.list = arrJSON.map((personData) => {
    if (personData instanceof Student) {
      return new Student(
        personData.id,
        personData.name,
        personData.diaChi,
        personData.email,
        personData.loai,
        personData.Toan,
        personData.Ly,
        personData.Hoa
      );
    } else if (personData instanceof Employee) {
      return new Employee(
        personData.id,
        personData.name,
        personData.diaChi,
        personData.email,
        personData.loai,
        personData.tongNgay,
        personData.luongNgay
      );
    } else if (personData instanceof Customer) {
      return new Customer(
        personData.id,
        personData.name,
        personData.diaChi,
        personData.email,
        personData.loai,
        personData.congTy,
        personData.giaTriDon,
        personData.danhGia
      );
    } else {
      return new Person(
        personData.id,
        personData.name,
        personData.loai,
        personData.diaChi,
        personData.email
      );
    }
  });
  renderUI(listPerson.list);
};

getLocalStorage();

document.getElementById("sortByName").onclick = () => {
  listPerson.sortByName();
  renderUI(sortByName);
};

const filterbyName = () => {
  const filteredStudents = listPerson.filterByType("Student");
  const filteredEmployees = listPerson.filterByType("Employee");
  const filteredCustomers = listPerson.filterByType("Customer");
  const filteredPersons = listPerson.filterByType("Person"); // Mặc định
};
