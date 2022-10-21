const btnCreate = document.getElementById("btnCreate");
const btnEdit = document.getElementById("btnEdit");
const btnDelete = document.getElementById("btnDelete");
const tableBody = document.getElementById("table_body");
const inputMessageText = document.getElementById("message_messageText");
const inputMessageOrtopedic = document.getElementById("message_ortopedic");

const urlMessageRequest = "http://localhost:8080/api";

// CRUD MESSAGE ------------------------------------------------------

async function readMessage() {
   try {
      const response = await fetch(`${urlMessageRequest}/Message/all`);
      const data = await response.json();
      console.log(data);

      // sessionStorage.setItem("dataClient", JSON.stringify(data));

      llenarTabla(data);
   } catch (err) {
      console.log(err);
   }
}

async function createMessage() {
   if (inputMessageText.value !== "") {
      const dataToSend = {
         messageText: inputMessageText.value,
      };

      try {
         const response = await fetch(`${urlMessageRequest}/Message/save`, {
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
}

async function updateMessage(filaEditada, id) {
   const dataToSend = {
      idMessage: id,
      messageText: filaEditada[0].innerText,
   };

   console.log(dataToSend);

   try {
      const response = await fetch(`${urlMessageRequest}/Message/update`, {
         method: "PUT",
         body: JSON.stringify(dataToSend),
         headers: { "Content-type": "application/json" },
      });

      if (!response.ok) {
         throw new Error("Error with put...:" + response.statusText);
      }

      location.reload();
   } catch (err) {
      console.log("ERRORRR" + err);
   }
}

async function deleteMessage() {
   const rowSelected = Array.from(tableBody.children).find((row) => {
      return row.dataset.rowIsSelected === "true";
   });

   if (!rowSelected) {
      alert("Please select a message to delete");
      return;
   }

   const id = rowSelected.dataset.id;
   console.log(id);

   try {
      const response = await fetch(`${urlMessageRequest}/Message/${id}`, {
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

const llenarTabla = (data) => {
   if (data) {
      data.forEach((item) => {
         const newRow = `
          <tr class="tr_table" data-id=${item.idMessage} >
            <td>${item.messageText}</td>
            <td>-- ortopedic name --</td>
          </tr>
         `;

         tableBody.insertAdjacentHTML("beforeend", newRow);
      });
   }
};

const effectsOnRows = (event) => {
   const rowSelected = event.target.closest(".tr_table");

   if (event.type === "click") {
      tableBody.removeEventListener("mouseover", effectsOnRows);
      tableBody.removeEventListener("mouseout", effectsOnRows);

      Array.from(tableBody.children).forEach((el) => {
         el.dataset.rowIsSelected = "false";
         el.style.color = "#000";
         el.style.outline = "";
         el.style["outline-offset"] = "";
      });

      rowSelected.dataset.rowIsSelected = "true";
      rowSelected.style.color = "rgb(149,52,10)";
      rowSelected.style.outline = "2px solid rgb(231, 78, 12)";
      rowSelected.style["outline-offset"] = "-3px";

      return;
   }
   if (event.type === "mouseover") {
      rowSelected.style.outline = "2px solid rgb(231, 78, 12)";
      rowSelected.style["outline-offset"] = "-3px";
      return;
   }
   if (event.type === "mouseout") {
      rowSelected.style.outline = "";
      rowSelected.style["outline-offset"] = "";
      return;
   }
};

const habilitarEdicionTabla = (event) => {
   const rowSelected = Array.from(tableBody.children).find((row) => {
      return row.dataset.rowIsSelected === "true";
   });

   if (!rowSelected) {
      alert("Please select a message to edit");
      return;
   }

   if (event.target.dataset.type === "edit") {
      Array.from(rowSelected.children).forEach((elem, index) => {
         if (index !== 1) elem.setAttribute("contenteditable", "");
         if (index === 0) elem.focus();
      });

      btnEdit.innerText = "Save";
      event.target.dataset.type = "save";
      return;
   }

   const rowEditedId = parseInt(rowSelected.dataset.id);

   updateMessage(Array.from(rowSelected.children), rowEditedId);
};

// Event listeners **************************************************

btnCreate.addEventListener("click", (event) => {
   event.preventDefault();
   createMessage();
});

btnEdit.addEventListener("click", habilitarEdicionTabla);

btnDelete.addEventListener("click", deleteMessage);

tableBody.addEventListener("click", effectsOnRows);
tableBody.addEventListener("mouseover", effectsOnRows);
tableBody.addEventListener("mouseout", effectsOnRows);
