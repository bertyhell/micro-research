
import {Answer} from './answer.entity'
import {Project} from './project.entity'


export class Question {
  id: string ;
title: string ;
order: number ;
answers?: Answer[] ;
projectId: string ;
project?: Project ;
createdAt: Date ;
updatedAt: Date ;
}
