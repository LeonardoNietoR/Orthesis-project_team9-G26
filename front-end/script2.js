// Variables

const tbodyTablaOrthesis = document.getElementById("table_orthesis-tbody");
const btnCreateOrthesis = document.getElementById("btnCreateOrthesis");
const btnEditOrthesis = document.getElementById("btnEditOrthesis");
const inputOrthesisId = document.getElementById("orthesis_id");
const inputOrthesisName = document.getElementById("orthesis_name");
const inputOrthesisBrand = document.getElementById("orthesis_brand");
const inputOrthesisModel = document.getElementById("orthesis_model");
const inputOrthesisCategory = document.getElementById("orthesis_categoryId");

const urlOrthesisRequest =
   "https://g400927313eea0e-g7e55587xh9qd4mr.adb.us-ashburn-1.oraclecloudapps.com/ords/admin/orthesis/orthesis";

// CRUD Orthesis ------------------------------------------------------

async function crudOperationOrthesis(
   method = "GET",
   id = null,
   eventTarget = null
) {
   if (method === "GET") {
      const response = await fetch(urlOrthesisRequest);
      const data = await response.json();

      fillTable(data.items);
   }

   if (method === "POST") {
      const dataToSend = {
         id: parseInt(inputOrthesisId.value),
         name: inputOrthesisName.value,
         brand: inputOrthesisBrand.value,
         model: parseInt(inputOrthesisModel.value),
         category_id: parseInt(inputOrthesisCategory.value),
      };
      try {
         const response = await fetch(urlOrthesisRequest, {
            method: method,
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

   if (method === "PUT") {
      const currentRow = eventTarget.parentElement.parentElement;
      // makes each cell of the row editable
      Array.from(currentRow.children).forEach((elem) => {
         elem.setAttribute("contenteditable", "");
      });

      try {
         const response = await fetch(urlOrthesisRequest, {
            method: method,
            body: JSON.stringify(dataToSend),
            headers: { "Content-type": "application/json" },
         });

         if (!response.ok) {
            throw new Error("Error with put...");
         }
         console.log("Successful PUT");
      } catch (err) {
         console.log("ERRORRR" + err);
      }
   }

   if (method === "DELETE") {
      console.log("clicked delete");

      try {
         const response = await fetch(`${urlOrthesisRequest}/${id}`, {
            method: method,
            body: null,
         });

         if (!response.ok) {
            throw new Error("Error with delete...");
         }

         location.reload();
      } catch (err) {
         console.log("ERRORRR" + err);
      }
   }
}

crudOperationOrthesis();

const fillTable = (data) => {
   data.forEach((item) => {
      const newOrthesis = tbodyTablaOrthesis.insertRow();

      newOrthesis.insertCell([0]).innerHTML = item.id;
      newOrthesis.insertCell([1]).innerHTML = item.name;
      newOrthesis.insertCell([2]).innerHTML = item.brand;
      newOrthesis.insertCell([3]).innerHTML = item.model;
      newOrthesis.insertCell([4]).innerHTML = item.category_id;
      newOrthesis.insertCell([
         5,
      ]).innerHTML = `<button onClick="crudOperationOrthesis('PUT', null, this)">Edit</button>
      <button onClick="crudOperationOrthesis('DELETE' , ${item.id})">Delete</button> 
      
      `;
   });
};

btnCreateOrthesis.addEventListener("click", (event) => {
   event.preventDefault();
   crudOperationOrthesis("POST");
});
