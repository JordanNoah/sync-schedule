export class GroupMdlDto {
    private constructor(
        public id: number,
        public courseid: number,
        public name: string,
        public description: string,
        public descriptionformat: string,
        public enrolmentkey: string,
        public picture: number,
        public timecreated: number,
        public timemodified: number
    ) {}
}