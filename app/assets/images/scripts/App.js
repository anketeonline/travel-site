import "../styles/styles.css"
import MobileMenu from "./modules/MobileMenu"
import RevealOnScroll from "./modules/RevealOnScroll"

if(module.hot) {
    module.hot.accept()
}

let mobileMenu = new MobileMenu()

let revealOnScroll = new RevealOnScroll()
