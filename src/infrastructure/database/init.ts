import {
    CourseSequelize,
    RequestToMoodleLogSequelize,
    InstitutionSequelize,
    GroupingGroupSequelize,
    StatusTransactionCatalogSequelize,
    ModuleSequelize,
    SectionSequelize,
    GroupingSequelize,
    GroupSequelize,
    EventReceivingQueueLogSequelize,
    MoodleWsFunctionSequelize,
    EventReceivingQueueSequelize
} from './models'

export const DbSequelize = (): Promise<void> => {
    return new Promise<void>(async (resolve, reject) => {
        try {
            await InstitutionSequelize.sync()
            await CourseSequelize.sync()
            await SectionSequelize.sync()
            await ModuleSequelize.sync()
            await GroupSequelize.sync()
            await GroupingSequelize.sync()
            await GroupingGroupSequelize.sync()
            await MoodleWsFunctionSequelize.sync()
            await StatusTransactionCatalogSequelize.sync()
            await EventReceivingQueueSequelize.sync()
            await EventReceivingQueueLogSequelize.sync()
            await RequestToMoodleLogSequelize.sync()
            resolve()
        } catch (e) {
            reject(e);
        }
    })
}