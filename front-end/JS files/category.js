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

async function updateCategory(filaEditada, id) {
   const dataToSend = {
      id: id,
      name: filaEditada[0].innerText,
      description: filaEditada[2].innerText,
   };

   console.log(dataToSend);

   try {
      const response = await fetch(`${urlCategoryRequest}/Category/update`, {
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

async function deleteCategory() {
   const rowSelected = Array.from(tableBody.children).find((row) => {
      return row.dataset.rowIsSelected === "true";
   });

   if (!rowSelected) {
      alert("Please select a category to delete");
      return;
   }

   const id = rowSelected.dataset.idcategory;
   console.log(id);

   try {
      const response = await fetch(`${urlCategoryRequest}/Category/${id}`, {
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
          <tr class="tr_table" data-idcategory=${item.id} >
            <td>${item.name}</td>
            <td>-- ortesisname --</td>
            <td>${item.description}</td>
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
      alert("Please select a category to edit");
      return;
   }

   if (event.target.dataset.type === "edit") {
      Array.from(rowSelected.children).forEach((elem, index) => {
         if (index !== 1) {
            elem.setAttribute("contenteditable", "");
         }
         if (index === 0) elem.focus();
      });

      btnEditCategory.innerText = "Save";
      event.target.dataset.type = "save";
      return;
   }
   console.log(rowSelected);

   const rowEditedId = parseInt(rowSelected.dataset.idcategory);
   updateCategory(Array.from(rowSelected.children), rowEditedId);
};

// Event listeners **************************************************

btnCreateCategory.addEventListener("click", (event) => {
   event.preventDefault();
   createCategory();
});

btnEditCategory.addEventListener("click", habilitarEdicionTabla);

btnDeleteCategory.addEventListener("click", deleteCategory);

tableBody.addEventListener("click", effectsOnRows);
tableBody.addEventListener("mouseover", effectsOnRows);
tableBody.addEventListener("mouseout", effectsOnRows);
