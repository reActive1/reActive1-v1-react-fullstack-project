import { getRandomExercise } from './RandomExercise';
import {Exercises} from "../Common/Enums";

export const getRandomExerciseTraining = (trainingTime, restTime) => {
            let ind = Math.floor(Math.random()*(3));
            let numOfExercises = Math.floor((trainingTime*60)/((30 + ind*15)+restTime)) + 1;
            let chosenRandomlyExercisesArray = [];
            for (var i = 0; i < numOfExercises; i++) {
                    let exerciseName = getRandomExercise(getRandomExercise(Exercises));
                    let objExercise = { name: exerciseName, time: 60, repeats: 1, restTime: restTime, id:i};
                    let objRest = {name: "Rest", time: restTime, repeats: 1, restTime: restTime, id:i};
                    chosenRandomlyExercisesArray.push(objExercise);
                    chosenRandomlyExercisesArray.push(objRest);
             }
            chosenRandomlyExercisesArray.pop();
            return chosenRandomlyExercisesArray;
}