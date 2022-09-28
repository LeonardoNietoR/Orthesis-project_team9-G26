const tbodyTablaClient = document.getElementById("table_client-tbody");
const btnRegisterClient = document.getElementById("btnRegisterClient");
const inputCLientId = document.getElementById("client_id");
const inputCLientName = document.getElementById("client_name");
const inputCLientEmail = document.getElementById("client_email");
const inputCLientAge = document.getElementById("client_age");

const urlClientRequest =
   "https://g400927313eea0e-g7e55587xh9qd4mr.adb.us-ashburn-1.oraclecloudapps.com/ords/admin/client/client";

// CRUD Client ------------------------------------------------------

async function readClient() {
   const response = await fetch(urlClientRequest);
   const data = await response.json();

   llenarTablaClient(data.items);
}

async function createClient() {
   const dataToSend = {
      id: parseInt(inputCLientId.value),
      name: inputCLientName.value,
      email: inputCLientEmail.value,
      age: parseInt(inputCLientAge.value),
   };

   try {
      const response = await fetch(urlClientRequest, {
         method: "POST",
         body: JSON.stringify(dataToSend),
         headers: { "Content-type": "application/json" },
      });

      if (!response.ok) {
         throw new Error("Error with post");
      }

      location.reload();
   } catch (err) {
      console.log(err);
   }
}

async function updateClient(filaEditada) {
   const dataToSend = {
      id: parseInt(filaEditada[0].innerText),
      name: filaEditada[1].innerText,
      email: filaEditada[2].innerText,
      age: parseInt(filaEditada[3].innerText),
   };

   try {
      const response = await fetch(urlClientRequest, {
         method: "PUT",
         body: JSON.stringify(dataToSend),
         headers: { "Content-type": "application/json" },
      });

      if (!response.ok) {
         throw new Error("Error with put...");
      }

      location.reload();
   } catch (err) {
      console.log("ERRORRR" + err);
   }
}

async function deleteClient(id) {
   try {
      const response = await fetch(`${urlClientRequest}/${id}`, {
         method: "DELETE",
         body: null,
      });

      if (!response.ok) {
         throw new Error("Error with delete...");
      }

      location.reload();
   } catch (err) {
      console.log("ERRORRR:" + err);
   }
}

readClient();

const llenarTablaClient = (data) => {
   data.forEach((item) => {
      const newClient = tbodyTablaClient.insertRow();

      newClient.insertCell([0]).innerHTML = item.id;
      newClient.insertCell([1]).innerHTML = item.name;
      newClient.insertCell([2]).innerHTML = item.age;
      newClient.insertCell([3]).innerHTML = item.email;
      newClient.insertCell([
         4,
      ]).innerHTML = `<button onClick="habilitarEdicionTablaClient(this)">Edit</button>`;
      newClient.insertCell([
         5,
      ]).innerHTML = `<button onClick="deleteClient(${item.id})">Delete</button> `;
   });
};

const habilitarEdicionTablaClient = (eventTarget) => {
   const tdContenedorEditBtn = eventTarget.parentElement;
   const filaAEditar = eventTarget.parentElement.parentElement;
   const arrayFilaAEditar = Array.from(filaAEditar.children);

   arrayFilaAEditar.forEach((elem, index) => {
      if (
         index !== 0 &&
         index !== arrayFilaAEditar.length - 1 &&
         index !== arrayFilaAEditar.length - 2
      )
         elem.setAttribute("contenteditable", "");
      if (index === 1) elem.focus();
   });

   crearBtnGuardarClient(tdContenedorEditBtn);
};

const crearBtnGuardarClient = (contenedorBtn) => {
   const btnGuardar = document.createElement("button");
   btnGuardar.textContent = "Save";
   contenedorBtn.innerHTML = "";
   contenedorBtn.prepend(btnGuardar);
   btnGuardar.addEventListener("click", () => {
      updateClient(Array.from(contenedorBtn.parentElement.cells));
   });
};

btnRegisterClient.addEventListener("click", (event) => {
   event.preventDefault();
   createClient();
});
