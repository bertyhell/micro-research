
import {Question} from './question.entity'
import {Response} from './response.entity'


export class Answer {
  id: string ;
title: string ;
order: number ;
questionId: string ;
question?: Question ;
firstResponses?: Response[] ;
secondResponses?: Response[] ;
createdAt: Date ;
updatedAt: Date ;
}
