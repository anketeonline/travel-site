import throttle from "lodash/throttle"
import debounce from "lodash/debounce" 

class StickyHeader {
    constructor() {
        this.siteHeader = document.querySelector(".site-header"),
        this.pageSections = document.querySelectorAll(".page-section")
        this.browserHeight = window.innerHeight
        this.previusScrollY = window.scrollY
        this.scrollDirection = "down"
        this.events()
    }

    events() {
        window.addEventListener("scroll", throttle(()=>this.runOnScroll(), 200))
        window.addEventListener("resize", debounce(()=>{
            this.browserHeight = window.innerHeight
        }, 333))
    }

    runOnScroll() {
        this.determineScrollDirection()

        if(window.scrollY > 60){
            this.siteHeader.classList.add("site-header--dark")
        }
        else{
            this.siteHeader.classList.remove("site-header--dark")
        }

        this.pageSections.forEach((el)=> this.calcSection(el))
    }

    determineScrollDirection(){
        if(window.scrollY > this.previusScrollY){
            this.scrollDirection = "down"
        }
        else {
            this.scrollDirection = "up"
        }
        this.previusScrollY = window.scrollY
    }

    calcSection(el){
        if(window.scrollY + this.browserHeight > el.offsetTop && window.scrollY < el.offsetTop + el.offsetHeight){
            let scrollPercent = el.getBoundingClientRect().y / this.browserHeight * 100
            if(scrollPercent < 35 && scrollPercent > -0.1 && this.scrollDirection === "down" || scrollPercent < 60 && this.scrollDirection ==="up" ){
                let matchingLink = el.getAttribute("data-matching-link")
                document.querySelectorAll(`.primary-nav a:not(${matchingLink})`).forEach( elm=> elm.classList.remove("is-curent-link"))
                document.querySelector(matchingLink).classList.add("is-curent-link")
            }
        }
    }
}

export default StickyHeader