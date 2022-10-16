const btnCreateCategory = document.getElementById("btnCreate");
const btnEditCategory = document.getElementById("btnEditCategory");
const btnDeleteCategory = document.getElementById("btnDeleteCategory");
const tableBody = document.getElementById("table_body");
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

      sessionStorage.setItem("dataCategory", JSON.stringify(data));

      llenarTablaCategory(data);
   } catch (err) {
      console.log(err);
   }
}

async function createCategory() {
   console.log(inputCategoryName.value);
   console.log(inputCategoryDescription.value);

   if (
      inputCategoryName.value !== "" &&
      inputCategoryDescription.value !== ""
   ) {
      const dataToSend = {
         name: inputCategoryName.value,
         description: inputCategoryDescription.value,
      };

      try {
         const response = await fetch(`${urlCategoryRequest}/Category/save`, {
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
      const response = await fetch(`${urlOrthesisRequest}/Category/update`, {
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
      const response = await fetch(`${urlOrthesisRequest}/Category/${id}`, {
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
      data.forEach((item) => {
         const newRow = `
          <tr class="tr_table" data-idCategory=${item.id} >
            <td>${item.name}</td>
            <td>ortesisname</td>
            <td>${item.description}</td>
          </tr>
         `;

         tableBody.insertAdjacentHTML("beforeend", newRow);
      });
   }
};

const selectRow = () => {};

// Event listeners **************************************************

btnCreateCategory.addEventListener("click", (event) => {
   event.preventDefault();
   createCategory();
});

const effectsOnRows = (event) => {
   const rowSelected = event.target.closest(".tr_table");

   if (event.type === "click") {
      tableBody.removeEventListener("mouseover", effectsOnRows);
      tableBody.removeEventListener("mouseout", effectsOnRows);

      Array.from(tableBody.children).forEach((el) => {
         el.style.color = "#000";
         el.style.outline = "";
         el.style["outline-offset"] = "";
      });

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

tableBody.addEventListener("click", effectsOnRows);
tableBody.addEventListener("mouseover", effectsOnRows);
tableBody.addEventListener("mouseout", effectsOnRows);
