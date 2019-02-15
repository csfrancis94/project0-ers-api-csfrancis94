export class Reimbursement{
reimbursementId : number;
author: number;
amount: number;
dateSubmitted: number;
dateResolved: number;
description: string;
resolver: number;
status: number;
type: number;

constructor(reimbursementId : number, author: number, amount: number, dateSubmitted: number, dateResolved: number, description: string, resolver: number, status: number, type: number)
{
        
        this.reimbursementId = reimbursementId; // primary key
        this.author = author;  // foreign key -> User, not null
        this.amount = amount;  // not null
        this.dateSubmitted = dateSubmitted; // not null
        this.dateResolved = dateResolved; // not null
        this.description = description; // not null
        this.resolver = resolver; // foreign key -> User
        this.status = status; // foreign ey -> ReimbursementStatus, not null
        this.type = type; // foreign key -> ReimbursementType
        
}

}