var validation = new Validation();
var danhSachNhanVien = new DanhSachNhanVien();

getLocalStorage();

getEle("btnThem").addEventListener("click", function() {
  getEle("btnThemNV").style.display = "block";
  getEle("btnCapNhat").style.display = "none";
  getEle("msnv").removeAttribute("disabled");
});

getEle("btnThemNV").addEventListener("click", function() {
  var maNV = getEle("msnv").value;
  var tenNV = getEle("name").value;
  var email = getEle("email").value;
  var password = getEle("password").value;
  var date = getEle("datepicker").value;
  var chucVu = getEle("chucvu").value;

  var nhanVien = new NhanVien(maNV, tenNV, email, password, date, chucVu);

  var isValid = true;

  //Ma NV
  isValid &=
    validation.kiemTraRong(maNV, "tbMaNV", "(*) Vui lòng nhập mã NV") &&
    validation.kiemTraDoDai(
      maNV,
      "tbMaNV",
      "(*) Độ dài ký tự từ 6-12",
      6,
      12
    ) &&
    validation.kiemTraTrungMaNV(
      maNV,
      "tbMaNV",
      "(*) MaNV đã tồn tại",
      danhSachNhanVien.mangNhanVien
    );

  //Ten NV
  isValid &=
    validation.kiemTraRong(tenNV, "tbTen", "(*) Vui lòng nhập tên NV") &&
    validation.kiemTraKyTu(tenNV, "tbTen", "(*) Vui lòng nhập ký tự");

  //email
  isValid &=
    validation.kiemTraRong(email, "tbEmail", "(*) Vui lòng nhập email") &&
    validation.checkEmail(email, "tbEmail", "(*) Email không đúng định dạng");

  //password
  isValid &= validation.kiemTraRong(
    password,
    "tbMatKhau",
    "(*) Vui lòng nhập password"
  );

  //Chuc Vu
  isValid &= validation.kiemTraChucVu(
    "chucvu",
    "tbChucVu",
    "(*) Vui lòng chọn chức vụ"
  );

  // Nếu như Validation hợp lệ thì thêm người dùng
  if (isValid) {
    danhSachNhanVien.themNhanVien(nhanVien);
    taoBang();
    setLocalStorage();
  }
});

function taoBang(mangNhanVien = danhSachNhanVien.mangNhanVien) {
  // var name = "Cybersoft";
  // var result = `Hello ${name}`;

  var tblBody = getEle("tableDanhSach");
  var content = "";

  //   for (var i = 0; i < danhSachNhanVien.mangNhanVien.length; i++) {
  //     content += `
  //             <tr>
  //                 <td>${danhSachNhanVien.mangNhanVien[i].maNV}</td>
  //                 <td>${danhSachNhanVien.mangNhanVien[i].tenNV}</td>
  //                 <td>${danhSachNhanVien.mangNhanVien[i].email}</td>
  //                 <td>${danhSachNhanVien.mangNhanVien[i].date}</td>
  //                 <td>${danhSachNhanVien.mangNhanVien[i].chucVu}</td>
  //             </tr>
  //         `;
  //   }

  mangNhanVien.map(function(item) {
    content += `
            <tr>
                <td>${item.maNV}</td>
                <td>${item.tenNV}</td>
                <td>${item.email}</td>
                <td>${item.date}</td>
                <td>${item.chucVu}</td>
                <td>
                  <button class='btn btn-success' data-toggle='modal' data-target='#myModal' onClick="sua('${item.maNV}')">Sửa</button>
                  <button class='btn btn-danger' onClick="xoa('${item.maNV}')">Xóa</button>
                </td>
            </tr>
        `;
  });

  tblBody.innerHTML = content;
}

/* Xóa nhân viên */
function xoa(maNV) {
  // console.log(maNV);
  danhSachNhanVien.xoaNhanVien(maNV);
  taoBang();
  setLocalStorage();
}

/* Sua NV */

function sua(maNV) {
  getEle("btnThemNV").style.display = "none";
  getEle("btnCapNhat").style.display = "block";

  var nhanVien = danhSachNhanVien.layThongTinNhanVien(maNV);

  /* DOM toi 6 ô input gán dữ liệu vào */

  getEle("msnv").value = nhanVien.maNV;
  getEle("msnv").setAttribute("disabled", true);

  getEle("name").value = nhanVien.tenNV;
  getEle("email").value = nhanVien.email;
  getEle("password").value = nhanVien.password;
  getEle("datepicker").value = nhanVien.date;
  getEle("chucvu").value = nhanVien.chucVu;
}

/* Cập nhật nhân viên */
getEle("btnCapNhat").addEventListener("click", function() {
  var maNV = getEle("msnv").value;
  var tenNV = getEle("name").value;
  var email = getEle("email").value;
  var password = getEle("password").value;
  var date = getEle("datepicker").value;
  var chucVu = getEle("chucvu").value;

  var nhanVien = new NhanVien(maNV, tenNV, email, password, date, chucVu);

  danhSachNhanVien.capNhatNhanVien(nhanVien);

  taoBang();
  setLocalStorage();
});

/* Tìm kiếm */
getEle("searchName").addEventListener("keyup", function() {
  var chuoiTimKiem = getEle("searchName").value;

  var mangTimKiem = danhSachNhanVien.timKiemNhanVien(chuoiTimKiem);
  taoBang(mangTimKiem);
});

function setLocalStorage() {
  // Lưu dữ liệu xuống localStorage => chuyển về kiểu string
  localStorage.setItem(
    "danhSachNhanVien",
    JSON.stringify(danhSachNhanVien.mangNhanVien)
  );
}

function getLocalStorage() {
  // Lấy dữ liệu từ localStorage => chuyển về kiểu JSON
  if (localStorage.getItem("danhSachNhanVien")) {
    danhSachNhanVien.mangNhanVien = JSON.parse(
      localStorage.getItem("danhSachNhanVien")
    );
    taoBang();
  }
}

function getEle(id) {
  return document.getElementById(id);
}
