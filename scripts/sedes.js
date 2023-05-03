async function listaSede() {
    var response = await sedeGetAll();
    for (const key in response) {
        var newRowContent =
            '<tr><td scope="row">' +
            response[key].id +
            "</td><td>" +
            response[key].nombre +
            "</td><td>" +
            response[key].direccion +
            "</td><td>" +
            response[key].telefono +
            '</td><td class="text-center"><a class="text-warning" onclick="cargaEditarProducto('+response[key].id +
            ')" data-bs-toggle="modal" data-bs-target="#modalEditar"><i class="fa-regular fa-pen-to-square"></i></a></td><td class="text-center"><a class="text-danger" onclick="eliminarSede('+response[key].id +
            ')"><i class="fa-regular fa-trash"></i></a></td></tr>';
        $("#sedeTableBody").append(newRowContent);
    }
}

function limpiarModalAgregar(){
    $("#nombre").val("");
    $("#direccion").val("");
    $("#sede").val("");
}

async function agregarSede(nombre,direccion,telefono){
    try {
        var response = await insertSede(nombre,direccion,telefono);
    } catch (e) {
        $("#spinnerAgregar").hide();
        $("#cancelarAgregar").click();
        swalResponse.fire({
            text: "Error al agregar la sede, por favor reintenta más tarde",
            icon: "error",
        });
        return;
    }
    if (response.success) {
        $("#spinnerAgregar").hide();
        $("#cancelarAgregar").click();
        swalResponse.fire({
            text: "Agregado!",
            icon: "success",
        });
        //$("#productTableBody tr").remove();
        //listaProducto();
        $("#contenido").load("pages/sede.html");
    } else {
        $("#spinnerAgregar").hide();
        $("#cancelarAgregar").click();
        swalResponse.fire({
            text: "Error al agregar la sede, por favor reintenta más tarde",
            icon: "error",
        });
    }
}

async function eliminarSede(sedeId){
    try {
        var response = await deleteSede(sedeId);
    } catch (e) {
        swalResponse.fire({
            text: "Error al eliminar la Sede, por favor reintenta más tarde",
            icon: "error",
        });
        return;
    }
	if (response.success) {
		swalResponse.fire({
			text: "Eliminada!",
			icon: "success",
		});
        $("#contenido").load("pages/sede.html");
	} else {
		swalResponse.fire({
			text: "Error al eliminar la Sede, por favor reintenta más tarde",
			icon: "error",
		});
	}
}