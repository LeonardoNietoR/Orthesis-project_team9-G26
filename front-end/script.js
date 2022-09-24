consultarEstudiantes();

function crearEstudiante() {
   event.preventDefault();
   const json = {};
   json["id"] = parseInt(document.getElementById("estudianteId").value);
   json["nombre"] = document.getElementById("estudianteName").value;
   json["apellido"] = document.getElementById("estudianteLastName").value;
   json["edad"] = parseInt(document.getElementById("estudianteAge").value);

   $.ajax({
      url: "https://g400927313eea0e-g7e55587xh9qd4mr.adb.us-ashburn-1.oraclecloudapps.com/ords/admin/estudiantes/estudiantes",
      data: json,
      type: "POST",
      dataType: "json",
      complete: function () {
         console.log("post OK");
         limpiarCampos();
         location.reload();
      },
   });
}

function limpiarCampos() {
   document.getElementById("estudianteId").value = "";
   document.getElementById("estudianteName").value = "";
   document.getElementById("estudianteLastName").value = "";
   document.getElementById("estudianteAge").value = "";
}

function seleccionarEstudiante(elemento) {
   estudiante = elemento.parentElement.parentElement;
   document.getElementById("estudianteId").value =
      estudiante.cells[0].innerHTML;
   document.getElementById("estudianteName").value =
      estudiante.cells[1].innerHTML;
   document.getElementById("estudianteLastName").value =
      estudiante.cells[2].innerHTML;
   document.getElementById("estudianteAge").value =
      estudiante.cells[3].innerHTML;
}

function eliminarEstudiante(id) {
   $.ajax({
      url: `https://g400927313eea0e-g7e55587xh9qd4mr.adb.us-ashburn-1.oraclecloudapps.com/ords/admin/estudiantes/estudiantes/${id}`,
      data: null,
      type: "DELETE",
      dataType: "json",
      complete: function () {
         console.log("delete OK");
         limpiarCampos();
         location.reload();
      },
   });
}

function editarEstudiante() {
   event.preventDefault();
   const json = {};
   json["id"] = parseInt(document.getElementById("estudianteId").value);
   json["nombre"] = document.getElementById("estudianteName").value;
   json["apellido"] = document.getElementById("estudianteLastName").value;
   json["edad"] = parseInt(document.getElementById("estudianteAge").value);

   $.ajax({
      url: "https://g400927313eea0e-g7e55587xh9qd4mr.adb.us-ashburn-1.oraclecloudapps.com/ords/admin/estudiantes/estudiantes",
      data: json,
      type: "PUT",
      dataType: "json",
      complete: function () {
         console.log("put OK");
         limpiarCampos();
         // location.reload();
      },
   });
}

function consultarEstudiantes() {
   const tabla = document
      .getElementById("listaEstudiantes")
      .getElementsByTagName("tbody")[0];

   console.log("tabla: " + tabla);

   $.ajax({
      url: "https://g400927313eea0e-g7e55587xh9qd4mr.adb.us-ashburn-1.oraclecloudapps.com/ords/admin/estudiantes/estudiantes",
      data: null,
      type: "GET",
      dataType: "json",
      success: function (data) {
         data.items.map((item) => {
            const nuevoEstudiante = tabla.insertRow();

            console.log("nuevoEstu:" + nuevoEstudiante);

            nuevoEstudiante.insertCell(0).innerHTML = item.id;
            nuevoEstudiante.insertCell(1).innerHTML = item.nombre;
            nuevoEstudiante.insertCell(2).innerHTML = item.apellido;
            nuevoEstudiante.insertCell(3).innerHTML = item.edad;
            nuevoEstudiante.insertCell(
               4
            ).innerHTML = `<button onClick="seleccionarEstudiante(this)">Seleccionar</button>
            <button onClick="eliminarEstudiante(${item.id})">Eliminar</button>
            `;
         });
      },
      error: function (error) {
         console.log("Error: " + error);
      },
      complete: function () {
         console.log("GET OK");
      },
   });
}
