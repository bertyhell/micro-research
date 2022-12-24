
import {TagLink} from './tagLink.entity'


export class Tag {
  id: string ;
title: string ;
tagLinks?: TagLink[] ;
createdAt: Date ;
updatedAt: Date ;
}
