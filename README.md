# E-commerce Api Docs

## Api Routes

- [E-commerce Api Docs](#E-commerce Api Docs)
  - [Api Routes](#api-routes)
  - [User](#user)
    - [Register](#register)
      - [Headers](#headers)
      - [Parameters](#parameters)
      - [Response](#response)
    - [Login](#login)
      - [Headers](#headers-1)
      - [Parameters](#parameters-1)
      - [Response](#response-1)
    


## User

### Register

_This Registers A New User_

**URL:** /api/user/register  
**METHOD:** POST

#### Headers

Content-Type: _application/json_  
Accept: _application/json_

#### Parameters

| Parameter     | Type   | Description |
| ------------- | ------ | ----------- |
| firstname        | string | _required_  |
| email         | string | _required_  |
| password      | string | _required_  |
| lastname | string | _required_  |

#### Response

> Success - 201 CREATED

```json
{
    "status": true,
    "message": "Account Created",
    "data": {
        "email": "jane@gmail.com",
        
        "first_name": "Jane",
        "last_name": "Doe",
       
       
        "bearer_token": "16|RmkkR0aLTBIgcWqHo9aDTqlDHwar7NvIvg58fq0I"
    }
}
```

> Error Responses

| Code | Message                 | Description              |
| ---- | ----------------------- | ------------------------ |
| 422  | Email Already Exists    | _if the email exists_    |
| 400  | Username Already Exists | _if the Username exists_ |
| 500  | Internal Server Error   | --                       |

[Back to Top](#apis-routes)

### Login

**URL:** api/user/login  
**METHOD:** POST

#### Headers

Content-Type: _application/json_  
Accept: _application/json_

#### Parameters

| Parameter | Type   | Description |
| --------- | ------ | ----------- |
| email     | string | _required_  |
| password  | string | _required_  |

#### Response

> Success - 200 

```json
{
    "status": true,
    "message": "Account Created",
    "data": {
        "email": "jane@gmail.com",
  
        "first_name": "Jane",
        "last_name": "Doe",
     
        "bearer_token": "16|RmkkR0aLTBIgcWqHo9aDTqlDHwar7NvIvg58fq0I"
    }
}
```

> Error Responses

| Code | Message             | Description |
| ---- | ------------------- | ----------- |
| 401  | Invalid Credentials |             |

[Back to Top](#apis-routes)

### Fetch Cart

_fetch user cart

**URL:** api/user/getcart
**METHOD:** get

#### Headers

Content-Type: _application/json_  
Accept: _application/json_  
Authorization: Bearer _Bearer Token_


#### Response

> Success - 200 OK

```json
{
    "_id": "6637563eae1b0c141ee0fbb2",
    "userId": "6625cf8cebc9c827f7bb56bc",
    "products": [
        {
            "product": {
                "_id": "662b502b88fedde2ac00803c",
                "productname": "new product",
                "productdescription": "productdescription",
                "sellingprice": "sellingprice",
                "originalprice": "originalprice",
                "productqty": "productqty",
                "image": [
                    "uploads\\image-1714114603928.jpg"
                ],
                "createdAt": "2024-04-26T06:56:43.936Z",
                "updatedAt": "2024-04-26T06:56:43.936Z",
                "__v": 0
            },
            "quantity": 1,
            "_id": "664ad20abd72afa754e72a96"
        }
    ],
    "createdAt": "2024-05-05T09:49:50.461Z",
    "updatedAt": "2024-05-20T04:31:06.317Z",
    "__v": 6,
    "total": 0
}
```


[Back to Top](#api-routes)

### Add To Cart

_This Registers A New User_

**URL:** api/user/addtocart  
**METHOD:** post

#### Headers

Content-Type: _application/json_  
Accept: _application/json_  
Authorization: Bearer _Bearer Token_

#### Parameters

| Parameter | Type   | Description |
| --------- | ------ | ----------- |
| productId      | string | _required_  |
| quantity      | string | _required_  |

#### Response

> Success - 200 OK

```json
{
    
}
```

[Back to Top](#api-routes)

### Delete From Cart

_This Deletes A Users Account_

**URL:** api/user/updatecart/  
**METHOD:** post

#### Headers

Content-Type: _application/json_  
Accept: _application/json_  
Authorization: Bearer _Bearer Token_

#### Response

> Success - 200 OK

```json
{
    "status": true,
    "message": "Item removed from cart"
}
```

[Back to Top](#api-routes)

### Update From Cart

**URL:** api/v1/email/verify
**METHOD:** POST

#### Headers

Content-Type: _application/json_  
Accept: _application/json_  
Authorization: Bearer _Bearer Token_

#### Parameters

| Parameter | Type   | Description |
| --------- | ------ | ----------- |
| productId      | string | _required_  |
| quantity      | string | _required_  |
#### Response

> Success - 200 OK

```json
{
    "status": true,
    "message": "Cart Updated"
}
```

#
