export class MoodleWsFunctionDto {
    private constructor(
        public moodleFunction: string,
        public abbreviation: string
    ) {}

    static create(object:{[key:string]:any}):[string?, MoodleWsFunctionDto?] {
        const {
            moodleFunction,
            abbreviation,
        } = object

        return [
            undefined,
            new MoodleWsFunctionDto(
                moodleFunction,
                abbreviation
            )
        ]
    }
}