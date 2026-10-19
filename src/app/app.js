const movie = [{
    id: 0,
    title: "CasamentoSangrento",
    genre: ["romance", "aventura", "terror", "acao"],
    indicativeClassification: 16,
    durationMinutes: 30,
    criticalNote: 7,
    launchDate: 2020,
}]

const user = [{
    id: 0,
    nickname: "felip",
    age: 18,
    favoriteGenreList: ["acao", "terror", "comedia"],
    freeTimeMinutes: 60,
    idListWatchedMovies: [4,6,3,8,1,0],
}] // Antes de fazer a busca, envio o array para ordenacao

function hardFilter(user, movie) {
    console.log(arrayOrganized)
    if (user[0].age > movie[0].indicativeClassification){
        if (user[0].freeTimeMinutes > movie[0].durationMinutes){
            if(binarySearch(arrayOrganized, movie[0].id) !== -1){
                return true
            } else {return false}
        } else {return false}
    } else {return false}
}

function mergeSort(array, func){
    if (array.length <=1){
        return array
    }
    
    const mid = Math.floor(array.length / 2)

    const left = array.slice(0, mid)
    const right = array.slice(mid)
    
    return func(mergeSort(left), mergeSort(right))
}

function merge(left, right){
    let result = []
    let indexLeft = 0
    let indexRight = 0

    while (indexLeft < left.length && indexRight < right.length) {
        if (left[indexLeft] < right[indexRight]){
            result.push(left[indexLeft])
            indexLeft++
        } else {
            result.push(right[indexRight])
            indexRight++
        }
    }
    return result.concat(left.slice(indexLeft).concat(right.slice(indexRight)))
}

let arrayOrganized = mergeSort(user[0].idListWatchedMovies, merge)

function inverseMerge(left, right){
    let result = []
    let indexLeft = 0
    let indexRight = 0

    while (indexLeft < left.length && indexRight < right.length) {
        if (left[indexLeft] > right[indexRight]){
            result.push(left[indexLeft])
            indexLeft++
        } else {
            result.push(right[indexRight])
            indexRight++
        }
    }
    return result.concat(left.slice(indexLeft).concat(right.slice(indexRight)))
}

function binarySearch(array, target){

    let head = 0
    let tail = array.length - 1
    let mid

    while (head <= tail){
        mid = Math.floor((head + tail) / 2)

        if (array[mid] === target) {
            console.log(`Alvo: ${target} encontrado na posicao: ${mid}`)
            return mid
        } else if (array[mid] < target){
            head = mid + 1
        } else {
            tail = mid - 1
        }
    }
    console.log(" a Não achei")
    return -1
}

function compareArrayItens(arrayA, arrayB){
    return arrayA.filter((item) => {return arrayB.includes(item)})    
}

const identicGenderArray = compareArrayItens(user[0].favoriteGenreList, movie[0].genre)

function calculateMatchScore(){
    genderAfinity()
    qualityCriticalNote()
    bonusRecentLauch()

}

function genderAfinity(){
    if (identicGenderArray.length === 1){
        movie[0].matchScore += 30
    } else if (identicGenderArray.length >= 2){
        movie[0].matchScore += 50
    } else {
        movie[0].matchScore += 0 
    }
}

function qualityCriticalNote(){
    movie[0].matchScore += (movie[0].criticalNote * 3)
}

function bonusRecentLauch(){
    const actualYear = new Date().getFullYear()
    const timeInteval = actualYear - movie[0].launchDate

    if (timeInteval <= 2){
        movie[0].matchScore += 20
    } else if (timeInteval >= 3 && timeInteval <= 5) {
        movie[0].matchScore += 10
    } else {
        movie[0].matchScore += 0
    }
}

function classificationRanking(){
    if(!(movie[0].matchScore >= 40)) return

    const listRanking = []
    
    
}


function main(){
    if(hardFilter(user, movie)){
        movie[0].matchScore = 0 
    }
    calculateMatchScore()
    console.log("Array Identico:", identicGenderArray)
}

main()



export default {
    movie,
    user,
    hardFilter,
    mergeSort,
    binarySearch,
    compareArrayItens,
    calculateMatchScore,
    genderAfinity,
    qualityCriticalNote,
    bonusRecentLauch,
    main
};