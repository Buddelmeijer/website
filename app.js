let gridArray = [['0','0','0','0'],['1','1','1','0'],['2','b','2','0'],['2','b','2','0']];
let game = 0;
function leftClicked(thingID){
    if(gridArray[thingID[0]][thingID[1]]==='b'&&game===0&&document.getElementById(thingID).style.backgroundColor!=="orange"){
        document.getElementById(thingID).style.backgroundColor="red";

        const para = document.createElement("p");
        const node = document.createTextNode("You lost the game");
        para.appendChild(node);
        const element = document.getElementById("winLose");
        element.appendChild(para);
        game=1;
    }
    else if(game===0&&document.getElementById(thingID).style.backgroundColor!=="orange"){
        fill(thingID);
    }
    if(game!==1){
        game=2;
        for(let x=0;x<gridArray.length;x++){
            for(let y=0;y<gridArray[0].length;y++){
                let string = x+""+y;
                if(){
                    game=0;
                }
            }
        }
    }
    if(game===2){
        const bruh = document.createElement("p");
        const bro = document.createTextNode("You won the game!");
        bruh.appendChild(bro);
        const cuh = document.getElementById("winLose");
        cuh.appendChild(bro);
    }
}
function rightClicked(thingID){
    if(document.getElementById(thingID).style.backgroundColor==="orange"&&game===0)
        document.getElementById(thingID).style.backgroundColor="lightgreen";
    else if(game===0&&document.getElementById(thingID).style.backgroundColor!=="gray"&&document.getElementById(thingID).style.backgroundColor!=="red"){
        document.getElementById(thingID).style.backgroundColor="orange";
    }
}
function fill(thingID){
    let ID = parseInt(thingID);
    document.getElementById(thingID).style.backgroundColor="gray";
    document.getElementById(thingID).innerHTML=gridArray[thingID[0]][thingID[1]];

    if(gridArray[thingID[0]][thingID[1]]==='0'){
        if(Math.floor(ID/10)<3&&gridArray[Math.floor(ID/10)+1][parseInt(thingID[1])]==='0'&&document.getElementById((Math.floor(ID/10)+1)+thingID[1]).style.backgroundColor!=="gray"){
            fill((Math.floor(ID/10)+1)+thingID[1]);
        }
        else if(Math.floor(ID/10)<3&&gridArray[Math.floor(ID/10)+1][parseInt(thingID[1])]!=='b'&&document.getElementById((Math.floor(ID/10)+1)+thingID[1]).style.backgroundColor!=="gray"){
            document.getElementById((Math.floor(ID/10)+1)+thingID[1]).style.backgroundColor="gray";
            document.getElementById((Math.floor(ID/10)+1)+thingID[1]).innerHTML=gridArray[Math.floor(ID/10)+1][parseInt(thingID[1])];
        }

        if(Math.floor(ID/10)>0&&gridArray[Math.floor(ID/10)-1][parseInt(thingID[1])]==='0'&&document.getElementById((Math.floor(ID/10)-1)+thingID[1]).style.backgroundColor!=="gray"){
            fill((Math.floor(ID/10)-1)+thingID[1]);
        }
        else if(Math.floor(ID/10)>0&&gridArray[Math.floor(ID/10)-1][parseInt(thingID[1])]!=='b'&&document.getElementById((Math.floor(ID/10)-1)+thingID[1]).style.backgroundColor!=="gray"){
            document.getElementById((Math.floor(ID/10)-1)+thingID[1]).style.backgroundColor="gray";
            document.getElementById((Math.floor(ID/10)-1)+thingID[1]).innerHTML=gridArray[Math.floor(ID/10)-1][parseInt(thingID[1])];
        }

        if((ID%10)<3&&gridArray[parseInt(thingID[0])][(ID%10)+1]==='0'&&document.getElementById(thingID[0]+(ID%10+1)).style.backgroundColor!=="gray"){
            fill(thingID[0]+(ID%10+1));
        }
        else if((ID%10)<3&&gridArray[parseInt(thingID[0])][(ID%10)+1]!=='b'&&document.getElementById(thingID[0]+(ID%10+1)).style.backgroundColor!=="gray"){
            document.getElementById(thingID[0]+(ID%10+1)).style.backgroundColor="gray";
            document.getElementById(thingID[0]+(ID%10+1)).innerHTML=gridArray[parseInt(thingID[0])][(ID%10)+1];
        }

        if((ID%10)>0&&gridArray[parseInt(thingID[0])][(ID%10)-1]==='0'&&document.getElementById(thingID[0]+(ID%10-1)).style.backgroundColor!=="gray"){
            fill(thingID[0]+(ID%10-1));
        }else if((ID%10)>0&&gridArray[parseInt(thingID[0])][(ID%10)-1]!=='b'&&document.getElementById(thingID[0]+(ID%10-1)).style.backgroundColor!=="gray"){
            document.getElementById(thingID[0]+(ID%10-1)).style.backgroundColor="gray";
            document.getElementById(thingID[0]+(ID%10-1)).innerHTML=gridArray[parseInt(thingID[0])][(ID%10)-1];
        }
    }
}
