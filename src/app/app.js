import readline from "node:readline"

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

rl.question("Digite o valor que deseja processar o IR: ", answer => {
    
    bruteSalary = Number.parseInt(answer)

    if (Number.isNaN(bruteSalary) || bruteSalary <= 0){
        console.log("Valor invalido!")
        entryBruteSalary()
    } else {
        console.log(`Valor de ${bruteSalary.toLocaleString("pt-br", {style: "currency", currency: "BRL"})} foi computado.`)
        rl.close()
    }
})



export default { }