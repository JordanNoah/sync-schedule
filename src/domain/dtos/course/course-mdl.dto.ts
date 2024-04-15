export class CourseMdlDto {
    private constructor(
        public id: number,
        public category: number,
        public sortorder: string,
        public fullname: string,
        public shortname: string,
        public idnumber: string | undefined | null,
        public summary: string,
        public summaryformat: string,
        public format: string,
        public showgrades: boolean,
        public newsitems: number,
        public startdate: Date,
        public enddate: Date,
        public relativedatesmode: string,
        public marker: string,
        public maxbytes: string,
        public legacyfiles: string,
        public showreports: string,
        public visible: boolean,
        public visibleold: boolean,
        public downloadcontent: null,
        public groupmode: boolean,
        public groupmodeforce: boolean,
        public defaultgroupingid: number,
        public lang: string,
        public calendartype: string,
        public theme: string,
        public timecreated: number,
        public timemodified: number,
        public requested: boolean,
        public enablecompletion: boolean,
        public completionnotify: boolean,
        public cacherev: boolean,
        public originalcourseid: null,
        public showactivitydates: boolean,
        public showcompletionconditions: boolean
    ) {}
}