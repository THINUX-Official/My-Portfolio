initiateUI();

function initiateUI() {
    clearAll();
    $("#dashboard").css("display", "block");

    setTheLastView();
}

function clearAll() {
    $("#dashboard, #customerContent,#itemContent,#orderContent").css('display', 'none');
}

function saveLastView(clickedID) {
    switch (clickedID) {
        case "dashboard":
            localStorage.setItem("view", "DASHBOARD");
            break;
        case "customerContent":
            localStorage.setItem("view", "CUSTOMER");
            break;
        case "itemContent":
            localStorage.setItem("view", "ITEM");
            break;
        case "orderContent":
            localStorage.setItem("view", "ORDER");
            break;
    }
}

function setTheLastView() {
    let view = localStorage.getItem("view");
    switch (view) {
        case "DASHBOARD":
            setView($("#dashboard"));
            break;
        case "CUSTOMER":
            setView($("#customerContent"));
            break;
        case "ITEM":
            setView($("#itemContent"));
            break;
        case "ORDER":
            setView($("#orderContent"));
            break;
        default:
            setView($("#dashboard"));
    }
}

function setView(viewOb) {
    clearAll();
    viewOb.css("display", "block");
    saveLastView(viewOb.get(0).id);
    console.log(viewOb.get(0).id);
}

$("#home").click(function () {
    setView($("#dashboard"));
});

$("#customer").click(function () {
    setView($("#customerContent"));
});

$("#orders").click(function () {
    setView($("#orderContent"));
});

$("#item").click(function () {
    setView($("#itemContent"));
});

/*var customers = [];*/

$("#btnCustomerSave").click(function () {
    saveCustomer();
});

function saveCustomer() {
    let customerId = $("#txtCustomerId").val();
    if (searchCustomer(customerId.trim()) == undefined) {
        let customerName = $("#txtCustomerName").val();
        let customerAddress = $("#txtCustomerAddress").val();
        let customerContact = $("#txtCustomerContact").val();

        /* var customerObject = {
             id: customerId,
             name: customerName,
             address: customerAddress,
             contact: customerContact
         }*/

        let newCustomer = Object.assign({}, customerObject);
        newCustomer.id = customerId;
        newCustomer.name = customerName;
        newCustomer.address = customerAddress;
        newCustomer.contact = customerContact;

        customers.push(newCustomer);

        clearCustomerInputFields();
        loadAllCustomers();
        loadAllCustomerId();
        bindRowClickEvents();

    } else {
        alert("Customer Already Exits!");
    }
}

function bindRowClickEvents() {
    $("#tblCustomer>tr").click(function () {
        let id = $(this).children(":eq(0)").text();
        let name = $(this).children(":eq(1)").text();
        let address = $(this).children(":eq(2)").text();
        let contact = $(this).children(":eq(3)").text();

        $('#txtCustomerId').val(id);
        $('#txtCustomerName').val(name);
        $('#txtCustomerAddress').val(address);
        $('#txtCustomerContact').val(contact);

        setCusBtnUpdate(2);
        $("#btnUpdate").attr('disabled', false);
    });
    $("#btnUpdate").attr('disabled', disabled);
}

function setCusBtnUpdate(values) {
    if (values > 1) {
        $("#btnUpdate").attr('disabled', true);
    } else {
        $("#btnUpdate").attr('disabled', disabled);
    }
}

function loadAllCustomers() {
    $("#tblCustomer").empty();

    for (var customer of customers) {
        var row = `<tr><td>${customer.id}</td><td>${customer.name}</td><td>${customer.address}</td><td>${customer.contact}</td></tr>`;

        $("#tblCustomer").append(row);
    }
}

$("#btnDelete").click(function () {
    let deleteId = $("#txtCustomerId").val();

    let option = confirm("Are You Sure?" + deleteId);
    if (option) {
        if (deleteCustomer(deleteId)) {
            alert("Customer Successfully Deleted.");
            setTextFieldValues("", "", "", "");
        } else {
            alert("No such customer to delete!");
        }
    }
});

function txtFieldsClear() {
    $('#txtCustomerId').val("");
    $('#txtCustomerName').val("");
    $('#txtCustomerAddress').val("");
    $('#txtCustomerContact').val("");
}

$("#btnClear").click(function () {
    txtFieldsClear();
});

$("#btnUpdate").click(function () {
    let customerID = $("#txtCustomerId").val();
    let response = updateCustomer(customerID);

    if (response) {
        alert("Customer Successfully Updated.");
        setTextFieldValues("", "", "", "");
    } else {
        alert("Update Failed!");
    }
});

$("#txtCustomerId").on('keyup', function (event) {
    if (event.code == "Enter") {
        let typeId = $("#txtCustomerId").val();
        let customer = searchCustomer(typeId);
        if (customer != null) {
            setTextFieldValues(customer.id, customer.name, customer.address, customer.contact);
        } else {
            alert("There is no customer available for that " + typeId);
            setTextFieldValues("", "", "", "");
        }
    }
});

function deleteCustomer(customerID) {
    let customer = searchCustomer(customerID);
    if (customer != null) {
        let indexNumber = customers.indexOf(customer);
        customers.splice(indexNumber, 1);
        loadAllCustomers();
        return true;
    } else {
        return false;
    }
}

function setTextFieldValues(id, name, address, contact) {
    bindRowClickEvents();
    $("#txtCustomerId").val(id);
    $("#txtCustomerName").val(name);
    $("#txtCustomerAddress").val(address);
    $("#txtCustomerContact").val(contact);
}

function searchCustomer(id) {
    for (let customer of customers) {
        if (customer.id == id) {
            return customer;
        }
    }
    return null;
}

function updateCustomer(customerID) {
    let customer = searchCustomer(customerID);
    if (customer != null) {
        customer.id = $("#txtCustomerId").val();
        customer.name = $("#txtCustomerName").val();
        customer.address = $("#txtCustomerAddress").val();
        customer.contact = $("#txtCustomerContact").val();
        loadAllCustomers();
        return true;
    } else {
        return false;
    }
}

function trCusSelector() {
    $("#tblCustomer>tr").click(function () {
        let id = $(this).children(':eq(0)').text();
        let name = $(this).children(':eq(1)').text();
        let address = $(this).children(':eq(2)').text();
        let contact = $(this).children(':eq(3)').text();

        console.log(id + "  " + name + "  " + address + " " + contact);

        $('#txtCustomerId').val(id);
        $('#txtCustomerName').val(name);
        $('#txtCustomerAddress').val(address);
        $('#txtCustomerContact').val(contact);
    });
}

