window.onload = function () {
  // DOM manipulation code
  const btnRegister = document.getElementById("btnRegister");
  btnRegister.addEventListener("click", function () {
    // Open modal window
    Swal.fire({
      title: "WebConference Subscription",
      html:
        '<input id="txtName" class="swal2-input" placeholder="name">' +
        '<input id="txtEmail" class="swal2-input" placeholder="Email">',
      showCancelButton: true,
      confirmButtonText: "Subscribe",
      cancelButtonText: "Cancel",
      showLoaderOnConfirm: true,
      preConfirm: () => {
        const name = document.getElementById("txtName").value;
        const email = document.getElementById("txtEmail").value;
        const url_base = "https://fcawebbook.herokuapp.com";
        return fetch(`${url_base}/conferences/1/participants/${email}`, {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          method: "POST",
          body: `participantName=${name}`,
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error(response.statusText);
            }
            return response.json();
          })
          .catch((error) => {
            Swal.showValidationMessage(`Request Failed: ${error}`);
          });
      },
      allowOutsideClick: () => !Swal.isLoading(),
    }).then((result) => {
      if (result.value) {
        if (!result.value.err_code) {
          Swal.fire({ title: "Subscription Successful!" });
        } else {
          Swal.fire({ title: `${result.value.err_message}` });
        }
      }
    });
  });
};
