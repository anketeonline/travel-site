import throttle from "lodash/throttle"      //slow down the event listener calling for scroll
import debounce from "lodash/debounce"      // using for window resizing, if we resize and stop for 333ms then do the function

class RevealOnScroll {
    constructor(els, trasholdPercent){
        this.trasholdPercent = trasholdPercent      // after this amound of window view port percent, show items
        this.itemsToReveal = els                    // all items that we want to have this effect
        this.hideInitially()                        // set state for each element on the begining 
        this.browserHeight = window.innerHeight     //get window inner Height--- how tall is the window right now (if resized the window gets smaller value)
        this.scrollThrottle = throttle(this.calcCaller, 200).bind(this)
        this.events()                               // set an EventListener
    }

    events(){
        window.addEventListener("scroll", this.scrollThrottle)
        window.addEventListener("resize", debounce(()=>{
            console.log("Resize called")
            this.browserHeight = window.innerHeight
        }, 333))
    }

    calcCaller(){
        console.log("EventListener called")
        this.itemsToReveal.forEach(el=>{
            if(el.isReveald == false){
                this.calculateIfScrolledTo(el)
            }
            
        })
    }

    calculateIfScrolledTo(el){
        if(window.scrollY + this.browserHeight > el.offsetTop){
            console.log("Calculated")
            let scrollPercent = (el.getBoundingClientRect().y / window.innerHeight) * 100
            if(scrollPercent < this.trasholdPercent){
                el.classList.add("reveal-item--is-visible")
                el.isReveald = true
                if(el.isLast){
                    window.removeEventListener("scroll", this.scrollThrottle)
            }
        }
        }
        
    }

    hideInitially(){
        this.itemsToReveal.forEach(elm=>
            {
            elm.classList.add("reveal-item")
            elm.isReveald = false
    })
    this.itemsToReveal[this.itemsToReveal.length - 1].isLast = true;   //only last element gets this, when if statement passed with this value then remove event listener
    }
}

export default RevealOnScroll