import {InstitutionSequelize} from "./models/institution";
import {CourseSequelize} from "./models/course";
import {SectionSequelize} from "./models/section";
import {ModuleSequelize} from "./models/module";

export const DbSequelize = (): Promise<void> => {
    return new Promise<void>(async (resolve, reject) => {
        try {
            await InstitutionSequelize.sync()
            await CourseSequelize.sync()
            await SectionSequelize.sync()
            await ModuleSequelize.sync()
            resolve()
        } catch (e) {
            reject(e);
        }
    })
}