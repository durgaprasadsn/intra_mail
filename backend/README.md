# REST API Using Node JS (Express JS Framework)
## API CALLS on port 8080

### GET '/users/check'
Request Body
>{
    user : 'username'
}

Response
>Status Code
>>200 - User exists
404 - doesn't exist
500 - internal error

>Body
>>{}

### POST '/users/signup'
Request Body
>{
    user : 'username'
    fname: 'firstname'
    lname: 'lastname'
    password: 'password'
    dob: 'dateofbirth'
    no: 'phoneNumber'
    tfa: 'boolean'
}

Response
>Status Code
>>201 - created
500 - internal error

>Body
>>{}

### POST '/users/login'
Request Body
>{
    user: 'username'
    password: 'password'
}

Response
>Status Code
>>200 - OK
401 - Authentication Failed
500 - internal error

>Body
>>{
    token: 'token'
}

### DELETE '/users/'
Request Body
>{}

Response
>Status Code
>>200 - Deleted
500 - internal error

>Body
>>{}

### POST '/mails/post'
Request Header
>{
    Authorization: 'Bearer token'
}

Request Body
>{
    receiver: ['receiver']
    subject: 'subject'
    body: 'body'
}

Response
>Status Code
>>201 - Created
500 - internal error

>Body
>>{}

### GET '/mails/sent'
Request Header
>{
    Authorization: 'Bearer token'
}

Request Body
>{}

Response
>Status Code
>>200 - OK
500 - internal error

>Body
>>[{
    mailID: 'number'
    sender: 'sender'
    receiver: [users]
    timeSent: 'Date'
    subject: 'subject'
    body: 'body'
    readBy: [users]
    category: 'category'
}, ...]

### GET '/mails/received'
Request Header
>{
    Authorization: 'Bearer token'
}

Query Parameter
>category='category'

Request Body
>{}

Response
>Status Code
>>200 - OK
500 - internal error

>Body
>>[{
    mailID: 'number'
    sender: 'sender'
    receiver: [users]
    timeSent: 'Date'
    subject: 'subject'
    body: 'body'
    readBy: [users]
    category: 'category'
}, ...]

### POST '/mails/read'
Request Header
>{
    Authorization: 'Bearer token'
}

Request Body
>{
    mailID: 'mailid'
}

Response
>Status Code
>>200 - Updated
500 - internal error

>Body
>>{}

### DELETE '/mails/:mailId'
Request Header
>{
    Authorization: 'Bearer token'
}

Request Body
>{}

Response
>Status Code
>>200 - Created
500 - internal error

>Body
>>{}
