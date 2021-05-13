import axios from 'axios';
const toJson = async (res) => {
    const json = await res.json();
    if(res.ok){
        return json;
    }else{
        throw new Error(json.message);
    }
}

export const getPostList = async(cookies) =>{
    const res = await axios.get("http://localhost:8000/posts",{ 
        headers: {
            'Authorization': `JWT ${cookies}`
          },

    })
    return res
}

export const getPost = async (id,cookies) => {
    const res = await fetch(`http://localhost:8000/posts/${id}`, {
        method : 'GET',
        headers: {
            'Authorization': `JWT ${cookies}`
          },
    })
    return await toJson(res);
}

//カテゴリ別一覧を取得
export const getCategoryPostList = async (cat,cookies) => {
    const res = await fetch(`http://localhost:8000/posts/folder/${cat}`, {
        headers: {
            'Authorization': `JWT ${cookies}`
          },
        method: 'GET',
    })
    return await toJson(res)
}


export const getCategoryName = async(cookies) =>{

    const res = await fetch(`http://localhost:8000/getcat`, {
        headers: {
            'Authorization': `JWT ${cookies}`
          },
        method: 'GET',

    })
    return await toJson(res)
}


