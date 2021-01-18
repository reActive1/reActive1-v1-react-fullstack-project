export const getRandomExercise = (Stock) => {
        var arr =[]
        for (const [key] of Object.entries(Stock)) {
                arr.push(key)
        }
        var ind = Math.floor(Math.random()*(arr.length));
        return Stock[arr[ind]];
}

