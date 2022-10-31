const buttonX = document.getElementById("buttonX")
const buttonO = document.getElementById("buttonO")

const gridIteams = document.getElementsByClassName("iteam")



buttonX.addEventListener("click", () => { selectIteam(buttonX, buttonO) })
buttonO.addEventListener("click", () => { selectIteam(buttonO, buttonX) })

let clickEvent;
const teamMembers = {};
function selectIteam(obj, disable_obj) {
    teamMembers["a"] = obj.innerHTML
    teamMembers["b"] = disable_obj.innerHTML
    obj.style.boxShadow = "2px 2px 10px black"
    disable_obj.style.opacity = "0.5"
    obj.setAttribute("disabled", true)
    disable_obj.setAttribute("disabled", true)
    clickEvent = customEvent()

}



const patterns = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]]
const insertedData = Array(9)



for (let gridIteam = 0; gridIteam < gridIteams.length; gridIteam++) {
    gridIteams[gridIteam].addEventListener("click", function(){
        if (clickEvent){
            clickEvent(gridIteams[gridIteam], gridIteam)
        }else{
            alert("Please choose the Team X or O")
        }
        
    })
}


function customEvent() {
    let recentPlayer = teamMembers["a"]
    return function (obj, index) {
        if (!obj.innerHTML){
            obj.innerHTML = recentPlayer
            insertedData[index] = (recentPlayer)
            recentPlayer = (recentPlayer == "X") ? "O" : "X"
            let res = checkPatterns()
            if (!insertedData.includes(undefined) && res != true ){
            setTimeout(()=>{
                alert("Draw match play again!!");
                window.location.reload()
            }, 500)
            }
        }         
    }
}

function checkPatterns(){
    let patternMatch = false
    for (patternIndexes of patterns){
        let checkElement = insertedData[patternIndexes[0]];
        if (checkElement){
            for (index of patternIndexes){
                if (insertedData[index]){
                    if (checkElement == insertedData[index]) { 
                        patternMatch = true
                    }else{
                        patternMatch = false
                        break
                    } 
                }else{
                    patternMatch = false
                    break
                }
            }
        }
        if (patternMatch){
            console.log(patternIndexes)
            setTimeout(()=>{
                alert(`Winner - Team ${checkElement}`);
                window.location.reload()
            }, 500)
            return true
        }
    }
}

