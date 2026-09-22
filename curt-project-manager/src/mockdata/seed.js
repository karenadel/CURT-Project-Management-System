import { PRIORITIES } from "../utils/constants"
import { STATUSES } from "../utils/constants"

export const USERS =[
    {
        Id:"u1",
        name:"Karen",
        email:"karen@example.com",
        password:"$2b$10$wki1LDAZpxyr50bYZZY4nuNq9yPhXoAZc85zozskq1n99gPjLMVGW" //123123
    },{
        Id:"u2",
        name:"Laila",
        email:"laila@example.com",
        password:"$2b$10$N68EcWuBpXXDOdMTJsbNJ.S/gP9Z4.NTwzDWRAzayDAhDyEH05uDO" //456456
    },{
        Id:"u3",
        name:"Clara",
        email:"clara@example.com",
        password:"$2b$10$iljfop87Vd7QLBWPH.tGPerp.Y2g.Y09tvx7ukZDS4f4E9og5coSq" //789789
    },{
        Id:"u4",
        name:"Fady",
        email:"fady@example.com",
        password:"$2b$10$Eoc.4x94tqv1Xv8cWpQ7/.JU1etj0U1c.1YtkDTpRE5GL8zMGMxF6" //123456
    },{
        Id:"u5",
        name:"Kero",
        email:"kero@example.com",
        password:"$2b$10$jrE7A1DV9MytoryNXE3RFO1JndsuqmdUD8SKkbuudauJCKNCBWiPe" //456789
    }
]

export const PROJECTS=[
    {
        Id:"p1",
        name:"CURT-project-manager",
        description:"build a frontend project",
        ownerId:"u2",
        memberIds:[USERS[0].Id,USERS[2].Id]
    },{
        Id:"p2",
        name:"16th Researchday",
        description:"apply probability and statistics into research",
        ownerId:"u1",
        memberIds:[USERS[3].Id,USERS[4].Id]
    }
]

export const TASKS=[
    {
        Id:"t1",
        projectId:PROJECTS[0].Id,
        title:"Deployment",
        description:"finalize the deployment",
        priority:PRIORITIES[1],
        status:STATUSES[1],
        assignedTo:USERS[0].Id
    },{
        Id:"t2",
        projectId:PROJECTS[0].Id,
        title:"Testing",
        description:"test the site",
        priority:PRIORITIES[2],
        status:STATUSES[0],
        assignedTo:USERS[2].Id
    },{
        Id:"t3",
        projectId:PROJECTS[1].Id,
        title:"Searching",
        description:"look into resources",
        priority:PRIORITIES[2],
        status:STATUSES[2],
        assignedTo:USERS[3].Id
    },{
        Id:"t4",
        projectId:PROJECTS[1].Id,
        title:"Report",
        description:"fix the report's formatting",
        priority:PRIORITIES[0],
        status:STATUSES[0],
        assignedTo:USERS[4].Id
    }
]