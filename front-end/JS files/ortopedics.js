// Variables

const btnCreateOrthesis = document.getElementById("btnCreateOrthesis");
const inputOrthesisId = document.getElementById("orthesis_id");
const inputOrthesisName = document.getElementById("orthesis_name");
const inputOrthesisBrand = document.getElementById("orthesis_brand");
const inputOrthesisYear = document.getElementById("orthesis_year");
const inputOrthesisCategory = document.getElementById("orthesis_categoryId");
const containerOrtopedicsList = document.getElementById("ortopedic_list");
const rowWithDetails = document.getElementById("table_details-row");
const btnEditOrtopedic = document.getElementById("btnEditOrtopedic");
const btnDeleteOrtopedic = document.getElementById("btnDeleteOrtopedic");
const btnCloseDetails = document.getElementById("btnCancelOrtopedic");
const titleNameDetail = document.getElementById("title_name-detail");
const inputOrthesisDescription = document.getElementById(
   "orthesis_description"
);
const containerDetails = document.querySelector(".container_details");

// // const urlOrthesisRequest =
// //    "https://g400927313eea0e-g7e55587xh9qd4mr.adb.us-ashburn-1.oraclecloudapps.com/ords/admin/orthesis/orthesis";

const urlOrthesisRequest = "http://localhost:8080/api";

// CRUD Ortopedic ------------------------------------------------------

async function readOrthesis() {
   try {
      const response = await fetch(`${urlOrthesisRequest}/Ortopedic/all`);
      const data = await response.json();

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
         // category: { id: 1 },
      };

      try {
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
      year: filaEditada[3].innerText,
      description: filaEditada[4].innerText,
      category_id: parseInt(filaEditada[5].innerText),
   };

   console.log(dataToSend);

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

async function deleteOrthesis() {
   const id = rowWithDetails.firstElementChild.innerText;

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
         containerOrtopedicsList.insertAdjacentHTML(
            "beforeend",
            newListElement
         );
      });
   }
};

const llenarTablaDetailsOrtopedic = (data) => {
   console.log(data);

   if (data) {
      Array.from(rowWithDetails.children).forEach((el, index) => {
         if (index === 0) el.innerHTML = data.id;
         if (index === 1) el.innerHTML = data.name;
         if (index === 2) el.innerHTML = data.brand;
         if (index === 3) el.innerHTML = data.year;
         if (index === 4) el.innerHTML = data.description;
         if (index === 5) el.innerHTML = data.category_id;
      });

      titleNameDetail.innerText = `"${data.name}"`;
   }
};

const habilitarEdicionTablaDetalles = (event) => {
   event.preventDefault();
   const arrayFilaAEditar = Array.from(rowWithDetails.children);

   if (event.target.dataset.type === "edit") {
      arrayFilaAEditar.forEach((elem, index) => {
         // makes each cell of the row editable (except for id and category)
         if (index !== 0 && index !== arrayFilaAEditar.length - 1)
            elem.setAttribute("contenteditable", "");
         if (index === 1) elem.focus();
      });

      btnEditOrtopedic.innerText = "save";
      event.target.dataset.type = "save";
      return;
   }

   updateOrthesis(arrayFilaAEditar);
   containerDetails.classList.add("hide");
};

// Event listeners **************************************************

btnCreateOrthesis.addEventListener("click", (event) => {
   event.preventDefault();
   createOrthesis();
});

containerOrtopedicsList.addEventListener("click", (event) => {
   const dataOrtopedics = JSON.parse(sessionStorage.getItem("dataOrt"));
   const ortopedicInfo = dataOrtopedics.find(
      (el) => el.id === parseInt(event.target.dataset.id)
   );
   containerDetails.classList.remove("hide");
   llenarTablaDetailsOrtopedic(ortopedicInfo);
});

btnEditOrtopedic.addEventListener("click", habilitarEdicionTablaDetalles);

btnDeleteOrtopedic.addEventListener("click", deleteOrthesis);

btnCloseDetails.addEventListener("click", () => {
   containerDetails.classList.add("hide");
});
