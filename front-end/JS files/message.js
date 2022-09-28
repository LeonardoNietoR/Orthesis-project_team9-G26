const tbodyTablaMessage = document.getElementById("table_message-tbody");
const btnRegisterMessage = document.getElementById("btnRegisterMessage");
const inputMessageId = document.getElementById("message_id");
const inputMessageText = document.getElementById("message_messageText");

const urlMessageRequest =
   "https://g400927313eea0e-g7e55587xh9qd4mr.adb.us-ashburn-1.oraclecloudapps.com/ords/admin/message/message";

// CRUD Message ------------------------------------------------------

async function readMessage() {
   const response = await fetch(urlMessageRequest);
   const data = await response.json();

   llenarTablaMessage(data.items);
}

async function createMessage() {
   console.log("Mensaje: ---");

   console.log(inputMessageText.value);

   const dataToSend = {
      id: parseInt(inputMessageId.value),
      messagetext: inputMessageText.value,
   };

   try {
      const response = await fetch(urlMessageRequest, {
         method: "POST",
         body: JSON.stringify(dataToSend),
         headers: { "Content-type": "application/json" },
      });

      if (!response.ok) {
         throw new Error("Error with POST...");
      }

      location.reload();
   } catch (err) {
      console.log(err);
   }
}

async function updateMessage(filaEditada) {
   const dataToSend = {
      id: parseInt(filaEditada[0].innerText),
      messagetext: filaEditada[1].innerText,
   };

   try {
      const response = await fetch(urlMessageRequest, {
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

async function deleteMessage(id) {
   try {
      const response = await fetch(`${urlMessageRequest}/${id}`, {
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

readMessage();

const llenarTablaMessage = (data) => {
   data.forEach((item) => {
      const newMessage = tbodyTablaMessage.insertRow();

      newMessage.insertCell([0]).innerHTML = item.id;
      newMessage.insertCell([1]).innerHTML = item.messagetext;

      newMessage.insertCell([
         2,
      ]).innerHTML = `<button onClick="habilitarEdicionTablaMessage(this)">Edit</button>`;
      newMessage.insertCell([
         3,
      ]).innerHTML = `<button onClick="deleteMessage(${item.id})">Delete</button> `;
   });
};

const habilitarEdicionTablaMessage = (eventTarget) => {
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

   crearBtnGuardarMessage(tdContenedorEditBtn);
};

const crearBtnGuardarMessage = (contenedorBtn) => {
   const btnGuardar = document.createElement("button");
   btnGuardar.textContent = "Save";
   contenedorBtn.innerHTML = "";
   contenedorBtn.prepend(btnGuardar);
   btnGuardar.addEventListener("click", () => {
      updateMessage(Array.from(contenedorBtn.parentElement.cells));
   });
};

btnRegisterMessage.addEventListener("click", (event) => {
   event.preventDefault();
   createMessage();
});
