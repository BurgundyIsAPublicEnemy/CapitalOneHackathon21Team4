function Say_Hello() {

    var x =   document.getElementById("fname").value; 

    const url = window.location.href;
    console.log(url)
    window.location.replace(url + "dashboard/" + x);
}