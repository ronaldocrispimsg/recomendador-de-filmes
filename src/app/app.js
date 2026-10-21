const movie = [{
    id: 0,
    title: "CasamentoSangrento",
    genre: ["suspense", "horror", "acao", "comedia", "misterio"],
    indicativeClassification: 18,
    durationMinutes: 95,
    criticalNote: 6.9,
    launchDate: 2019,
    directors: ["MattBettinelli-Olpin"]
},{
    id: 1,
    title: "CasamentoSangrento2",
    genre: ["suspense", "horror", "acao", "comedia", "misterio"],
    indicativeClassification: 18,
    durationMinutes: 108,
    criticalNote: 6.5,
    launchDate: 2026,
    directors: ["MattBettinelli-Olpin"]
},{
    id: 2,
    title: "TodoMundoEmPanico",
    genre: ["parodia", "comedia"],
    indicativeClassification: 16,
    durationMinutes: 88,
    criticalNote: 6.3,
    launchDate: 2000,
    directors: ["KeenenIvoryWayans"]
},{
    id: 3,
    title: "Fratura",
    genre: ["drama", "suspense", "misterio"],
    indicativeClassification: 14,
    durationMinutes: 99,
    criticalNote: 6.5,
    launchDate: 2019,
    directors: ["BradAnderson"]
},{
    id: 4,
    title: "Obsessao",
    genre: ["fantasia", "suspense", "horror"],
    indicativeClassification: 18,
    durationMinutes: 109,
    criticalNote: 7.8,
    launchDate: 2025,
    directors: ["CurryBarker"]
},{
    id: 5,
    title: "IronLung",
    genre: ["horror", "ficcaoCientifica", "terror"],
    indicativeClassification: 16,
    durationMinutes: 125,
    criticalNote: 5.7,
    launchDate: 2026,
    directors: ["MarkFischbach"]
},{
    id: 6,
    title: "Zootopia",
    genre: ["animacao","drama","acao","aventura"],
    indicativeClassification: 0,
    durationMinutes: 108,
    criticalNote: 8,
    launchDate: 2016,
    directors: ["JaredBush","ByronHoward","RichMoore"]
},{
    id: 7,
    title: "OMeninoQueDescobriuOVento",
    genre: ["drama","biografia","historia","tragedia"],
    indicativeClassification: 12,
    durationMinutes: 113,
    criticalNote: 7.6,
    launchDate: 2019,
    directors: ["ChiwetelEjiofor"]
},{
    id: 8,
    title: "OBanqueiro",
    genre: ["drama","biografia"],
    indicativeClassification: 14,
    durationMinutes: 120,
    criticalNote: 7.3,
    launchDate: 2020,
    directors: ["GeorgeNolfi"]
},{
    id: 9,
    title: "Corra!",
    genre: ["suspense","horror","misterio"],
    indicativeClassification: 14,
    durationMinutes: 104,
    criticalNote: 7.8,
    launchDate: 2017,
    directors: ["JordanPeele"] 
}]

const user = [{
    id: 0,
    nickname: "crispa",
    age: 21,
    favoriteGenreList: ["acao","terror","comedia","suspense","horror","drama"],
    freeTimeMinutes: 150,
    idListWatchedMovies: [0,1,2,3,4],
}] 

let arrayOrganized = mergeSort(user[0].idListWatchedMovies, merge)
const identicGenderArray = compareArrayItens(user[0].favoriteGenreList, movie[0].genre)


function hardFilter(user, movie) {
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
    
    return func(mergeSort(left, func), mergeSort(right, func))
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
            return mid
        } else if (array[mid] < target){
            head = mid + 1
        } else {
            tail = mid - 1
        }
    }
    return -1
}

function compareArrayItens(arrayA, arrayB){
    return arrayA.filter((item) => {return arrayB.includes(item)})    
}


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

const listRanking = Object.seal(new Array(5).fill(null))
function classificationRanking(){
    let index = 0
    while (index < movie.length){
        if(movie[index].matchScore >= 40){
            for(let i = 0; i < movie.length; i++){
                for(let j = 0; j < movie.length; j++){
                    if(movie[i].matchScore === movie[j].matchScore){
                        if(movie[i].criticalNote > movie[j].criticalNote){
                            console.log("Entrei no if")
                            listRanking[j] = movie[i]
                        }else{
                            console.log("Entrei no else")
                            listRanking[i] = movie[j]
                        }
                    }
                }
            }
        }
        index++
    }
    mergeSort(listRanking, inverseMerge)
}

function main(){
    if(hardFilter(user, movie)){
        movie[0].matchScore = 0 
    }
    calculateMatchScore()
    //console.log(movie)
    classificationRanking()
    console.log(listRanking)
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
    classificationRanking,
    main
};