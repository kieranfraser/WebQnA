/**
 * Created by kfraser on 13/03/2016.
 */
/**
 * Created by kfraser on 27/02/2016.
 */
export class User {
    constructor(
        public userid: string,
        public classes: string[],
        public questions: string[],
        public notifications: string[],
        public auth: string,
        public anonymous: string
    ) {}
}
