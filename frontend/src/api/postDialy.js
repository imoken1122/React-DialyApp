import axios from 'axios';

let userid = localStorage.getItem("userid");

export const postPost = (info,cookies) => {

    let jsoninfo = JSON.stringify(info)
    console.log(jsoninfo,cookies)
    const method = "POST"
    return fetch(`http://localhost:8000/${userid}/post/new/` ,{
        headers: {
            "Content-type": "application/json",
            'Authorization': `JWT ${cookies}`,
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

export const postPostEdit = (info,cookies) => {

    let jsoninfo = JSON.stringify(info)
    const method = "PUT"
    return  fetch(`http://localhost:8000/${userid}/posts/${info.id}/` ,{
        headers: {
            "Content-type": "application/json",
            'Authorization': `JWT ${cookies}`,
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

export const postDelete = (id,cookies) =>{
    const method = "DELETE"
    return  fetch(`http://localhost:8000/${userid}/posts/${id}/` ,{
        headers: {
            "Content-type": "application/json",
            'Authorization': `JWT ${cookies}`,
          },
        method:method,})
}
export const postEdit =(id,cookies)=>{
    const method = "PUT"
    return  fetch(`http://localhost:8000/${userid}/posts/${id}/` ,{
        headers: {
            "Content-type": "application/json",
            'Authorization': `JWT ${cookies}`,
          },
        method:method,})
    
}
export const addCategory = (cat,cookies) =>{
    const method = "POST"
    let jsoninfo = JSON.stringify(cat)
    return  fetch(`http://localhost:8000/${userid}/addcat/` ,{
        headers: {
            "Content-type": "application/json",
            'Authorization': `JWT ${cookies}`,
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
export const rmCategory = (cat,cookies) =>{
    const method = "DELETE"
    return  fetch(`http://localhost:8000/${userid}/rmcat/${cat}` ,{
        headers: {
            "Content-type": "application/json",
            'Authorization': `JWT ${cookies}`,
          },
        method:method,})
}
export const putCategory = (info,cookies)=> {
    let jsoninfo = JSON.stringify(info)
    const method = "PUT"
    return  fetch(`http://localhost:8000/${userid}/editcat/${info.id}` ,{
        headers: {
            "Content-type": "application/json",
            'Authorization': `JWT ${cookies}`,
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


export const getJwt = async (data) => {

    return await axios.post(`http://localhost:8000/api/token/` ,{
        email:data.email,
        password:data.password
    })
}


export const signup = (info) => {

    let jsoninfo = JSON.stringify(info)
    const method = "POST"
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