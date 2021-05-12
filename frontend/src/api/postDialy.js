import axios from 'axios';
const pubtime = () =>{
    const a = new Date(Date.now() + ((new Date().getTimezoneOffset() + (9 * 60)) * 60 * 1000));
    var str = a.getFullYear()
        + '-' + ('0' + (a.getMonth() + 1)).slice(-2)
        + '-' + ('0' + a.getDate()).slice(-2)
        + 'T' + ('0' + a.getHours()).slice(-2)
        + ':' + ('0' + a.getMinutes()).slice(-2)
        +"Z"
    return str
}


export const postPost = (info) => {

    let jsoninfo = JSON.stringify(info)
    console.log(jsoninfo)
    const method = "POST"
    const type = "Content-Type:application/json"
    return  fetch("http://localhost:8000/post/new/" ,{
        method:method,
        body:jsoninfo
    }).then((response) => 
        console.log(response.json())) 
        .then((responseJson) => {
            console.log(responseJson)
        }
    ).catch((error) =>{
        console.error(error);
    })
}

export const postPostEdit = (info) => {

    let jsoninfo = JSON.stringify(info)
    console.log(jsoninfo)
    const method = "PUT"
    const type = "Content-Type:application/json"
    return  fetch(`http://localhost:8000/posts/${info.id}/` ,{
        method:method,
        body:jsoninfo
    }).then((response) => 
        console.log(response.json())) 
        .then((responseJson) => {
            console.log(responseJson)
        }
    ).catch((error) =>{
        console.error(error);
    })
}

export const postDelete = (id) =>{
    const method = "DELETE"
    return  fetch(`http://localhost:8000/posts/${id}/` ,{
        method:method,})
}
export const postEdit =(id)=>{
    const method = "PUT"
    return  fetch(`http://localhost:8000/posts/${id}/` ,{
        method:method,})
    
}
export const addCategory = (cat) =>{
    const method = "POST"
    let jsoninfo = JSON.stringify(cat)
    return  fetch(`http://localhost:8000/addcat/` ,{
        method:method,
        body:jsoninfo
    }).then((response) => 
        console.log(response.json())) 
        .then((responseJson) => {
            console.log(responseJson)
        }
    ).catch((error) =>{
        console.error(error);
    })
}
export const rmCategory = (cat) =>{
    const method = "DELETE"
    return  fetch(`http://localhost:8000/rmcat/${cat}` ,{
        method:method,})
}
export const putCategory = (info)=> {
    let jsoninfo = JSON.stringify(info)
    console.log(jsoninfo)
    const method = "PUT"
    return  fetch(`http://localhost:8000/editcat/${info.id}` ,{
        method:method,
        body:jsoninfo
    }).then((response) => 
        console.log(response.json())) 
        .then((responseJson) => {
            console.log(responseJson)
        }
    ).catch((error) =>{
        console.error(error);
    })
}


export const getJwt = async (data) => {
    const method = "POST"
        console.log(data)
    let jsoninfo = JSON.stringify(data)
    return await axios.post(`http://localhost:8000/api/v1/auth/jwt/create` ,{
        email:data.email,
        password:data.password
    })
}


export const signup = (info) => {

    let jsoninfo = JSON.stringify(info)
    console.log(jsoninfo)
    const method = "POST"
    const type = "Content-Type:application/json"
    return  fetch("http://localhost:8000/signup/" ,{
        headers:{
            'Accept': 'application/json',
            'Content-type':'application/json'    
          },
        method:method,
        body:jsoninfo
    }).then((response) => 
        console.log(response.json())) 
        .then((responseJson) => {
            console.log(responseJson)
        }
    ).catch((error) =>{
        console.error(error);
    })
}