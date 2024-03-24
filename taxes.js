// Importing prompt-sync library
const prompt = require('prompt-sync')();

// Function to convert input to number and validate
function getInput(promptMessage) {
    const input = prompt(promptMessage);
    const inputNum = parseInt(input.replace(/,/g, '')); // Remove commas from input
    if (isNaN(inputNum)) {
        console.log("Invalid input. Please enter a numeric value.");
        return NaN;
    }
    return inputNum;
}

// Function to calculate net salary
function calculateNetSalary(basicSalary, benefits) {
    // Define tax rates
    const taxRates = [0.1, 0.25, 0.3, 0.325, 0.35];
    const thresholds = [24000, 32334, 500000, 800000];
    const nhifRates = [0, 150, 300, 400, 500, 600, 750, 850, 900, 950]; // NHIF deductions for different salary ranges
    const nssfRate = 0.06; // NSSF deductions rate

    // Calculate gross salary
    const grossSalary = basicSalary + benefits;

    // Calculate tax (PAYE)
    let tax = 0;
    let remainingSalary = grossSalary;
    for (let i = 0; i < taxRates.length; i++) {
        if (remainingSalary <= thresholds[i]) {
            tax += taxRates[i] * remainingSalary;
            break;
        } else {
            tax += taxRates[i] * (thresholds[i] - thresholds[i]);
            remainingSalary -= thresholds[i];
        }
    }

    // Calculate NHIF deductions based on gross salary
    let nhifDeductions = 0;
    for (let i = nhifRates.length - 1; i >= 0; i--) {
        if (grossSalary >= nhifRates[i]) {
            nhifDeductions = nhifRates[i];
            break;
        }
    }

    // Calculate NSSF deductions
    let nssfDeductions = nssfRate * grossSalary;

    // Calculate net salary
    const netSalary = grossSalary - tax - nhifDeductions - nssfDeductions;

    // Return salary details
    return {
        grossSalary: grossSalary,
        tax: tax,
        nhifDeductions: nhifDeductions,
        nssfDeductions: nssfDeductions,
        netSalary: netSalary
    };
}

//  input from user
const basicSalary = getInput("Enter basic salary (in Ksh): ");
const benefits = getInput("Enter benefits (in Ksh): ");

// Check if inputs are valid
if (!isNaN(basicSalary) && !isNaN(benefits)) {
    // Calculate salary details
    const salaryDetails = calculateNetSalary(basicSalary, benefits);

    // Output salary details
    console.log("Gross Salary:", salaryDetails.grossSalary);
    console.log("Tax (PAYE):", salaryDetails.tax);
    console.log("NHIF Deductions:", salaryDetails.nhifDeductions);
    console.log("NSSF Deductions:", salaryDetails.nssfDeductions);
    console.log("Net Salary:", salaryDetails.netSalary);
}