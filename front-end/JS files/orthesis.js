// Variables

const tbodyTablaOrthesis = document.getElementById("table_orthesis-tbody");
const btnCreateOrthesis = document.getElementById("btnCreateOrthesis");
const inputOrthesisId = document.getElementById("orthesis_id");
const inputOrthesisName = document.getElementById("orthesis_name");
const inputOrthesisBrand = document.getElementById("orthesis_brand");
const inputOrthesisYear = document.getElementById("orthesis_year");
const inputOrthesisCategory = document.getElementById("orthesis_categoryId");
const inputOrthesisDescription = document.getElementById(
   "orthesis_description"
);

// const urlOrthesisRequest =
//    "https://g400927313eea0e-g7e55587xh9qd4mr.adb.us-ashburn-1.oraclecloudapps.com/ords/admin/orthesis/orthesis";

const urlOrthesisRequest = "http://localhost:8080/api";

// CRUD Orthesis ------------------------------------------------------

async function readOrthesis() {
   const response = await fetch(`${urlOrthesisRequest}/Ortopedic/all`);
   const data = await response.json();
   console.log(data.items);

   llenarTablaOrthesis(data.items);
}

async function createOrthesis() {
   const dataToSend = {
      id: parseInt(inputOrthesisId.value),
      name: inputOrthesisName.value,
      brand: inputOrthesisBrand.value,
      year: parseInt(inputOrthesisYear.value),
      description: inputOrthesisDescription.value,
      category_id: parseInt(inputOrthesisCategory.value),
   };

   try {
      const response = await fetch(urlOrthesisRequest, {
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

async function updateOrthesis(filaEditada) {
   const dataToSend = {
      id: parseInt(filaEditada[0].innerText),
      name: filaEditada[1].innerText,
      brand: filaEditada[2].innerText,
      model: parseInt(filaEditada[3].innerText),
      category_id: parseInt(filaEditada[4].innerText),
   };

   try {
      const response = await fetch(urlOrthesisRequest, {
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
      const response = await fetch(`${urlOrthesisRequest}/${id}`, {
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

const llenarTablaOrthesis = (data) => {
   if (data) {
      data.forEach((item) => {
         const newOrthesis = tbodyTablaOrthesis.insertRow();

         newOrthesis.insertCell([0]).innerHTML = item.id;
         newOrthesis.insertCell([1]).innerHTML = item.name;
         newOrthesis.insertCell([2]).innerHTML = item.brand;
         newOrthesis.insertCell([3]).innerHTML = item.year;
         newOrthesis.insertCell([4]).innerHTML = item.description;
         newOrthesis.insertCell([5]).innerHTML = item.category_id;
         newOrthesis.insertCell([
            6,
         ]).innerHTML = `<button onClick="habilitarEdicionTabla(this)">Edit</button>`;
         newOrthesis.insertCell([
            7,
         ]).innerHTML = `<button onClick="deleteOrthesis(${item.id})">Delete</button> `;
      });
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
