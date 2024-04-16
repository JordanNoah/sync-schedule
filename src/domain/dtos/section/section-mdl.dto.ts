export class SectionMdlDto {
    constructor(
        public id: number,
        public course: number,
        public section: number,
        public name: string | null,
        public summary: string | null,
        public summaryformat: number,
        public sequence: number | null,
        public visible: boolean | null,
        public availability: string | null,
        public timemodified: number,
    ) {}
}