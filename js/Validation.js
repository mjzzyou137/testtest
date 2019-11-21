function Validation() {
  this.kiemTraTrungMaNV = function(input, spanId, message, mangNhanVien) {
    /*
      1. Duyệt mảng mangNhanVien
      2. Nếu input có tồn trong mảng => Thông báo trùng mã
         Ngược lại là đúng
    */

    var check = true;

    /* Cach 1 */

    // mangNhanVien.map(function(item) {
    //   if (input === item.maNV) {
    //     check = false;
    //     return;
    //   }
    // });

    /* Cach 2 => Some */

    check = !mangNhanVien.some(function(item) {
      return input === item.maNV;
    });

    if (check) {
      getEle(spanId).innerHTML = "";
      getEle(spanId).style.display = "none";
      return true;
    }

    getEle(spanId).innerHTML = message;
    getEle(spanId).style.display = "block";
    return false;
  };

  this.kiemTraRong = function(input, spanId, message) {
    if (input === "") {
      // Dom đến thẻ Span có id?
      getEle(spanId).innerHTML = message;
      // Bật thuoc tính display block
      getEle(spanId).style.display = "block";

      return false;
    } else {
      getEle(spanId).innerHTML = "";
      getEle(spanId).style.display = "none";

      return true;
    }
  };

  this.kiemTraChucVu = function(chucvu, spanId, message) {
    if (getEle(chucvu).selectedIndex != 0) {
      getEle(spanId).innerHTML = "";
      getEle(spanId).style.display = "none";
      return true;
    }
    getEle(spanId).innerHTML = message;
    getEle(spanId).style.display = "block";
    return false;
  };

  this.kiemTraDoDai = function(input, spanId, message, min, max) {
    if (input.length >= min && input.length <= max) {
      getEle(spanId).innerHTML = "";
      getEle(spanId).style.display = "none";
      return true;
    }

    getEle(spanId).innerHTML = message;
    getEle(spanId).style.display = "block";
    return false;
  };

  this.checkEmail = function(input, spanId, message) {
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (input.match(mailformat)) {
      getEle(spanId).innerHTML = "";
      getEle(spanId).style.display = "none";
      return true;
    }

    getEle(spanId).innerHTML = message;
    getEle(spanId).style.display = "block";
    return false;
  };

  this.kiemTraKyTu = function(input, spanId, message) {
    var pattern = new RegExp(
      "^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" +
        "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" +
        "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$"
    );

    if (pattern.test(input)) {
      getEle(spanId).innerHTML = "";
      getEle(spanId).style.display = "none";
      return true;
    }

    getEle(spanId).innerHTML = message;
    getEle(spanId).style.display = "block";
    return false;
  };
}
