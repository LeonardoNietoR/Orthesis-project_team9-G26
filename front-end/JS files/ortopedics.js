// Variables

const btnCreateOrthesis = document.getElementById("btnCreateOrthesis");
const inputOrthesisId = document.getElementById("orthesis_id");
const inputOrthesisName = document.getElementById("orthesis_name");
const inputOrthesisBrand = document.getElementById("orthesis_brand");
const inputOrthesisYear = document.getElementById("orthesis_year");
const inputOrthesisCategory = document.getElementById("orthesis_categoryId");
const ulOrtopedicsList = document.getElementById("ortopedic_list");
const tbodyTablaDetailsOrt = document.getElementById("table_orthesis-tbody");
const btnEditOrtopedic = document.getElementById("btnEditOrtopedic");
const btnDeleteOrtopedic = document.getElementById("btnDeleteOrtopedic");
const btnCloseDetails = document.getElementById("btnCancelOrtopedic");
const inputOrthesisDescription = document.getElementById(
   "orthesis_description"
);
const containerDetailsOrtopedic = document.querySelector(
   ".container_details-ortopedic"
);

// // const urlOrthesisRequest =
// //    "https://g400927313eea0e-g7e55587xh9qd4mr.adb.us-ashburn-1.oraclecloudapps.com/ords/admin/orthesis/orthesis";

const urlOrthesisRequest = "http://localhost:8080/api";

// CRUD Ortopedic ------------------------------------------------------

async function readOrthesis() {
   try {
      const response = await fetch(`${urlOrthesisRequest}/Ortopedic/all`);
      const data = await response.json();
      console.log(data);

      sessionStorage.setItem("dataOrt", JSON.stringify(data));

      llenarListaOrtopedics(data);
   } catch (err) {
      console.log(err);
   }
}

async function createOrthesis() {
   if (
      inputOrthesisName.value !== "" &&
      inputOrthesisBrand.value !== "" &&
      inputOrthesisYear.value !== "" &&
      inputOrthesisDescription.value !== ""
   ) {
      const dataToSend = {
         name: inputOrthesisName.value,
         brand: inputOrthesisBrand.value,
         year: parseInt(inputOrthesisYear.value),
         description: inputOrthesisDescription.value,
         // category_id: parseInt(inputOrthesisCategory.value),
         // user must create at least one category first, before creating an ortopedic. User must select the category from a dropdown menu with the name, and here we get the id of that name which is sent as {id:#}
         category: { id: 1 },
      };

      try {
         console.log(dataToSend);
         const response = await fetch(`${urlOrthesisRequest}/Ortopedic/save`, {
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

async function updateOrthesis(filaEditada) {
   const dataToSend = {
      id: parseInt(filaEditada[0].innerText),
      name: filaEditada[1].innerText,
      brand: filaEditada[2].innerText,
      model: parseInt(filaEditada[3].innerText),
      category_id: parseInt(filaEditada[4].innerText),
   };

   try {
      const response = await fetch(`${urlOrthesisRequest}/Ortopedic/update`, {
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

async function deleteOrthesis(id) {
   try {
      const response = await fetch(`${urlOrthesisRequest}/Ortopedic/${id}`, {
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

readOrthesis();

const llenarListaOrtopedics = (data) => {
   if (data) {
      data.forEach((item) => {
         const newListElement = `<li><a href="#" data-id=${item.id} >${item.name}</a></li>`;
         ulOrtopedicsList.insertAdjacentHTML("beforeend", newListElement);
      });
   }
};

const llenarTablaDetailsOrtopedic = (data) => {
   console.log(data);

   if (data) {
      const detailsOrtopedic = tbodyTablaDetailsOrt.insertRow();

      detailsOrtopedic.insertCell([0]).innerHTML = data.id;
      detailsOrtopedic.insertCell([1]).innerHTML = data.name;
      detailsOrtopedic.insertCell([2]).innerHTML = data.brand;
      detailsOrtopedic.insertCell([3]).innerHTML = data.year;
      detailsOrtopedic.insertCell([4]).innerHTML = data.description;
      detailsOrtopedic.insertCell([5]).innerHTML = data.category_id;
      // detailsOrtopedic.insertCell([
      //    6,
      // ]).innerHTML = `<button onClick="habilitarEdicionTabla(this)">Edit</button>`;
      // newOrthesis.insertCell([
      //    7,
      // ]).innerHTML = `<button onClick="deleteOrthesis(${item.id})">Delete</button> `;
   }
};

const habilitarEdicionTabla = (eventTarget) => {
   const tdContenedorEditBtn = eventTarget.parentElement;
   const filaAEditar = eventTarget.parentElement.parentElement;
   const arrayFilaAEditar = Array.from(filaAEditar.children);

   arrayFilaAEditar.forEach((elem, index) => {
      // makes each cell of the row editable (except for id)
      if (
         index !== 0 &&
         index !== arrayFilaAEditar.length - 1 &&
         index !== arrayFilaAEditar.length - 2
      )
         elem.setAttribute("contenteditable", "");
      if (index === 1) elem.focus();
   });

   crearBtnGuardar(tdContenedorEditBtn);
};

const crearBtnGuardar = (contenedorBtn) => {
   const btnGuardar = document.createElement("button");
   btnGuardar.textContent = "Save";
   contenedorBtn.innerHTML = "";
   contenedorBtn.prepend(btnGuardar);
   btnGuardar.addEventListener("click", () => {
      updateOrthesis(Array.from(contenedorBtn.parentElement.cells));
   });
};

btnCreateOrthesis.addEventListener("click", (event) => {
   event.preventDefault();
   createOrthesis();
});

ulOrtopedicsList.addEventListener("click", (event) => {
   const dataOrtopedics = JSON.parse(sessionStorage.getItem("dataOrt"));
   const ortopedicInfo = dataOrtopedics.find(
      (el) => el.id === parseInt(event.target.dataset.id)
   );
   containerDetailsOrtopedic.classList.remove("hide");
   llenarTablaDetailsOrtopedic(ortopedicInfo);
});

btnCloseDetails.addEventListener("click", () => {
   containerDetailsOrtopedic.classList.add("hide");
});
