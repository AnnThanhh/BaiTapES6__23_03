export default class ListPerson {
  constructor() {
    this.list = [];
  }
  themNg(ng) {
    this.list.push(ng);
  }

  xoaNg(id) {
    this.list = this.list.filter((person) => person.id !== id);
  }

  capNhat(ng) {
    const index = this.list.findIndex((p) => p.id === ng.id);
    if (index !== -1) {
      this.list[index] = ng;
    }
  }

  sortByName() {
    this.list.sort((a, b) => a.name.localeCompare(b.name));
  }

  filterByType(type) {
    // Kiểm tra kiểu dữ liệu của type
    switch (type) {
      case "Student":
        return this.list.filter((person) => person instanceof Student);
      case "Employee":
        return this.list.filter((person) => person instanceof Employee);
      case "Customer":
        return this.list.filter((person) => person instanceof Customer);
      default:
        return this.list.filter((person) => person instanceof Person);
    }
  }
}
