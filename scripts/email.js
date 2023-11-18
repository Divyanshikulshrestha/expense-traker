function submitForm(){
    (function(){
        emailjs.init("H-Eo1EPfmm39WVBWQ");
    })();

    let serviceId = "service_szzv777"
    let templateId = "template_lwsz8v1"

    var params = {
        name: document.querySelector("#Name").value,
        subject: document.querySelector("#subject").value,
        email: document.querySelector("#Email").value,
        message: document.querySelector("#message").value,
    }

    emailjs.send(serviceId, templateId, params)
    .then(res => {
        document.querySelector("#Name").value = "";
        document.querySelector("#subject").value = "";
        document.querySelector("#Email").value = "";
        document.querySelector("#message").value = "";
        alert(`Thank you ${params.name}, We will revert you soon.`)

    }).catch();
}