
import {Project} from './project.entity'
import {Tag} from './tag.entity'


export class TagLink {
  id: string ;
projectId: string ;
tagId: string ;
project?: Project ;
tag?: Tag ;
count: number ;
createdAt: Date ;
updatedAt: Date ;
}
