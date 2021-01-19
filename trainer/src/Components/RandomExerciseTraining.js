import { getRandomExercise } from './RandomExercise';
import {Exercises, restImgSource} from "../Common/Enums";

export const getRandomExerciseTraining = (exercises, trainingTime, restTime) => {
            let ind = Math.floor(Math.random()*(3));
            let numOfExercises = Math.floor((trainingTime*60)/((30 + ind*15)+restTime)) + 1;
            let chosenRandomlyExercisesArray = [];
            for (var i = 0; i < numOfExercises; i++) {
                    let exercise = getRandomExercise(exercises);
                    let objExercise = { name: exercise.name, imgSource: exercise.imgSource, time: 60, repeats: 1, restTime: restTime, id:i};
                    chosenRandomlyExercisesArray.push(objExercise);
            }
          return chosenRandomlyExercisesArray;
}