function Say_Hello() {
    const url = window.location.href;
    console.log(url)
    window.location.replace(url + "/dashboard");
}