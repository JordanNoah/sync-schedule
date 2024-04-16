export class GroupingMdlDto {
    private constructor(
        public id: number,
        public courseid: number,
        public name: string,
        public idnumber: string,
        public description: string,
        public descriptionformat: number,
        public configdata: string | null,
        public timecreated: number,
        public timemodified: number
    ) {}
}