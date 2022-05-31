//Ham validator
function Validator(objects) {
  function validate(inputEl, rule) {
    //value: inputEl.value
    //test funtcion: rule.test
    //inputEl.value người dùng nhập vào
    var errorMessage = rule.test(inputEl.value);
    var errorEl = inputEl.parentElement.nextElementSibling;
    if (errorMessage) {
      errorEl.innerText = errorMessage;
      inputEl.parentElement.nextElementSibling.classList.add("inValid");
      inputEl.parentElement.nextElementSibling.style.display = "block";
    } else {
      errorEl.innerText = "";
      inputEl.parentElement.nextElementSibling.classList.remove("inValid");
    }
  }
  //Lấy được el của form
  var formEl = document.querySelector(objects.form);

  if (formEl) {
    objects.rules.forEach((rule) => {
      // console.log(rule.selector);
      //Tìm input trong cái form
      var inputEl = formEl.querySelector(rule.selector);

      if (inputEl) {
        //Xử lý trườn hợp blur khỏi input
        inputEl.onblur = function () {
          validate(inputEl, rule);
          //xử lý mỗi khi người dùng nhập vào input
        };
        inputEl.oninput = function () {
          var errorEl = inputEl.parentElement.nextElementSibling;
          errorEl.innerText = "";
          inputEl.parentElement.nextElementSibling.classList.remove("inValid");
        };
      }
    });
  }
  //sp-thongbao
  // console.log(objects.rules);
}
//Dinh nghia rule
//Nguyen tắc cua rule:
//1. Khi có lỗi thỉ trả lai mesage lỗi
//2. Khi hợp lệ=> không trả ra gì cả(undefined)
Validator.isUser = function (selector) {
  return {
    selector: selector,
    test: function (value) {
      return 4 <= value.length && value.length <= 6
        ? undefined
        : "Tài khoản tối đa 4 -6 ký tự";
    },
  };
};

Validator.isRequired = function (selector) {
  //return 1 object
  return {
    selector: selector,
    test: function (value) {
      //Nếu người dùng nhập dấu cách thì ko lợp lệ vì vậy  value.strim để loại bỏ giá trí có khoảng cách
      var regex =
        /[^a-z0-9A-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễếệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]/u;

      return regex.test(value) ? undefined : "Tên nhân viên phải là chữ";
    },
  };
};
Validator.isEmail = function (selector) {
  return {
    selector: selector,
    test: function (value) {
      var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      return regex.test(value) ? undefined : "Vui lòng nhập email";
    },
  };
};
Validator.isPassword = function (selector) {
  return {
    selector: selector,
    test: function (value) {
      var regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,10}$/;
      return regex.test(value)
        ? undefined
        : "Password phải là 1 ký tự số, in hoa hoặc ký tự đặc biệt";
    },
  };
};
Validator.isDate = function (selector) {
  return {
    selector: selector,
    test: function (value) {
      var regex =
        /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/;
      return regex.test(value) ? undefined : "DD/MM/YYYY";
    },
  };
};
Validator.isSalary = function (selector) {
  return {
    selector: selector,
    test: function (value) {
      return 1e6 <= value && value <= 2e7 ? undefined : "Vui lòng ko để trống";
    },
  };
};
Validator.isHours = function (selector) {
  return {
    selector: selector,
    test: function (value) {
      return 80 <= value && value <= 200 ? undefined : "Vui lòng ko để trống";
    },
  };
};
