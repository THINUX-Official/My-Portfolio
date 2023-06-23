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

