const movie = {
    id: null,
    title: null,
    genre: [null],
    indicativeClassification: null,
    durationMinutes: null,
    criticalNote: null,
    launchDate: null,
}

const user = {
    id: null,
    nickname: null,
    age: null,
    favoriteGenreList: [null],
    freeTimeMinutes: null,
    idListWatchedMovies: [null],
}

function hardFilter(movie, user) {
    if (user.age < movie.indicativeClassification) {
        return false;
    }
    
    if (user.freeTimeMinutes < movie.durationMinutes){
        return false
    }
    
    if(binarySearch(arrayOrganized, movie.id) !== -1 || binarySearch(user.idListWatchedMovies, movie.id) >=0){
        return false
    } else {
        return true
    }
    
}

function mergeSort(array){
    if (array.length <=1){
        return array
    }
    
    const mid = Math.floor(array.length / 2)

    const left = array.slice(0, mid)
    const right = array.slice(mid)

    return merge(mergeSort(left), mergeSort(right))
}

function merge(left, right){
    let result = []
    let indexLeft = 0
    let indexRight = 0

    while (indexLeft < left.length && indexRight) {
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

let arrayOrganized = mergeSort(user.idListWatchedMovies)     // Antes de fazer a busca, envio o array para ordenacao

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
    return -1
}

export default app;