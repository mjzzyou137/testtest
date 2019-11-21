function DanhSachNhanVien() {
  this.mangNhanVien = [];

  this.themNhanVien = function(nhanVien) {
    this.mangNhanVien.push(nhanVien);
  };

  this.xoaNhanVien = function(maNV) {
    /*
      1. Duyet mang
      2. Kiểm tra maNV cần xóa có tồn tại trong mảng hay không?
        2.1. Nếu tồn tại => Xóa
        mangNhanVien.splice(viTriCanXoa, 1);
    */

    var viTri;
    this.mangNhanVien.map(function(item, index) {
      if (maNV === item.maNV) {
        viTri = index;
      }
    });

    // Ham xóa
    this.mangNhanVien.splice(viTri, 1);
  };

  this.layThongTinNhanVien = function(maNV) {
    var nhanVien;

    this.mangNhanVien.map(function(item) {
      if (item.maNV === maNV) {
        nhanVien = item;
        return nhanVien;
      }
    });

    return nhanVien;
  };

  this.capNhatNhanVien = function(nhanVien) {
    this.mangNhanVien.map(function(item) {
      if (item.maNV === nhanVien.maNV) {
        item.tenNV = nhanVien.tenNV;
        item.email = nhanVien.email;
        item.password = nhanVien.password;
        item.date = nhanVien.date;
        item.chucVu = nhanVien.chucVu;
      }
    });
  };

  this.timKiemNhanVien = function(chuoiTimKiem) {
    var mangTimKiem = [];

    this.mangNhanVien.map(function(item) {
      if (item.tenNV.toLowerCase().indexOf(chuoiTimKiem.toLowerCase()) > -1) {
        mangTimKiem.push(item);
      }
    });

    return mangTimKiem;
  };

  /* Tìm vị trí */
  this.timViTri = function(maNV) {
    var viTri;
    this.mangNhanVien.map(function(item, index) {
      if (item.maNV === maNV) {
        viTri = index;
      }
    });

    return viTri;
  };
}
