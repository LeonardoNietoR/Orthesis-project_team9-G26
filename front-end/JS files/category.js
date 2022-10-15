const btnCreateCategory = document.getElementById("btnCreate");
const btnEditCategory = document.getElementById("btnEditCategory");
const btnDeleteCategory = document.getElementById("btnDeleteCategory");
const tableContentRow = document.getElementById("table_content-row");
const inputCategoryName = document.getElementById("category_name");
const inputCategoryDescription = document.getElementById(
   "category_description"
);

const urlCategoryRequest = "http://localhost:8080/api";

// CRUD Category ------------------------------------------------------

async function readCategory() {
   try {
      const response = await fetch(`${urlCategoryRequest}/Category/all`);
      const data = await response.json();
      console.log(data);

      // sessionStorage.setItem("dataCateg", JSON.stringify(data));

      llenarTablaCategory(data);
   } catch (err) {
      console.log(err);
   }
}

async function createCategory() {
   if (
      inputCategoryName.value !== "" &&
      inputCategoryDescription.value !== ""
   ) {
      const dataToSend = {
         name: inputCategoryName.value,
         description: inputCategoryDescription.value,
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

async function updateCategory(filaEditada) {
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

async function deleteCategory() {
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

readCategory();

const llenarTablaCategory = (data) => {
   if (data) {
      tableContentRow.

// nuevoEstudiante.insertCell(0).innerHTML = item.id;

   }
};
