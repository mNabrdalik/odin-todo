export function showSide() {
    document.querySelectorAll(".sidenav__button").forEach(element => {
        element.classList.toggle("show");
    })

}

export function showAcc() {
    document.querySelectorAll(".accordion-main").forEach(element => {
        element.classList.toggle("show");
    })
}

export default {showSide, showAcc};