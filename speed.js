function checkSpeed(speed){
    const speedLimit = 70;
    let demeritPoints = 0;

    // calculating demerit points
    if (speed > speedLimit){
        const excessSpeed = Math.ceil ((speed -speedLimit)/5);
        demeritPoints = excessSpeed

        //Demerit points print out
        console.log(`Points:${demeritPoints}`);
        //checking license suspension
        if (demeritPoints > 12){
            console.log("License suspended");
        }
        else{console.log("Ok")}
    }

}