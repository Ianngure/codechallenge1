function calculateGrade(){
    //USER INPUT
    const marks = parseFloat(prompt('student marks:'))
    //CONFIRM INPUT
    if(marks< 0 || marks > 100) {
        console.log('Invalid Marks');
        return;
    }
    //GRADE DETERMINATION
    let grade;
    if (marks >79){
        grade = "A"
    }else if (marks >=60 && marks <=79){
        grade = "B"
    }else if (marks >=50){
        grade = "C";
    }else if (marks >=40){
        grade = 'D'
    }else { grade = "E"}
    console.log(`Grade:${grade}`)
}
calculateGrade()
