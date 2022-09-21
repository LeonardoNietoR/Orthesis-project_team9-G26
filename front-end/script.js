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
      },
   });
}

function limpiarCampos() {
   document.getElementById("estudianteId").value = "";
   document.getElementById("estudianteName").value = "";
   document.getElementById("estudianteLastName").value = "";
   document.getElementById("estudianteAge").value = "";
}

function consultarEstudiantes() {}
