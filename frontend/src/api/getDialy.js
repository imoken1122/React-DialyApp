import axios from 'axios';

let userid = localStorage.getItem("userid");

const toJson = async (res) => {
    const json = await res.json();
    if(res.ok){
        return json;
    }else{
        throw new Error(json.message);
    }
}

export const getPostList = async(cookies) =>{

    const res = await fetch(`http://localhost:8000/${userid}/posts/`,{ 
        headers: {
            "Content-type": "application/json",
            'Authorization': `JWT ${cookies}`,
          },
          method:"GET",


    })
    return await toJson(res)
}

export const getPost = async (id,cookies) => {
    const res = await fetch(`http://localhost:8000/${userid}/posts/${id}`, {
        method : 'GET',
        headers: {
            'Authorization': `JWT ${cookies}`
          },
    })
    return await toJson(res);
}

//カテゴリ別一覧を取得
export const getCategoryPostList = async (cat,cookies) => {
    const res = await fetch(`http://localhost:8000/${userid}/posts/folder/${cat}`, {
        headers: {
            'Authorization': `JWT ${cookies}`
          },
        method: 'GET',
    })
    return await toJson(res)
}


export const getCategoryName = async(cookies) =>{

    const res = await fetch(`http://localhost:8000/${userid}/getcat`, {
        headers: {
            "Content-type": "application/json",
            'Authorization': `JWT ${cookies}`,
          },
        method: 'GET',

    })
    return await toJson(res)
}


