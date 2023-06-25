initiateUI();

function initiateUI() {
    clearAll();
    $("#dashboard").css("display", "block");

    setTheLastView();
}

function clearAll() {
    $("#dashboard, #customerContent,#itemContent,#orderContent").css('display', 'none');
}

function saveLastView(clickedId) {
    switch (clickedId) {
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
    saveLastView(viewOb.get(0).itemId);
    console.log(viewOb.get(0).itemId);
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

/*var items = [];*/

$("#btnItemSave").click(function () {
    saveItem();
});

function saveItem() {
    let itemId = $("#txtItemId").val();
    if (searchItem(itemId.trim()) == undefined) {
        let name = $("#txtCustomerName").val();
        let price = $("#txtItemPrice").val();
        let qty = $("#txtItemQty").val();

        let newItems = Object.assign({}, itemObject);
        newItems.itemId = itemId;
        newItems.name = name;
        newItems.price = price;
        newItems.qty = qty;

        items.push(newItems);

        clearItemInputFields();
        loadAllItems();
        loadAllItemId();
        bindRowClickEventsItems();

    } else {
        alert("Item Already Exits!");
    }
}



function itemTxtFieldsClear() {
    $('#txtItemId').val("");
    $('#txtItemName').val("");
    $('#txtItemPrice').val("");
    $('#txtItemQty').val("");
}

function bindRowClickEventsItems() {
    $("#tblItem>tr").click(function () {
        let itemId = $(this).children(":eq(0)").text();
        let name = $(this).children(":eq(1)").text();
        let price = $(this).children(":eq(2)").text();
        let qty = $(this).children(":eq(3)").text();

        $('#txtItemId').val(itemId);
        $('#txtItemName').val(name);
        $('#txtItemPrice').val(price);
        $('#txtItemQty').val(qty);

        setItemButtonUpdate(2);
        $("#btnItemUpdate").attr('disabled', false);
    });
    $("#btnItemUpdate").attr('disabled', true);
}

function setItemButtonUpdate(value) {
    if (value > 1) {
        $("#btnItemUpdate").attr('disabled', true);
    } else {
        $("#btnItemUpdate").attr('disabled', disabled);
    }
}

function loadAllItems() {
    $("#tblItem").empty();

    for (var item of items) {
        var row = `<tr><td>${item.itemId}</td><td>${item.name}</td><td>${item.price}</td><td>${item.qty}</td></tr>`;

        $("#tblItem").append(row);
    }
}

$("#btnItemDelete").click(function () {
    let deleteId = $("#txtItemId").val();

    let option = confirm("Are you Sure?" + deleteId);
    if (option) {
        if (deleteItem(deleteId)) {
            alert("Item Successfully Deleted.");
            setTextFieldValuesItem("", "", "", "");
        } else {
            alert("No such Item to delete!");
        }
    }
});

$("#btnItemClear").click(function () {
    itemTxtFieldsClear();
});

$("#btnItemUpdate").click(function () {
    let ItemId = $("#txtItemId").val();
    let responses = updateItem(ItemId);

    if (responses) {
        alert("Item Successfully Updated.");
        setTextFieldValuesItem("", "", "", "");

    } else {
        alert("Update Failed.!");
    }
});

$("#txtItemId").on('keyup', function (event) {
    if (event.code == "Enter") {
        let typedId = $("#txtItemId").val();
        let item = searchItem(typedId);

        if (item != null) {
            setTextFieldValuesItem(item.itemId, item.name, item.price, item.qty);
        } else {
            alert("There is no Item available for that " + typedId);
            setTextFieldValuesItem("", "", "", "");
        }
    }
});

function deleteItem(ItemId) {
    let Item = searchItem(ItemId);

    if (Item != null) {
        let indexNumber = items.indexOf(Item);
        items.splice(indexNumber, 1);
        loadAllItems();
        return true;
    } else {
        return false;
    }
}

function setTextFieldValuesItem(itemId, name, price, qty) {
    bindRowClickEventsItems();
    $("#txtItemId").val(itemId);
    $("#txtItemName").val(name);
    $("#txtItemPrice").val(price);
    $("#txtItemQty").val(qty);
}

function searchItem(itemId) {
    for (let item of items) {
        if (item.itemId == itemId) {
            return item;
        }
    }
    return null;
}

function updateItem(Items) {
    let item = searchItem(Items);

    if (item != null) {
        item.itemId = $("#txtItemId").val();
        item.name = $("#txtItemName").val();
        item.price = $("#txtItemPrice").val();
        item.qty = $("#txtItemQty").val();
        loadAllItems();
        return true;
    } else {
        return false;
    }
}

function addTable() {
    $("#tblItem> tr").detach();

    for (var itm of itemAr) {
        var row = "<tr><td>" + itm.itemId + "</td><td>" + itm.name + "</td><td>" + itm.price + "</td><td>" + itm.qty + "</td></tr>";
        $('#tblItem').append(row);
    }
    trSelector();
}
