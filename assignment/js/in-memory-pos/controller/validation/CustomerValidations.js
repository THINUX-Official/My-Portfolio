/**
 ///////////////////////////////////////////////////////
 **/

let customerValidation = [];

const cusIDRegEx = /^(C00-)[0-9]{1,3}$/;
const cusNameRegEx = /^[A-z ]{5,20}$/;
const cusAddressRegEx = /^[0-9/A-z. ,]{7,}$/;
const cusContactRegEx = /^[0-9]{1,}[.]?[0-9]{1,2}$/;

$("#txtCustomerId").focus();

customerValidation.push({
    reg: cusIDRegEx,
    field: $('#txtCustomerId'),
    error: 'Customer ID Pattern is Wrong : C00-001'
});
customerValidation.push({
    reg: cusNameRegEx,
    field: $('#txtCustomerName'),
    error: 'Customer Name Pattern is Wrong : Kamal'
});
customerValidation.push({
    reg: cusAddressRegEx,
    field: $('#txtCustomerAddress'),
    error: 'Customer Address Pattern is Wrong : Galle'
});
customerValidation.push({
    reg: cusContactRegEx,
    field: $('#txtCustomerContact'),
    error: 'Customer Contact Pattern is Wrong : 077125147'
});

function clearCustomerInputFields() {
    $("#txtCustomerId,#txtCustomerName,#txtCustomerAddress,#txtCustomerContact").val("");
    $("#txtCustomerId,#txtCustomerName,#txtCustomerAddress,#txtCustomerContact").css("border", "1px solid #ced4da");
    $("#txtCustomerId").focus();
    setBtn();
}

setBtn();

//disable tab
$("#txtCustomerId,#txtCustomerName,#txtCustomerAddress,#txtCustomerContact").on("keydown keyup", function (e) {

    let indexNo = customerValidation.indexOf(customerValidation.find((c) => c.field.attr("id") == e.target.id));

    if (e.key == "Tab") {
        e.preventDefault();
    }

    checkValidations(customerValidation[indexNo]);

    setBtn();

    if (e.key == "Enter") {

        if (e.target.id != customerValidation[customerValidation.length - 1].field.attr("id")) {
            //check validation is ok
            if (checkValidations(customerValidation[indexNo])) {
                customerValidation[indexNo + 1].field.focus();
            }
        } else {
            if (checkValidations(customerValidation[indexNo])) {
                saveCustomer();
            }
        }
    }
});

function checkValidations(object) {
    if (object.reg.test(object.field.val())) {
        setBorder(true, object)
        return true;
    }
    setBorder(false, object)
    return false;
}

function setBorder(bol, ob) {
    if (!bol) {
        if (ob.field.val().length >= 1) {
            ob.field.css("border", "2px solid red");
        } else {
            ob.field.css("border", "1px solid #ced4da");
        }
    } else {
        if (ob.field.val().length >= 1) {
            ob.field.css("border", "2px solid green");
        } else {
            ob.field.css("border", "1px solid #ced4da");
        }
    }

}

function checkAll() {
    for (let i = 0; i < customerValidation.length; i++) {
        if (!checkValidations(customerValidation[i])) return false;
    }
    return true;
}

function setBtn() {
    $("#btnDelete").prop("disabled", true);
    $("#btnUpdate").prop("disabled", true);

    if (checkAll()) {
        $("#save").prop("disabled", false);
    } else {
        $("#save").prop("disabled", true);
    }

    let id = $("#txtCustomerId").val();
    if (searchCustomer(id) == undefined) {
        $("#btnDelete").prop("disabled", true);
        $("#btnUpdate").prop("disabled", true);
    } else {
        $("#btnDelete").prop("disabled", false);
        $("#btnUpdate").prop("disabled", false);
    }
}

$('#txtCustomerId,#txtCustomerName,#txtCustomerAddress,#txtCustomerContact').on('keyup', function (event) {
    checkCusValidity();
});

$('#txtCustomerId,#txtCustomerName,#txtCustomerAddress,#txtCustomerContact').on('blur', function (event) {
    checkCusValidity();
});

function checkCusValidity() {
    let errorCounts = 0;
    for (let validation of customerValidation) {
        if (checkCus(validation.reg, validation.field)) {
            textCusSuccess(validation.field, "");
        } else {
            errorCounts = errorCounts + 1;
            setCusTextError(validation.field, validation.error);
        }
    }
}

function checkCus(regex, txtField) {
    let inputValue = txtField.val();
    return regex.test(inputValue) ? true : false;
}

function textCusSuccess(txtField, error) {
    if (txtField.val().length <= 0) {
        defaultCusText(txtField, "");
    } else {
        txtField.css('border', '2px solid green');
        txtField.parent().children('span').text(error);
    }
}

function setCusTextError(txtField, error) {
    if (txtField.val().length <= 0) {
        defaultCusText(txtField, "");
    } else {
        txtField.css('border', '2px solid red');
        txtField.parent().children('span').text(error);
    }
}

function defaultCusText(txtField, error) {
    txtField.css("border", "1px solid #ced4da");
    txtField.parent().children('span').text(error);
}


