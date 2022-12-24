
import {Project} from './project.entity'
import {Answer} from './answer.entity'


export class Response {
  projectId: string ;
project?: Project ;
firstAnswerId: string ;
firstAnswer?: Answer ;
secondAnswerId: string ;
secondAnswer?: Answer ;
count: number ;
}
