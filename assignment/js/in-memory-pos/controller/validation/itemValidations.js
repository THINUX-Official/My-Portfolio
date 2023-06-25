/*
/!**
 ///////////////////////////////////////////////////////
 **!/

let itemValidation = [];

const itmIDRegEx = /^(I00-)[0-9]{1,3}$/;
const itemDescRegEx = /^[A-z ]{5,20}$/;
const itemUnitRegEx = /^[0-9]{1,}[.]?[0-9]{1,2}$/;
const itemQTYtRegEx = /^[0-9]{1,7}$/;

$("#txtItemId").focus();

itemValidation.push({reg: itmIDRegEx, field: $('#txtItemId'), error: 'Item ID Pattern is Wrong : I00-001'});
itemValidation.push({
    reg: itemDescRegEx,
    field: $('#txtItemName'),
    error: 'Item Description Pattern is Wrong : Ram'
});
itemValidation.push({
    reg: itemUnitRegEx,
    field: $('#txtItemPrice'),
    error: 'Item UnitPrice Pattern is Wrong : 2000.00'
});
itemValidation.push({reg: itemQTYtRegEx, field: $('#txtItemQty'), error: 'Item Qty Pattern is Wrong : 10'});

function clearCustomerInputFieldsItem() {
    $("#txtItemId,#txtItemName,#txtItemPrice,#txtItemQty").val("");
    $("#txtItemId,#txtItemName,#txtItemPrice,#txtItemQty").css("border", "1px solid #ced4da");
    $("#txtItemId").focus();
    setBtnItem();
}

setBtnItem();

//disable tab
$("#txtItemId,#txtItemName,#txtItemPrice,#txtItemQty").on("keydown keyup", function (e) {
    //get the index number of data input fields indexNo
    let indexNo = itemValidation.indexOf(itemValidation.find((c) => c.field.attr("id") == e.target.id));

    //Disable tab key
    if (e.key == "Tab") {
        e.preventDefault();
    }

    //check validations
    checkValidationsItem(itemValidation[indexNo]);

    setBtnItem();

    //If the enter key pressed cheque and focus
    if (e.key == "Enter") {

        if (e.target.id != itemValidation[itemValidation.length - 1].field.attr("id")) {
            //check validation is ok
            if (checkValidations(itemValidation[indexNo])) {
                itemValidation[indexNo + 1].field.focus();
            }
        } else {
            if (checkValidations(itemValidation[indexNo])) {
                itemSave();
            }
        }
    }
});

function checkValidationsItem(object) {
    if (object.reg.test(object.field.val())) {
        setBorderItems(true, object)
        return true;
    }
    setBorderItems(false, object)
    return false;
}

function setBorderItems(bol, ob) {
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

function checkAllItem() {
    for (let i = 0; i < itemValidation.length; i++) {
        if (!checkValidationsItem(itemValidation[i])) return false;
    }
    return true;
}

function setBtnItem() {
    $("#btnItemDelete").prop("disabled", true);
    $("#btnItemUpdate").prop("disabled", true);

    if (checkAllItem()) {
        $("#btnItemSave").prop("disabled", false);
    } else {
        $("#btnItemSave").prop("disabled", true);
    }

    let id = $("#txtItemId").val();
    if (searchItem(id) == undefined) {
        $("#btnItemDelete").prop("disabled", true);
        $("#btnItemUpdate").prop("disabled", true);
    } else {
        $("#btnItemDelete").prop("disabled", false);
        $("#btnItemUpdate").prop("disabled", false);
    }
}


$('#txtItemId,#txtItemName,#txtItemPrice,#txtItemQty').on('keyup', function (event) {
    checkCusValidityItem();
});

$('#txtItemId,#txtItemName,#txtItemPrice,#txtItemQty').on('blur', function (event) {
    checkCusValidityItem();
});

function checkCusValidityItem() {
    let errorCount = 0;
    for (let validation of itemValidation) {
        if (checkItem(validation.reg, validation.field)) {
            textItemSuccess(validation.field, "");
        } else {
            errorCount = errorCount + 1;
            setItemTextError(validation.field, validation.error);
        }
    }
    setItemButtonState(errorCount);
}

function checkItem(regex, txtField) {
    let inputValue = txtField.val();
    return regex.test(inputValue) ? true : false;
}

function textItemSuccess(txtField, error) {
    if (txtField.val().length <= 0) {
        defaultCusText(txtField, "");
    } else {
        txtField.css('border', '2px solid green');
        txtField.parent().children('span').text(error);
    }
}

function setItemTextError(txtField, error) {
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
*/
