async function getOrthesis() {
   const response = await fetch(
      "https://g400927313eea0e-g7e55587xh9qd4mr.adb.us-ashburn-1.oraclecloudapps.com/ords/admin/orthesis/orthesis"
   );

   const data = await response.json();
   console.log(data);
}

getOrthesis();

async function addMeetupHandler(enteredMeetupData) {
   const response = await fetch("/api/new-meetup", {
      method: "POST",
      body: JSON.stringify(enteredMeetupData),
      headers: { "Content-type": "application/json" },
   });

   const data = await response.json();

   console.log(data);
   router.push("/");
}
