window.onload = () =>{
    const canvas = document.querySelector("#field")
    const ctx = canvas.getContext("2d")
    const width = 288
    const height = 512

    const pipeImg = document.querySelector("#pipe")
    const player = document.querySelector("#player")

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

    function spawnNewPipe(){
        let randomY = Math.floor(Math.random() * (350 - 250 + 1)) + 250;
        let randomX = Math.floor(Math.random() * (200 - 80 + 1)) + 80;
        if(pipes[pipes.length - 1].x + randomX <= width){
            let pipe1 = {
                x: 320,
                y: randomY
            }
            let pipe2 = {
                x: 320,
                y: randomY - 400
            }
            pipes.push(pipe1)
            pipes.push(pipe2)
        }
    }

    function gameLoop(){
        ctx.clearRect(0, 0, width, height)
        ctx.drawImage(player, xPlayer, yPlayer)

        for(let i = 0; i < pipes.length; i++){
            ctx.drawImage(pipeImg ,pipes[i].x - pipeSpeed, pipes[i].y) 
            //ctx.drawImage(pipeImg ,pipes[i].x - pipeSpeed, pipes[i].y +  ) // pipe size
            pipes[i].x -= pipeSpeed
        }
        spawnNewPipe()

        yPlayer += ySpeed
    }

    let timerId = setInterval(gameLoop, 16)

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