function escape_string(string) {
    var to_escape = ["\\", ";", ",", ":", '"'];
    var output = "";
    for (var i = 0; i < string.length; i++) {
        if ($.inArray(string[i], to_escape) != -1) {
            output += "\\" + string[i];
        } else {
            output += string[i];
        }
    }
    return output;
}

function generate_qrcode() {
    var ssid = $("#ssid").val();
    var hidden = $("#hidden").is(":checked");
    var enc = $("#enc").val();
    var key = $("#key").val();
    if (enc === "nopass") {
        key = "";
    }
    // https://github.com/zxing/zxing/wiki/Barcode-Contents#wi-fi-network-config-android-ios-11
    var qrstring =
        "WIFI:S:" +
        escape_string(ssid) +
        ";T:" +
        enc +
        ";P:" +
        escape_string(key) +
        ";";
    if (hidden) {
        qrstring += "H:true";
    }
    qrstring += ";";

    // $("#qrcode-img").empty();
    // $("#qrcode-img").qrcode(qrstring);

    // var canvas = $("#qrcode canvas");
    // if (canvas.length == 1) {
    // 	var data = canvas[0].toDataURL("image/png");
    // 	var e = $("#btn-export-qrcode");
    // 	e.attr("href", data);
    // 	e.attr("download", ssid + "-qrcode.png");
    // 	// e.show() sets display:inline, but we need inline-block
    // 	e.css("display", "inline-block");
    // }
    console.log(qrstring);
}

$(document).ready(function () {
    $("#btn-generate-qrcode").click(function () {
        generate_qrcode();
        return false;
    });

    $("#qrcode-form").tooltip({
        selector: "[data-toggle=tooltip]",
    });

    $("#btn-display-key").click(function () {
        var $key = $("#key");
        if ($key.attr("type") === "password") {
            $key.attr("type", "text");
            $("#display-key-icon").attr("class", "fas fa-eye-slash");
        } else {
            $key.attr("type", "password");
            $("#display-key-icon").attr("class", "fas fa-eye");
        }
    });

    $("#enc").change(function () {
        if ($(this).val() != "nopass") {
            $("#passphrase-key").show();
            $("#key").attr("required", "required");
        } else {
            $("#passphrase-key").hide();
            $("#key").val("");
            $("#key").removeAttr("required");
        }
    });
});