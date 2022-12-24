
import {Question} from './question.entity'
import {TagLink} from './tagLink.entity'
import {Response} from './response.entity'


export class Project {
  id: string ;
title: string ;
questions?: Question[] ;
published: boolean ;
tagLinks?: TagLink[] ;
responses?: Response[] ;
createdAt: Date ;
updatedAt: Date ;
}
