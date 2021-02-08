export const getRandomExercise = (Stock) => {
        var arr =[]
        for (const [key] of Object.entries(Stock)) {
                arr.push(key)
        }
        var index = Math.floor(Math.random()*(arr.length));
        return Stock[arr[index]];
}

export const getRandomMotivationString = (MotivationStrings) => {
        var arr =[]
        for (const [key] of Object.entries(MotivationStrings)) {
        arr.push(key)
        }
        var index = Math.floor(Math.random()*(arr.length));
        return MotivationStrings[index];
}
