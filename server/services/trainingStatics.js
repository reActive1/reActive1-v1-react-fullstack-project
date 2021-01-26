import { getTrainingsByTimeRange } from '../store/userTrainingFuncs.js';


async function calcTrainingTimeInDateRange(params){
    const trainings = await getTrainingsByTimeRange(params);
    let dayToExercisesTimesMapper = {'0':0, '1':0, '2':0, '3':0, '4':0, '5':0, '6':0};
    trainings.forEach(train => {dayToExercisesTimesMapper[new Date(train.startTime).getDay()] += train.totalTimeSec});

    return dayToExercisesTimesMapper; 
}

async function calcTotalTrainingOfUserLastMonth(parmas){
    const trainings = await getTrainingsByTimeRange(params); // todo: should be userId instead

    return trainings;
}



 
export { calcTrainingTimeInDateRange };