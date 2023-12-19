window.onload = () =>{
    const canvas = document.querySelector("#field")
    const ctx = canvas.getContext("2d")
    const width = 288
    const height = 512

    const pipeImg = document.querySelector("#pipe")
    const player = document.querySelector("#player")

    const canvasPoints = document.querySelector(".points")


    let points = 0

    let xPlayer = 10
    let yPlayer = 240

    let ySpeed = 0

    let pipeSpeed = 1

    let pipe = {
        x: 230,
        y: 300  
    }
    let pipe1 = {
        x: 230,
        y: -100  
    }
    
    let pipes = [pipe, pipe1]

    // 34*24  / 52*320

    function Collision(){
        for(let i = 0; i < pipes.length; i++){
            if(pipes[i].x <= xPlayer && pipes[i].x + 52 >= xPlayer && pipes[i].y < yPlayer && pipes[i].y + 320 > yPlayer 
                || pipes[i].x <= xPlayer && pipes[i].x + 52 >= xPlayer && pipes[i].y < yPlayer + 24 && pipes[i].y + 320 > yPlayer + 24){
                console.log(pipes[i].x + " " + pipes[i].y)
                return true
            }
            if(pipes[i].x <= xPlayer + 34 && pipes[i].x + 52 >= xPlayer + 34 && pipes[i].y < yPlayer && pipes[i].y + 320 > yPlayer 
                || pipes[i].x <= xPlayer + 34 && pipes[i].x + 52 >= xPlayer + 34 && pipes[i].y < yPlayer + 24 && pipes[i].y + 320 > yPlayer + 24){
                console.log(pipes[i].x + " " + pipes[i].y)
                return true 
            }
        }
    return false
    }

    function spawnNewPipe(){
        let randomY = Math.floor(Math.random() * (350 - 250 + 1)) + 250;
        let randomX = Math.floor(Math.random() * (200 - 80 + 1)) + 80;
        if(pipes[pipes.length - 1].x + randomX <= width){
            let pipe1 = {
                x: 320,
                y: randomY, 
                counted: false
            }
            let pipe2 = {
                x: 320,
                y: randomY - 400,
                counted: false
            }
            pipes.push(pipe1)
            pipes.push(pipe2)
        }
        if(pipes[0].x + 52 < 0){
            pipes.splice(0, 1)
        }
        
    }

    function gameLoop(){
        ctx.clearRect(0, 0, width, height)
        ctx.drawImage(player, xPlayer, yPlayer)

        for(let i = 0; i < pipes.length; i++){
            ctx.drawImage(pipeImg, pipes[i].x - pipeSpeed, pipes[i].y) 
            //ctx.drawImage(pipeImg ,pipes[i].x - pipeSpeed, pipes[i].y +  ) // pipe size
            if(pipes[i].x + 52 < xPlayer && pipes[i].counted == false){
                pipes[i].counted = true
                points+=0.5;
            }
            pipes[i].x -= pipeSpeed
        }
        canvasPoints.innerHTML = points
        spawnNewPipe()

        yPlayer += ySpeed

        if(Collision()){
            clearInterval(timerId)
        }
    }

    let timerId = setInterval(gameLoop, 6)

    document.addEventListener("keypress", (event) => {
        let keyName = event.key

        if(keyName == "w"){
            ySpeed = -1
        }
        if(keyName == "s"){
            ySpeed = 1
        }
    })

    document.addEventListener("keyup", (event) =>{
       if(event.key == "s" || event.key == "w"){
        ySpeed = 0
       }
    })


}