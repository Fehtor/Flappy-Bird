window.onload = () =>{
    const canvas = document.querySelector("#field")
    const ctx = canvas.getContext("2d")
    const width = 288
    const height = 512

    const pipeImg = document.querySelector("#pipe")
    const player = document.querySelector("#player")

    const canvasPoints = document.querySelector(".points")
    const canvasRecord = document.querySelector(".record")
   
    var time = performance.now();

    if(sessionStorage.getItem("points") != null){
        canvasRecord.innerHTML = sessionStorage.getItem("points")
    }
    else{
        canvasRecord.innerHTML = 0
    }

    let points = 0

    let xPlayer = 10
    let yPlayer = 240

    let ySpeed = 10

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
        let randomY = Math.floor(Math.random() * (350 - 290 + 1)) + 290;
        let randomX = Math.floor(Math.random() * (200 - 80 + 1)) + 80;
        if(pipes[pipes.length - 1].x + randomX <= width - 100){
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

        yPlayer = yPlayer - ySpeed * ((performance.now() - time) / 60000) + (10000 * ((performance.now() - time) / 60000) * ((performance.now() - time) / 60000))

        if(Collision()){
            if(points > sessionStorage.getItem("points")){
                sessionStorage.setItem("points", points)
            }
            clearInterval(timerId)
        }

        console.log((ySpeed * ((performance.now() - time) / 60000)) + " yspeed")
        console.log(1000 * ((performance.now() - time) / 60000) * ((performance.now() - time) / 60000) / 2)
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

    document.addEventListener("keydown", (event) =>{
    //    if(event.key == "s" || event.key == "w"){
    //     ySpeed = 0
    //    }
            time = performance.now()
            ySpeed = 140
        
    })


}