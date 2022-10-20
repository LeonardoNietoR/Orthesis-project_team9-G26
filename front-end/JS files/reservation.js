const btnCreate = document.getElementById("btnCreate");
const btnEdit = document.getElementById("btnEdit");
const btnDelete = document.getElementById("btnDelete");
const tableBody = document.getElementById("table_body");
const inputOrtopedics = document.getElementById("reservation_ortopedic");
const inputClient = document.getElementById("reservation_client");
const inputStartDate = document.getElementById("reservation_startDate");
const inputDevolutionDate = document.getElementById(
   "reservation_devolutionDate"
);

const urlReservationRequest = "http://localhost:8080/api";

// CRUD RESERVATION ------------------------------------------------------

async function readReservation() {
   try {
      const response = await fetch(`${urlReservationRequest}/Reservation/all`);
      const data = await response.json();
      console.log(data);

      // sessionStorage.setItem("dataReservation", JSON.stringify(data));

      llenarTabla(data);
   } catch (err) {
      console.log(err);
   }
}

async function createReservation() {
   if (!inputOrtopedics.value) {
      alert("Please select an ortopedic");
      return;
   }
   if (!inputClient.value) {
      alert("Please select a client");
      return;
   }

   if (inputStartDate.value !== "" && inputDevolutionDate.value !== "") {
      const dataToSend = {
         startDate: inputStartDate.value,
         devolutionDate: inputDevolutionDate.value,
         status: "created",
         ortopedic: { id: parseInt(inputOrtopedics.value) },
         client: { idClient: parseInt(inputClient.value) },
      };

      try {
         const response = await fetch(
            `${urlReservationRequest}/Reservation/save`,
            {
               method: "POST",
               body: JSON.stringify(dataToSend),
               headers: { "Content-type": "application/json" },
            }
         );

         if (!response.ok) {
            throw new Error("Error with post");
         }

         location.reload();
      } catch (err) {
         console.log(err);
      }
   }
}

async function updateReservation(filaEditada, id) {
   const dataToSend = {
      idReservation: id,
      status: filaEditada[3].innerText,
      startDate: filaEditada[4].innerText,
      devolutionDate: filaEditada[5].innerText,
   };

   try {
      const response = await fetch(
         `${urlReservationRequest}/Reservation/update`,
         {
            method: "PUT",
            body: JSON.stringify(dataToSend),
            headers: { "Content-type": "application/json" },
         }
      );

      if (!response.ok) {
         throw new Error("Error with put...:" + response.statusText);
      }

      location.reload();
   } catch (err) {
      console.log("ERRORRR" + err);
   }
}

async function deleteReservation() {
   const rowSelected = Array.from(tableBody.children).find((row) => {
      return row.dataset.rowIsSelected === "true";
   });

   if (!rowSelected) {
      alert("Please select a reservation to delete");
      return;
   }

   const id = rowSelected.dataset.id;

   try {
      const response = await fetch(
         `${urlReservationRequest}/Reservation/${id}`,
         {
            method: "DELETE",
            body: null,
         }
      );

      if (!response.ok) {
         throw new Error("Error with delete...");
      }

      location.reload();
   } catch (err) {
      console.log("ERRORRR:" + err);
   }
}

const llenarListaOptionsOfOrtopedics = () => {
   const ortopedicList = JSON.parse(sessionStorage.getItem("dataOrtesis"));

   if (ortopedicList) {
      ortopedicList.forEach((ortopedic) => {
         const html = `<option value="${ortopedic.id}">${ortopedic.name}</option>`;
         inputOrtopedics.insertAdjacentHTML("beforeend", html);
      });
   }
};

const llenarListaOptionsOfClients = () => {
   const clientList = JSON.parse(sessionStorage.getItem("dataClient"));
   console.log(clientList);

   if (clientList) {
      clientList.forEach((client) => {
         const html = `<option value="${client.idClient}">${client.name}</option>`;
         inputClient.insertAdjacentHTML("beforeend", html);
      });
   }
};

const llenarTabla = (data) => {
   console.log(data);

   if (data) {
      data.forEach((item) => {
         const newRow = `
          <tr class="tr_table" data-id=${item.idReservation} >

            <td>${item.idReservation}</td>
            <td>${item.ortopedic.name}</td>
            <td>${item.client.name}</td>
            <td>${item.status}</td>
            <td>${item.startDate}</td>
            <td>${item.devolutionDate}</td>
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
      alert("Please select a reservation to edit");
      return;
   }

   if (event.target.dataset.type === "edit") {
      Array.from(rowSelected.children).forEach((elem, index) => {
         if (index !== 0 && index !== 1 && index !== 2)
            elem.setAttribute("contenteditable", "");
         if (index === 3) elem.focus();
      });

      btnEdit.innerText = "Save";
      event.target.dataset.type = "save";
      return;
   }

   const rowEditedId = parseInt(rowSelected.dataset.id);

   updateReservation(Array.from(rowSelected.children), rowEditedId);
};

readReservation();
llenarListaOptionsOfOrtopedics();
llenarListaOptionsOfClients();
// Event listeners **************************************************

btnCreate.addEventListener("click", (event) => {
   event.preventDefault();
   createReservation();
});

btnEdit.addEventListener("click", habilitarEdicionTabla);

btnDelete.addEventListener("click", deleteReservation);

tableBody.addEventListener("click", effectsOnRows);
tableBody.addEventListener("mouseover", effectsOnRows);
tableBody.addEventListener("mouseout", effectsOnRows);
