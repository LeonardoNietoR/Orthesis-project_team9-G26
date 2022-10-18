const btnCreate = document.getElementById("btnCreate");
const btnEdit = document.getElementById("btnEdit");
const btnDelete = document.getElementById("btnDelete");
const tableBody = document.getElementById("table_body");
const inputClientName = document.getElementById("client_name");
const inputClientAge = document.getElementById("client_age");
const inputClientEmail = document.getElementById("client_email");
const inputClientPassword = document.getElementById("client_password");

const urlClientRequest = "http://localhost:8080/api";

// CRUD CLIENT ------------------------------------------------------

async function readClient() {
   try {
      const response = await fetch(`${urlClientRequest}/Client/all`);
      const data = await response.json();
      console.log(data);

      sessionStorage.setItem("dataClient", JSON.stringify(data));

      llenarTablaClient(data);
   } catch (err) {
      console.log(err);
   }
}

async function createClient() {
   if (
      inputClientName.value !== "" &&
      inputClientAge.value !== "" &&
      inputClientEmail.value !== "" &&
      inputClientPassword.value !== ""
   ) {
      const dataToSend = {
         name: inputClientName.value,
         age: inputClientAge.value,
         email: inputClientEmail.value,
         password: inputClientPassword.value,
      };

      try {
         const response = await fetch(`${urlClientRequest}/Client/save`, {
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

async function updateClient(filaEditada, id) {
   const dataToSend = {
      idClient: id,
      name: filaEditada[0].innerText,
      age: filaEditada[1].innerText,
      email: filaEditada[2].innerText,
   };

   console.log(dataToSend);

   try {
      const response = await fetch(`${urlClientRequest}/Client/update`, {
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

async function deleteClient() {
   const rowSelected = Array.from(tableBody.children).find((row) => {
      return row.dataset.rowIsSelected === "true";
   });

   if (!rowSelected) {
      alert("Please select a client to delete");
      return;
   }

   const id = rowSelected.dataset.id;
   console.log(id);

   try {
      const response = await fetch(`${urlClientRequest}/Client/${id}`, {
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
   if (data) {
      data.forEach((item) => {
         const newRow = `
          <tr class="tr_table" data-id=${item.idClient} >
            <td>${item.name}</td>
            <td>${item.age}</td>
            <td>${item.email}</td>
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
      alert("Please select a client to edit");
      return;
   }

   if (event.target.dataset.type === "edit") {
      Array.from(rowSelected.children).forEach((elem, index) => {
         elem.setAttribute("contenteditable", "");
         if (index === 0) elem.focus();
      });

      btnEdit.innerText = "Save";
      event.target.dataset.type = "save";
      return;
   }

   const rowEditedId = parseInt(rowSelected.dataset.id);

   updateClient(Array.from(rowSelected.children), rowEditedId);
};

// Event listeners **************************************************

btnCreate.addEventListener("click", (event) => {
   event.preventDefault();
   createClient();
});

btnEdit.addEventListener("click", habilitarEdicionTabla);

btnDelete.addEventListener("click", deleteClient);

tableBody.addEventListener("click", effectsOnRows);
tableBody.addEventListener("mouseover", effectsOnRows);
tableBody.addEventListener("mouseout", effectsOnRows);
